import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export type GitHubStarsProps = {
  /** GitHub repository in `owner/repo` or `repoName` format. Default: "CharanMunur/Portfolio" */
  repo?: string;
  /** Optional initial star count */
  stargazersCount?: number;
};

export function GitHubStars({
  repo = "CharanMunur/Portfolio",
  stargazersCount: initialCount,
}: GitHubStarsProps) {
  // Default to initialCount or fallback 106 if rate-limited or offline
  const [stars, setStars] = useState<number>(initialCount ?? 106);

  useEffect(() => {
    if (initialCount !== undefined) {
      setStars(initialCount);
      return;
    }

    let isMounted = true;
    const parts = repo.split("/");
    const username = parts.length > 1 ? parts[0] : "CharanMunur";
    const repoName = parts.length > 1 ? parts[1] : parts[0];

    // Fetch via backend /api/github handler only to avoid client-side unauthenticated 403 rate limits
    fetch(`/api/github?username=${encodeURIComponent(username)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data || !Array.isArray(data.repos)) return;
        const match = data.repos.find(
          (r: { name: string; count: number }) =>
            r.name.toLowerCase() === repoName.toLowerCase()
        );
        if (match && typeof match.count === "number") {
          setStars(match.count);
        }
      })
      .catch(() => {
        // Fallback quietly without logging unhandled network errors
      });

    return () => {
      isMounted = false;
    };
  }, [repo, initialCount]);

  const formattedStars = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  })
    .format(stars)
    .toLowerCase();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 inline-flex items-center gap-1.5 rounded-full border border-dashed border-border/70 bg-muted/30 hover:bg-muted/50 px-2.5 text-xs font-light tracking-tight text-foreground transition-all hover:border-border cursor-pointer"
          >
            <span className="shrink-0 flex items-center justify-center w-4 h-4">
              <img
                src="/social/github.svg"
                alt="GitHub"
                className="w-4 h-4 object-contain dark:hidden shrink-0"
              />
              <img
                src="/social/github-dark.svg"
                alt="GitHub"
                className="hidden w-4 h-4 object-contain dark:block shrink-0"
              />
            </span>

            <span className="text-sm text-foreground/90 font-normal leading-none inline-flex items-center translate-y-px">
              {formattedStars}
            </span>
          </a>
        </TooltipTrigger>
        <TooltipContent className="tabular-nums">
          {new Intl.NumberFormat("en-US").format(stars)} stars
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default GitHubStars;
