import type { Contribution } from "@/data/opensource";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GitPullRequestDraft,
  GitMerge,
  CircleDot,
  GitPullRequest,
  ArrowUpRight,
} from "lucide-react";

export const StatusIcon = ({
  status,
  type,
}: {
  status: Contribution["status"];
  type: "pr" | "issue";
}) => {
  if (type === "issue") {
    return status === "Closed" ? (
      <CircleDot className="w-4 h-4 text-red-500 shrink-0" />
    ) : (
      <CircleDot className="w-4 h-4 text-emerald-500 shrink-0" />
    );
  }
  if (status === "Merged")
    return <GitMerge className="w-4 h-4 text-purple-500 shrink-0" />;
  if (status === "Closed")
    return <GitPullRequestDraft className="w-4 h-4 text-red-500 shrink-0" />;
  return <GitPullRequest className="w-4 h-4 text-emerald-500 shrink-0" />;
};

const statusLabel: Record<Contribution["status"], string> = {
  Merged: "Merged",
  Open: "Open",
  Closed: "Closed",
};

const statusColor: Record<Contribution["status"], string> = {
  Merged: "text-purple-500",
  Open: "text-emerald-500",
  Closed: "text-red-500",
};

const ContributionList = ({
  items,
  type,
}: {
  items: Contribution[];
  type: "pr" | "issue";
}) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <div className="w-10 h-10 rounded-lg border border-dashed border-border/60 bg-muted/20 flex items-center justify-center">
          {type === "pr" ? (
            <GitPullRequest className="w-4 h-4 text-muted-foreground/40" />
          ) : (
            <CircleDot className="w-4 h-4 text-muted-foreground/40" />
          )}
        </div>
        <p className="text-sm text-muted-foreground font-light">
          {type === "pr" ? "No pull requests yet." : "No issues raised yet."}
        </p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-border/60 border-dashed"
        >
          <AccordionTrigger className="hover:no-underline py-4 gap-4 items-start group/trigger">
            <div className="flex items-start gap-3 flex-1 min-w-0 text-left">
              {/* Status icon */}
              <div className="mt-0.5 shrink-0">
                <StatusIcon status={item.status} type={type} />
              </div>

              {/* Title block */}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-[15px] font-light tracking-tight text-foreground leading-snug hover:text-muted-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="wrap-break-word">{item.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover/link:text-muted-foreground group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
                </a>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    #{item.id}
                  </span>
                  <span className="w-px h-2.5 bg-border/60" />
                  <span
                    className={`font-mono text-xs ${statusColor[item.status]}`}
                  >
                    {statusLabel[item.status]}
                  </span>
                  <span className="w-px h-2.5 bg-border/60" />
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="ml-7 pb-4 pl-4 border-l border-dashed border-border/60">
              <p className="text-[15px] text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ContributionList;
