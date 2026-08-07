import { LuGithub } from "react-icons/lu";
import { BiLink } from "react-icons/bi";
import TechIcon from "./helpers/TechIcon";
import type { Project } from "@/data/projects";
import { Link } from "react-router-dom";

const ProjectCard = ({ name, imgSrc, description, techStack, liveLink, githubLink }: Project) => {
  return (
    <Link to={`/projects/${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="group flex flex-col gap-2 bg-card border border-dashed border-border/80 p-1.5 rounded-xl w-full overflow-hidden hover:bg-muted/20 transition-all duration-200 cursor-pointer">
        <div className="group/image rounded-lg overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            loading="lazy"
            className="rounded-lg border border-border/80 w-full object-cover transition-all duration-500 ease-out group-hover/image:blur-xs"
          />
        </div>

        <div className="px-2 mt-4">
          <div className="text-xl font-light tracking-tight">{name}</div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center gap-4 px-2 mt-4">
          {techStack.map((tech) => (
            <TechIcon key={tech.name} item={tech} className="w-5 h-5" showTooltip />
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
            <Link to={`/projects/${name.toLowerCase().replace(/\s+/g, "-")}`}>Details →</Link>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
