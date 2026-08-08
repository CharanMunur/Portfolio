import { Link } from "react-router-dom";
import type { OpenSourceProject } from "@/data/opensource";
import { GitPullRequest, CircleDot, ArrowUpRight } from "lucide-react";

const OpenSourceCard = ({ project }: { project: OpenSourceProject }) => {
  return (
    <Link
      to={`/opensource/${project.slug}`}
      className="group flex flex-row items-stretch h-28 bg-card border border-dashed border-border/80 rounded-xl p-1.5 gap-2 hover:bg-muted/20 hover:border-border transition-all duration-200"
    >
      <div className="flex flex-row items-stretch w-full">
        {/* Square image panel */}
        <div className="shrink-0 w-24 self-stretch flex items-center justify-center border-2 border-border rounded-xl group-hover:opacity-90 transition-opacity duration-200 p-1 sm:p-1 overflow-hidden">
          <img
            src={project.logoLight}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-contain dark:hidden"
          />
          <img
            src={project.logoDark}
            alt={project.name}
            loading="lazy"
            className="hidden w-full h-full object-contain dark:block"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-between flex-1 min-w-0 p-2 pl-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-lg font-light tracking-tight text-foreground leading-tight">
                {project.name}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 transition-all duration-200 group-hover:text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground font-light line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground/70">
              <GitPullRequest className="w-3 h-3" />
              {project.prs.length} PR{project.prs.length !== 1 ? "s" : ""}
            </span>
            <span className="w-px h-2.5 bg-border/60" />
            <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground/70">
              <CircleDot className="w-3 h-3" />
              {project.issues.length} Issue{project.issues.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpenSourceCard;
