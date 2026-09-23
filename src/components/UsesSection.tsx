import { usesData } from "@/data/uses";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowUpRight } from "lucide-react";

const UsesSection = () => {
  // Grab top highlighted items across categories
  const featured = usesData.flatMap((cat) => cat.items.slice(0, 1)).slice(0, 4);

  return (
    <section id="uses" className="w-full space-y-6">
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-light tracking-tight sm:text-3xl">
          Uses
        </p>
        <span className="text-xs text-muted-foreground/70">
          Gear & Setup
        </span>
      </div>

      <div className="space-y-3">
        {featured.map((item) => (
          <div
            key={item.name}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 py-2.5 border-b border-dashed border-border/40 last:border-0"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-light tracking-tight text-foreground">
                  {item.name}
                </span>
                {item.tag && (
                  <span className="text-[11px] font-light text-muted-foreground/60">
                    · {item.tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-light line-clamp-1 leading-snug">
                {item.description}
              </p>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1 sm:mt-0"
              >
                <span>Visit</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button asChild size="lg" className="text-base">
          <Link to="/uses">
            View all Uses
            <ChevronRight strokeWidth={2.25} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default UsesSection;
