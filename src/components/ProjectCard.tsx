import { LuGithub } from "react-icons/lu";
import { BiLink } from "react-icons/bi";

const ProjectCard = () => {
  return (
    <div className="flex flex-col gap-2 bg-card border border-dashed border-border p-2 rounded-xl w-full">
      <div className="rounded-lg overflow-hidden">
        <img
          src="projects/markdowneditor.png"
          alt="Markdown Editor"
          className="rounded-lg border border-border w-full object-cover"
        />
      </div>

      <div className="px-2 mt-4">
        <div className="text-xl font-semibold">Markdown Editor</div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          A Monaco-powered markdown editor with live GitHub-style preview, PDF
          export via Print.js, theme toggle, and optional sync scroll to keep
          both panes aligned.
        </p>
      </div>

      <div className="flex items-center gap-4 px-2 mt-4">
        <img
          src="https://cdn.simpleicons.org/react"
          className="w-5 h-5"
          alt="React"
        />
        <img
          src="https://cdn.simpleicons.org/javascript"
          className="w-5 h-5"
          alt="JavaScript"
        />
        <img
          src="https://cdn.simpleicons.org/typescript"
          className="w-5 h-5"
          alt="TypeScript"
        />
        <img
          src="https://cdn.simpleicons.org/tailwindcss"
          className="w-5 h-5"
          alt="Tailwind"
        />
        <img
          src="https://cdn.simpleicons.org/vite"
          className="w-5 h-5"
          alt="Vite"
        />
      </div>

      <div className="w-full h-px bg-border mt-2 mb-1" />

      <div className="flex items-center justify-between mt-1 px-2 pb-2 ">
        <div className="flex items-center gap-3">
          <BiLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          <LuGithub className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
        <p className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors uppercase tracking-widest">
          Details →
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
