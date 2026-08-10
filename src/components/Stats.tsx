import * as React from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type RepoContribution = {
  name: string;
  count: number;
  logo?: React.ReactNode;
  href?: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_ACCENT = "#39d353";
const DEFAULT_CELL_SIZE = 9;
const DEFAULT_LABEL = "Top repositories:";
const DEFAULT_MONTHS = 12;
const WEEKS_PER_MONTH = 365.25 / 12 / 7;
const STACK_LIMIT = 3;
const MIN_CARD_WIDTH = 300;
const MIN_LABEL_WEEKS = 3;
const CARD_PADDING = 28;

const gapFor = (cellSize: number) => Math.max(2, Math.round(cellSize / 4));
const weeksFor = (months: number) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH));


const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", bounce: 0.2, duration: 0.62 } as const;
const HEADER_SPRING = { ...SPRING, bounce: 0.45 } as const;
const ROW_SPRING = { ...SPRING, bounce: 0.26, delay: 0.08 } as const;
const ROW_OFFSET = 16;
const CELL_FADE = { duration: 0.2, ease: EASE_OUT } as const;
const TOOLTIP_FADE = { duration: 0.14, ease: EASE_OUT } as const;
const TOOLTIP_EDGE = 8;
const COLUMN_STAGGER = 0.012;
const LABEL_BLUR = 4;
const LABEL_REVEAL = { duration: 0.4, ease: EASE_OUT } as const;

const LEVELS = [0, 1, 2, 3, 4] as const;

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toMonthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null);
  const monthAt = (index: number) => weeks[index]?.[0]?.date.slice(5, 7);

  let start = 0;
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue;
    // Always label the last (current/partial) month; require MIN_LABEL_WEEKS for others
    const isLastGroup = i === weeks.length;
    if (isLastGroup || i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null;
    }
    start = i;
  }

  return labels;
}

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
};

type LevelStyle = { backgroundColor: string; opacity: number };
type HoveredDay = { day: Contribution; x: number; y: number };

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({ count, date }: Contribution) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

function emptyDays(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as ContributionLevel,
    };
  });
}

function toScale(accent: string | string[]): LevelStyle[] {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }));
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent];
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors.at(-1) ?? "transparent";
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────


function useGitHubUser(
  login?: string,
  onStateChange?: (loading: boolean, error: boolean) => void,
) {
  const [data, setData] = React.useState<{
    contributions: Contribution[];
    repos: RepoContribution[];
    username: string;
  }>();

  React.useEffect(() => {
    if (!login) return;
    let active = true;
    onStateChange?.(true, false);

    fetch(`/api/github?username=${encodeURIComponent(login)}`)
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok || !json) {
          throw new Error(json?.error || `HTTP error ${res.status}`);
        }
        return json;
      })
      .then((json) => {
        if (!active) return;
        if (
          json.error ||
          !Array.isArray(json.contributions) ||
          json.contributions.length === 0
        ) {
          onStateChange?.(false, true);
        } else {
          const reposMapped = (Array.isArray(json.repos) ? json.repos : []).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (r: any) => ({
              name: r.name,
              count: r.count,
              href: r.href,
              logo: r.avatarUrl ? (
                <img
                  src={r.avatarUrl}
                  alt=""
                  className="size-full object-cover rounded-full"
                  width="24"
                  height="24"
                />
              ) : undefined,
            }),
          );

          setData({
            contributions: json.contributions,
            repos: reposMapped,
            username: login,
          });
          onStateChange?.(false, false);
        }
      })
      .catch((err) => {
        console.warn(`Could not load @${login}:`, err.message);
        if (active) onStateChange?.(false, true);
      });

    return () => {
      active = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return data;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const Tooltip = ({
  hovered,
  reduceMotion,
}: {
  hovered: HoveredDay;
  reduceMotion: boolean | null;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(hovered.x);

  React.useLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = TOOLTIP_EDGE + half;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <motion.div
        ref={ref}
        className="whitespace-nowrap rounded-lg bg-[#161616] px-2 py-1 text-[11px] font-medium text-neutral-200 border border-neutral-800 shadow-none"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduceMotion ? { duration: 0 } : TOOLTIP_FADE}
      >
        {describeDay(hovered.day)}
      </motion.div>
    </div>,
    document.body,
  );
};

const ContributionGrid = ({
  contributions,
  scale,
  cellSize,
  months,
  showMonths,
  label,
  reduceMotion,
  gridKey,
}: {
  contributions: Contribution[];
  scale: LevelStyle[];
  cellSize: number;
  months: number;
  showMonths: boolean;
  label: string;
  reduceMotion: boolean | null;
  gridKey?: string;
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const gap = gapFor(cellSize);
  const [hovered, setHovered] = React.useState<HoveredDay>();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const cap = Math.min(weeks.length, weeksFor(months));
  const visible = weeks.slice(-cap);
  const sweepEnd = (visible.length - 1) * COLUMN_STAGGER + CELL_FADE.duration;

  // Scroll to the rightmost (most recent) weeks on mount / data change
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => { el.scrollLeft = el.scrollWidth; });
    return () => cancelAnimationFrame(raf);
  }, [contributions]);

  // Redirect vertical wheel to horizontal scroll
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const hover = React.useCallback(
    (day: Contribution) => (event: React.PointerEvent) => {
      const cell = event.currentTarget.getBoundingClientRect();
      setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
    },
    [],
  );

  return (
    <div
      key={gridKey}
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative w-full"
    >
      {/* Scrollable viewport — only the grid scrolls */}
      <div
        ref={scrollRef}
        data-lenis-prevent="true"
        className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onPointerLeave={() => setHovered(undefined)}
      >
        {/* min-w-max keeps all weeks at native size */}
        <div className="min-w-max">
          {showMonths && (
            <motion.div
              className="flex"
              style={{ gap, marginBottom: gap }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, filter: `blur(${LABEL_BLUR}px)` }
              }
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                ...LABEL_REVEAL,
                delay: reduceMotion ? 0 : sweepEnd,
              }}
            >
              {toMonthLabels(visible).map((month, index) => (
                <div
                  key={index}
                  className="relative h-3 shrink-0"
                  style={{ width: cellSize }}
                >
                  {month && (
                    <span className="absolute left-0 top-0 text-[11px] leading-none text-neutral-500 font-medium">
                      {month}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          <div className="flex" style={{ gap }}>
            {visible.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col" style={{ gap }}>
                {week.map((day) => (
                  <motion.div
                    key={day.date}
                    onPointerEnter={hover(day)}
                    className="shrink-0 rounded-[2.5px] bg-neutral-800/80"
                    style={{ width: cellSize, height: cellSize }}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      ...CELL_FADE,
                      delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
                    }}
                  >
                    <div
                      className="h-full w-full rounded-[2.5px]"
                      style={scale[day.level] ?? scale[0]}
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip key="tooltip" hovered={hovered} reduceMotion={reduceMotion} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Avatar = ({
  repo,
  layoutId,
  transition,
  className,
}: {
  repo: RepoContribution;
  layoutId: string;
  transition: Transition;
  className?: string;
}) => (
  <motion.span
    layoutId={layoutId}
    transition={transition}
    className={cn(
      "grid size-6 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-800 text-[10px] font-semibold uppercase text-neutral-200 ring-2 ring-neutral-900",
      "[&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
      className,
    )}
  >
    {repo.logo ?? repo.name.charAt(0)}
  </motion.span>
);

const RepoRow = ({
  repo,
  layoutId,
  transition,
}: {
  repo: RepoContribution;
  layoutId: string;
  transition: Transition;
}) => {
  const className =
    "flex items-center gap-2.5 rounded-lg mx-1.5 px-2 py-1.5 transition-colors hover:bg-neutral-800/80";

  const content = (
    <>
      <Avatar repo={repo} layoutId={layoutId} transition={transition} />
      <span className="flex-1 truncate text-xs text-neutral-200 font-medium">
        {repo.name}
      </span>
      <span className="flex items-center gap-1 text-xs tabular-nums text-neutral-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-[#e3b341]">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {repo.count}
      </span>
    </>
  );

  return repo.href ? (
    <a href={repo.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

const Chevron = ({
  open,
  transition,
}: {
  open: boolean;
  transition: Transition;
}) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-5 shrink-0 text-[#5E656B]"
    initial={false}
    animate={{ rotate: open ? 180 : 0 }}
    transition={transition}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16 10-4 4-4-4" />
  </motion.svg>
);

// ─── GitHubActivity ───────────────────────────────────────────────────────────

type GitHubActivityProps = React.ComponentProps<"div"> & {
  username?: string;
  contributions?: Contribution[];
  repos?: RepoContribution[];
  year?: number;
  accent?: string | string[];
  cellSize?: number;
  months?: number;
  showMonths?: boolean;
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onStateChange?: (loading: boolean, error: boolean) => void;
};

const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp = [],
  repos: reposProp = [],
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = true,
  label = DEFAULT_LABEL,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  onStateChange,
  style,
  ...props
}: GitHubActivityProps) => {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [openState, setOpenState] = React.useState(defaultOpen);

  const open = openProp ?? openState;
  const toggle = React.useCallback(() => {
    if (openProp === undefined) setOpenState((s) => !s);
    onOpenChange?.(!open);
  }, [open, openProp, onOpenChange]);

  const needsFetch = !contributionsProp.length;
  const fetched = useGitHubUser(needsFetch ? username : undefined, onStateChange);
  const placeholder = React.useMemo(
    () => (username ? emptyDays(weeksFor(months)) : []),
    [username, months],
  );

  const contributions = contributionsProp.length
    ? contributionsProp
    : (fetched?.contributions ?? placeholder);
  const repos = reposProp.length ? reposProp : (fetched?.repos ?? []);
  const activeHandle = fetched?.username ?? username ?? "user";

  const scale = React.useMemo(() => toScale(accent), [accent]);
  const transition = reduceMotion ? { duration: 0 } : SPRING;
  const headerTransition = reduceMotion ? { duration: 0 } : HEADER_SPRING;
  const rowTransition = reduceMotion ? { duration: 0 } : ROW_SPRING;

  const kick = reduceMotion ? {} : { x: ROW_OFFSET, y: ROW_OFFSET };
  const listMotion = React.useMemo(() => ({
    initial: { opacity: 0, ...kick },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...kick },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [reduceMotion]);

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const parsedYear = Number(contributions.at(-1)?.date.slice(0, 4));
  const displayYear = year ?? (Number.isFinite(parsedYear) ? parsedYear : null);
  const heading = `${total} contributions${displayYear ? ` in ${displayYear}` : ""}`;

  // Only compute a width when the caller hasn't supplied one explicitly
  const finalStyle = React.useMemo(() => {
    if (style?.width != null) return style;
    const gap = gapFor(cellSize);
    const columns = Math.min(
      Math.ceil(contributions.length / 7),
      weeksFor(months),
    );
    const calculatedWidth = Math.max(
      MIN_CARD_WIDTH,
      columns * (cellSize + gap) - gap + CARD_PADDING,
    );
    return { width: calculatedWidth, ...style };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellSize, months, contributions.length, style?.width]);

  return (
    <div
      data-slot="github-activity"
      className={cn(
        "relative max-w-full overflow-hidden rounded-xl bg-card/70 p-3.5 text-neutral-100 border border-dashed border-border/80 shadow-none transition-all duration-300",
        repos.length > 0 && "pb-[68px]",
        className,
      )}
      style={finalStyle}
      {...props}
    >
      <p className="mb-3 text-sm font-medium text-neutral-100 px-1 tracking-tight">
        {heading}
      </p>

      <ContributionGrid
        gridKey={activeHandle}
        contributions={contributions}
        scale={scale}
        cellSize={cellSize}
        months={months}
        showMonths={showMonths}
        label={heading}
        reduceMotion={reduceMotion}
      />

      {repos.length > 0 && (
        <motion.div
          layout
          id={`${uid}-panel`}
          data-slot="github-activity-panel"
          data-state={open ? "open" : "closed"}
          className={cn(
            "absolute inset-x-2.5 bottom-2.5 overflow-hidden bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/80 shadow-none",
            open && "top-2.5",
          )}
          style={{ borderRadius: 12 }}
          transition={transition}
        >
          <motion.div
            layout="position"
            transition={headerTransition}
            className="flex items-center justify-between gap-2.5 py-2.5 px-3.5"
          >
            <span className="truncate text-xs text-neutral-300 font-medium">
              {label}
            </span>

            <div className="flex items-center gap-2.5">
              {!open && (
                <div className="flex items-center">
                  {repos.slice(0, STACK_LIMIT).map((repo, index) => (
                    <Avatar
                      key={index}
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                      className="-ml-2 first:ml-0"
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={`${uid}-panel`}
                aria-label={
                  open ? "Hide top repositories" : "Show top repositories"
                }
                className="grid size-6 shrink-0 place-items-center rounded-full bg-neutral-800 hover:scale-105 active:scale-95 transition-transform"
              >
                <Chevron open={open} transition={transition} />
              </button>
            </div>
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {open && (
              <motion.ul
                key="list"
                layout="position"
                {...listMotion}
                transition={rowTransition}
                className="px-0.5 pb-1"
              >
                {repos.slice(0, 4).map((repo, index) => (
                  <li key={index}>
                    <RepoRow
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                    />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

// ─── Stats (section wrapper) ──────────────────────────────────────────────────

const Stats = () => {
  return (
    <section id="stats" className="w-full space-y-3">
      <div className="flex flex-col gap-1 pb-3">
        <p className="text-2xl font-light tracking-tight sm:text-3xl">
          GitHub Activity
        </p>
      </div>

      <GitHubActivity
        username="charanmunur"
        cellSize={11}
        months={12}
        className="w-full"
        style={{ width: "100%" }}
      />
    </section>
  );
};

export default Stats;
