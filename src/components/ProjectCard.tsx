import { LuGithub } from "react-icons/lu";
import { BiLink } from "react-icons/bi";
import TechIcon from "./TechIcon";
import type { Project } from "@/data/projects";

const ProjectCard = ({
  name,
  imgSrc,
  description,
  techStack,
  liveLink,
  githubLink,
}: Project) => {
  return (
    <div className="flex flex-col gap-2 bg-card border border-dashed border-border/80 p-2 rounded-xl w-full overflow-hidden">
      <div className="group/image rounded-lg overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          loading="lazy"
          className="rounded-lg border border-border/80 w-full object-cover transition-all duration-500 ease-out group-hover/image:blur-xs"
        />
      </div>

      <div className="px-2 mt-4">
        <div className="text-xl font-semibold">{name}</div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 px-2 mt-4">
        {techStack.map((tech) => (
          <TechIcon key={tech.name} item={tech} className="w-5 h-5" />
        ))}
      </div>

      <div className="w-full h-px bg-border mt-2 mb-1" />

      <div className="flex items-center justify-between mt-1 px-2 pb-2 ">
        <div className="flex items-center gap-3">
          <a href={liveLink} target="_blank">
            <BiLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </a>
          <a href={githubLink} target="_blank">
            <LuGithub className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </a>
        </div>
        <p className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors uppercase tracking-widest">
          Details →
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
