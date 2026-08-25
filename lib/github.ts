// server-only — do not import in client components
// Provides live GitHub contribution data via GraphQL.
// Uses GITHUB_TOKEN (ghp_***, masked) and GITHUB_USERNAME from env.

export interface GithubDay {
  date: string;
  count: number;
  level: number; // 0-4 derived from count
  color: string;
}

export interface GithubWeek {
  contributionDays: GithubDay[];
}

export interface GithubData {
  totalContributions: number;
  weeks: GithubWeek[];
  streak: number; // current streak in days
  longestStreak: number;
  prs: number;
  repos: number;
}

function levelFromCount(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function computeStreaks(days: { date: string; count: number }[]): {
  streak: number;
  longestStreak: number;
} {
  let longest = 0;
  let current = 0;
  for (const day of days) {
    if (day.count > 0) {
      current += 1;
      if (current > longest) longest = current;
    } else {
      current = 0;
    }
  }

  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak += 1;
    else break;
  }

  return { streak, longestStreak: longest };
}

const GITHUB_GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      pullRequests(first: 1) {
        totalCount
      }
      repositories(first: 1, ownerAffiliations: OWNER) {
        totalCount
      }
    }
  }
`;

export async function getGithubData(): Promise<GithubData | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "arpankanwer";

  if (!token) {
    console.warn("[lib/github] GITHUB_TOKEN is missing — returning null (fallback to mock)");
    return null;
  }

  if (!username) {
    console.warn("[lib/github] GITHUB_USERNAME is missing — returning null");
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[lib/github] GitHub GraphQL fetch failed: ${res.status} ${res.statusText} ${text.slice(0, 500)}`);
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error("[lib/github] GraphQL errors:", JSON.stringify(json.errors).slice(0, 1000));
      return null;
    }

    const user = json?.data?.user;
    if (!user) {
      console.error("[lib/github] No user data in response", JSON.stringify(json).slice(0, 1000));
      return null;
    }

    const calendar = user.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      console.error("[lib/github] No contributionCalendar");
      return null;
    }

    const totalContributions: number = calendar.totalContributions ?? 0;
    const rawWeeks: Array<{
      contributionDays: Array<{ date: string; contributionCount: number; color: string }>;
    }> = calendar.weeks ?? [];

    const weeks: GithubWeek[] = rawWeeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount ?? 0,
        level: levelFromCount(day.contributionCount ?? 0),
        color: day.color ?? "#ebedf0",
      })),
    }));

    const flatDays = weeks.flatMap((w) => w.contributionDays);
    const { streak, longestStreak } = computeStreaks(flatDays);

    const prs: number = user.pullRequests?.totalCount ?? 0;
    const repos: number = user.repositories?.totalCount ?? 0;

    return {
      totalContributions,
      weeks,
      streak,
      longestStreak,
      prs,
      repos,
    };
  } catch (err) {
    console.error("[lib/github] Unexpected error fetching GitHub data:", err);
    return null;
  }
}
