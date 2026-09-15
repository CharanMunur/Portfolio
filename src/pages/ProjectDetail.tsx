import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ChevronLeft } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { BiLink } from "react-icons/bi";
import TechIcon from "@/components/helpers/TechIcon";
import { useNavigate, useParams } from "react-router-dom";
import { FadeIn } from "@/components/helpers/FadeIn";

import NotFound from "./NotFound";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const project = projects.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!project) {
    return <NotFound />;
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-6 pb-8 sm:pt-12 sm:pb-24 space-y-6">
      <FadeIn yOffset={10} duration={0.4}>
        <button
          onClick={() => navigate("/projects")}
          className="flex w-fit items-center gap-3 text-md font-light tracking-tight text-muted-foreground cursor-pointer duration-200 hover:text-foreground"
        >
          <ChevronLeft size={20} strokeWidth={2.25} /> Back to Projects
        </button>
      </FadeIn>
      <div className="flex flex-col gap-6">
        <FadeIn delay={0.1}>
          <h1 className="text-2xl font-light tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 text-lg font-light text-muted-foreground sm:text-xl">
            {project.description}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href={project.githubLink} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="border border-border border-dashed"
                size="lg"
              >
                <LuGithub className="w-4 h-4" />
                View Source
              </Button>
            </a>
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              <Button size="lg">
                <BiLink className="w-4 h-4" />
                Live Demo
              </Button>
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <img
            className="rounded-lg border border-border border-dashed"
            src={project.imgSrc}
            alt={project.name}
            loading="lazy"
          />
        </FadeIn>
        <FadeIn delay={0.25}>
          <h2 className="mb-4 text-xl font-light tracking-tight sm:text-2xl">
            Technologies Used
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="bg-card ml-1 inline-flex items-center gap-1.5 rounded-md border border-dashed px-1 py-1.5 text-xs text-foreground sm:px-3.5 sm:text-sm"
              >
                <TechIcon item={tech} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {tech.name}
              </span>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <h2 className="mb-4 text-xl font-light tracking-tight sm:text-2xl">
            About the Project
          </h2>
          <p className="text-muted-foreground font-light">{project.about}</p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <h2 className="mb-4 text-xl font-light tracking-tight sm:text-2xl">
            Key Features
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-light ">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </main>
  );
};

export default ProjectDetail;
