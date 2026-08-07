import { openSourceProjects } from "@/data/opensource";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, GitPullRequest, CircleDot, ArrowUpRight } from "lucide-react";

const OpenSourceSection = () => {
  const preview = openSourceProjects.slice(0, 4);

  return (
    <section id="opensource" className="w-full space-y-6">
      <p className="text-2xl font-light tracking-tight sm:text-3xl">
        Open Source
      </p>

      <div className="relative flex flex-col">
        {/* Vertical spine — runs the full height */}
        <div className="absolute left-[31px] top-8 bottom-8 w-0.5 border-l-2 border-solid border-border/80" />

        {preview.map((project, idx) => {
          const isLast = idx === preview.length - 1;
          return (
            <div key={project.name} className={`relative flex items-center gap-5 ${isLast ? "" : "pb-12"}`}>
              {/* Node: logo in a square */}
              <div className="relative z-10 shrink-0 w-16 h-16 rounded-xl border border-dashed border-border/80 bg-background flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src={project.logo}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={`/opensource/${project.slug}`}
                    className="group inline-flex items-center gap-1.5"
                  >
                    <span className="text-base font-light tracking-tight text-foreground group-hover:text-muted-foreground transition-colors">
                      {project.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-all group-hover:translate-x-px group-hover:-translate-y-px" />
                  </Link>
                </div>

                <p className="mt-0.5 text-xs text-muted-foreground font-light line-clamp-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground/70">
                    <GitPullRequest className="w-3 h-3" />
                    {project.prs.length} PR{project.prs.length !== 1 ? "s" : ""}
                  </span>
                  <span className="w-px h-2.5 bg-border/60" />
                  <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground/70">
                    <CircleDot className="w-3 h-3" />
                    {project.issues.length} Issue{project.issues.length !== 1 ? "s" : ""}
                  </span>
                  <span className="w-px h-2.5 bg-border/60" />
                  <span className="text-xs font-mono text-muted-foreground/70">
                    {project.prs.length + project.issues.length} contributions
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-2">
        <Button asChild size="lg" className="text-base">
          <Link to="/opensource">
            View all Open Source
            <ChevronRight strokeWidth={2.25} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default OpenSourceSection;
