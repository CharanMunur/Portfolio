import { openSourceProjects } from "@/data/opensource";

import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ChevronLeft,
  CircleDot,
  GitPullRequest,
} from "lucide-react";
import { FadeIn } from "@/components/helpers/FadeIn";
import ContributionList from "@/components/ContributionList";

const OpenSourceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = openSourceProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl text-muted-foreground font-light">
        Project not found
      </div>
    );
  }

  const totalContributions = project.prs.length + project.issues.length;

  const statPills = (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/30 border border-border/60 border-dashed px-2.5 py-1 rounded-md">
        <GitPullRequest className="w-3 h-3 text-purple-500" />
        {project.prs.length} pull request{project.prs.length !== 1 ? "s" : ""}
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/30 border border-border/60 border-dashed px-2.5 py-1 rounded-md">
        <CircleDot className="w-3 h-3 text-emerald-500" />
        {project.issues.length} issue{project.issues.length !== 1 ? "s" : ""}
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/30 border border-border/60 border-dashed px-2.5 py-1 rounded-md">
        {totalContributions} total
      </span>
    </div>
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-6 pb-8 sm:pt-12 sm:pb-24 space-y-8">
      {/* Back */}
      <FadeIn yOffset={10} duration={0.4}>
        <button
          onClick={() => navigate("/opensource")}
          className="flex w-fit items-center gap-2 text-sm font-light tracking-tight text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Back to Experience
        </button>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            {/* Square icon panel */}
            <div className="shrink-0 w-16 h-16 sm:w-28 sm:h-28 rounded-xl border border-dashed border-border/80 bg-muted/20 flex items-center justify-center overflow-hidden">
              <img
                src={project.logo}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center sm:justify-between flex-1 min-w-0 sm:py-0.5">
              <div>
                <h1 className="text-xl font-light tracking-tight sm:text-3xl">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-6 decoration-[0.2px] transition-all">
                    {project.name}
                  </a>
                </h1>
                <p className="mt-1 sm:mt-1.5 text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {project.description}
                </p>
              </div>

              {/* Desktop Stats */}
              <div className="hidden sm:block mt-4">
                {statPills}
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="block sm:hidden w-full">
            {statPills}
          </div>
        </div>
      </FadeIn>

      {/* Divider */}
      <div className="w-full h-px bg-border/60 border-dashed" />

      {/* Tabs */}
      <FadeIn delay={0.15}>
        <Tabs defaultValue="prs" className="w-full">
          <TabsList variant="line" className="w-full justify-start">
            <TabsTrigger value="prs" className="flex-none px-4">
              Pull Requests ({project.prs.length})
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex-none px-4">
              Issues ({project.issues.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prs" className="mt-6">
            <ContributionList items={project.prs} type="pr" />
          </TabsContent>

          <TabsContent value="issues" className="mt-6">
            <ContributionList items={project.issues} type="issue" />
          </TabsContent>
        </Tabs>
      </FadeIn>
    </main>
  );
};

export default OpenSourceDetail;
