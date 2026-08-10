import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const username =
    typeof req.query.username === "string" ? req.query.username.trim() : "";

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    // Fetch contribution calendar from the public contributions API
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    );

    if (!contribRes.ok) {
      throw new Error(`Contributions API error: ${contribRes.status}`);
    }

    const contribJson = (await contribRes.json()) as {
      contributions: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>;
    };

    // Fetch top repos from the GitHub REST API
    const authHeaders: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (GITHUB_TOKEN) {
      authHeaders["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&per_page=20`,
      { headers: authHeaders },
    );

    let repos: Array<{ name: string; count: number; href: string; avatarUrl?: string }> = [];

    if (reposRes.ok) {
      const reposJson = (await reposRes.json()) as Array<{
        name: string;
        stargazers_count: number;
        html_url: string;
        owner?: { avatar_url?: string };
        fork: boolean;
        archived: boolean;
      }>;

      repos = reposJson
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((r) => ({
          name: r.name,
          count: r.stargazers_count,
          href: r.html_url,
          avatarUrl: r.owner?.avatar_url,
        }));
    }

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      contributions: contribJson.contributions ?? [],
      repos,
    });
  } catch (err) {
    console.error("github api error:", err);
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
}
