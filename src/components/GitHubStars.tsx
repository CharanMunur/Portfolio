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
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Close tooltip when user returns to window tab after clicking link
  useEffect(() => {
    const handleWindowFocus = () => setTooltipOpen(false);
    window.addEventListener("focus", handleWindowFocus);
    return () => window.removeEventListener("focus", handleWindowFocus);
  }, []);

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
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              setTooltipOpen(false);
              e.currentTarget.blur();
            }}
            className="h-8 inline-flex items-center gap-2 rounded-full border border-dashed border-border/70 bg-muted/30 hover:bg-muted/50 px-2.5 text-xs font-light tracking-tight text-foreground transition-all hover:border-border cursor-pointer"
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

            <div className="h-3.5 w-px shrink-0 bg-border" aria-hidden="true" />

            <div className="flex items-center gap-1.5">
              <span className="text-sm text-foreground/90 font-normal leading-none inline-flex items-center translate-y-px">
                {formattedStars}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="reicon shrink-0 relative -top-[0.5px]"
                style={{ color: "rgb(234, 179, 8)" }}
              >
                <path
                  d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent className="tabular-nums">
          {new Intl.NumberFormat("en-US").format(stars)} stars on GitHub
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default GitHubStars;
