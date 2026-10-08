import { getGithubData, type GithubData } from "@/lib/github";

// Fetched per request rather than prerendered: a build-time snapshot goes stale on
// hosts that scale to zero, and a failed ISR refresh would cache the error response.
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 60 * 60 * 1000;

// Last good response. A failed refresh keeps serving this instead of an error.
let lastGood: { data: GithubData; fetchedAt: number } | null = null;

export async function GET() {
  if (lastGood && Date.now() - lastGood.fetchedAt < CACHE_TTL_MS) {
    return Response.json(lastGood.data);
  }

  try {
    const data = await getGithubData();
    if (data) {
      lastGood = { data, fetchedAt: Date.now() };
      return Response.json(data);
    }
  } catch (err) {
    console.error("[api/github] GET error:", err);
  }

  if (lastGood) {
    console.warn("[api/github] Refresh failed; serving last good data");
    return Response.json(lastGood.data);
  }

  return Response.json(
    { error: "Unable to fetch GitHub data. Check GITHUB_TOKEN / GITHUB_USERNAME." },
    { status: 500 }
  );
}
