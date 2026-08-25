import { getGithubData } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGithubData();
    if (!data) {
      return Response.json(
        { error: "Unable to fetch GitHub data. Check GITHUB_TOKEN / GITHUB_USERNAME." },
        { status: 500 }
      );
    }
    return Response.json(data);
  } catch (err) {
    console.error("[api/github] GET error:", err);
    return Response.json({ error: "Internal error fetching GitHub data" }, { status: 500 });
  }
}
