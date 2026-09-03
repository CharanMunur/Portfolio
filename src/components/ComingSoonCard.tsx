import { LuGithub } from "react-icons/lu";
import { BiLink } from "react-icons/bi";

const ComingSoonCard = () => {
  return (
    <div className="flex flex-col gap-2 bg-card border border-dashed border-border/80 p-1.5 rounded-xl w-full overflow-hidden opacity-70">
      <div className="group/image rounded-lg overflow-hidden w-full aspect-video bg-muted/20 border border-dashed border-border/40 flex items-center justify-center">
        <span className="text-xl text-muted-foreground">Coming Soon</span>
      </div>

      <div className="px-2 mt-4">
        <div className="text-xl font-light tracking-tight">Project Unknown</div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          Something awesome is currently being built. Exploring new ideas and technologies. Stay
          tuned for updates.
        </p>
      </div>

      <div className="flex items-center gap-4 px-2 mt-4 h-5">
        <span className="flex items-center gap-1 text-[12px]  text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm border border-border/50">
          Tech
        </span>
        <span className="flex items-center gap-1 text-[12px]  text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm border border-border/50">
          Stack
        </span>
        <span className="flex items-center gap-1 text-[12px]  text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm border border-border/50">
          Hidden
        </span>
      </div>

      <div className="w-full h-px bg-border mt-2 mb-1" />

      <div className="flex items-center justify-between mt-1 px-2 pb-2">
        <div className="flex items-center gap-1 text-muted-foreground/50 cursor-not-allowed">
          <BiLink className="w-4 h-4" />
          <p className="font-extralight">Live</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground/50 cursor-not-allowed">
          <LuGithub className="w-4 h-4" />
          <p className="font-extralight">Github</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;

export const ComingSoonCardWide = () => {
  return (
    <div className="col-span-1 sm:col-span-2 flex flex-col gap-3 bg-card border border-dashed border-border/80 p-4 sm:p-5 rounded-xl w-full overflow-hidden opacity-70">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-lg sm:text-xl font-light tracking-tight text-foreground">
            Project Unknown
          </span>
          <p className="text-sm font-light leading-relaxed text-muted-foreground line-clamp-2">
            Something awesome is currently being built. Exploring new ideas and technologies. Stay
            tuned for updates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 mt-0.5">
          <BiLink className="w-4 h-4 text-muted-foreground/50 cursor-not-allowed" />
          <LuGithub className="w-4 h-4 text-muted-foreground/50 cursor-not-allowed" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        {["Tech", "Stack", "Hidden"].map((label) => (
          <span
            key={label}
            className="text-[12px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md border border-border/50"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
