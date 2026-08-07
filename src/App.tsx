import Hero from "./components/Hero";
import SkillSection from "./components/SkillSection";
import { FadeIn } from "./components/helpers/FadeIn";
import { lazy, Suspense } from "react";
import QuoteSection from "./components/QuoteSection";

const ProjectSection = lazy(() => import("./components/ProjectSection"));
const OpenSourceSection = lazy(() => import("./components/OpenSourceSection"));
const BlogSection = lazy(() => import("./components/BlogSection"));
const Stats = lazy(() => import("./components/Stats"));

const App = () => {
  return (
    <div className="min-h-screen text-foreground flex flex-col relative">
      <div className="relative z-10 flex flex-col flex-1">
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-6 pb-6 sm:gap-20 sm:pb-20 overflow-hidden">
          <Hero />
          <FadeIn>
            <SkillSection />
          </FadeIn>
          <Suspense
            fallback={
              <div className="h-40 animate-pulse bg-muted/20 rounded-xl" />
            }
          >
            <FadeIn>
              <ProjectSection />
            </FadeIn>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-40 animate-pulse bg-muted/20 rounded-xl" />
            }
          >
            <FadeIn>
              <OpenSourceSection />
            </FadeIn>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-40 animate-pulse bg-muted/20 rounded-xl" />
            }
          >
            <FadeIn>
              <BlogSection />
            </FadeIn>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-40 animate-pulse bg-muted/20 rounded-xl" />
            }
          >
            <FadeIn>
              <Stats />
            </FadeIn>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-24 animate-pulse bg-muted/20 rounded-xl" />
            }
          >
            <FadeIn>
              <QuoteSection />
            </FadeIn>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
