import { getFingerprint, hasVisited, markVisited } from "@/lib/fingerprint";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface VisitorApiResponse {
  count?: number | null;
  total?: number | null;
}

async function requestVisitorCount(
  method: "GET" | "POST",
  visitorId: string,
): Promise<VisitorApiResponse | null> {
  const url =
    method === "POST"
      ? "/api/visitors"
      : `/api/visitors?visitor_id=${encodeURIComponent(visitorId)}`;

  const res = await fetch(url, {
    method,
    headers:
      method === "POST" ? { "Content-Type": "application/json" } : undefined,
    body: method === "POST" ? JSON.stringify({ visitor_id: visitorId }) : undefined,
  });

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as VisitorApiResponse;
}

const VisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [shouldTrack] = useState(() => !hasVisited());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const track = async () => {
      const visitorId = getFingerprint();

      try {
        let data = await requestVisitorCount(
          shouldTrack ? "POST" : "GET",
          visitorId,
        );

        // Recover devices previously marked visited when their row wasn't recorded.
        if (
          !shouldTrack &&
          data &&
          typeof data.count !== "number" &&
          typeof data.total === "number"
        ) {
          data = await requestVisitorCount("POST", visitorId);
        }

        if (!data) {
          return;
        }

        if (active && typeof data.count === "number") {
          setCount(data.count);
        }
        if (active && typeof data.total === "number") {
          setTotal(data.total);
        }

        if (typeof data.count === "number") {
          markVisited();
        }
      } catch {
        // Keep the footer quiet if the API is unavailable.
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    track();

    return () => {
      active = false;
    };
  }, [shouldTrack]);

  const getOrdinal = (n: number) => {
    const v = n % 100;
    if (v >= 11 && v <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="flex w-full items-center justify-center rounded-lg sm:justify-start">
      {loading ? (
        <div className="flex w-full max-w-full items-center justify-center gap-2" aria-busy="true">
          <Skeleton className="size-4 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-24 sm:w-28" />
            <Skeleton className="h-3 w-16 sm:w-20" />
          </div>
        </div>
      ) : count === null ? (
        <p className="text-sm text-muted-foreground">
          <span className="inline-block align-middle tracking-[0.35em]">
            ...
          </span>
        </p>
      ) : (
        <div className="flex w-full items-center justify-center gap-2 sm:justify-start">
          <UserRound size={17} className="shrink-0 text-muted-foreground" />
          <p className="flex min-w-0 flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center text-base leading-tight text-muted-foreground sm:justify-start sm:text-left">
            <span>You are</span>
            <span className="whitespace-nowrap text-lg font-light leading-none text-foreground tabular-nums sm:text-xl">
              {count}
              <sup className="ml-0.5 align-super text-[0.6em] font-light">
                {getOrdinal(count)}
              </sup>
            </span>
            <span className="whitespace-nowrap text-sm font-light leading-none text-muted-foreground tabular-nums sm:text-base">
              {total !== null ? `/ ${total}` : ""}
            </span>
            <span className="whitespace-nowrap text-base">visitors</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default VisitorCount;
