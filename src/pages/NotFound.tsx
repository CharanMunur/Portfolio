import { FadeIn } from "@/components/helpers/FadeIn";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NotFoundProps {
  backPath?: string;
  backLabel?: string;
}

const NotFound = ({ backPath, backLabel }: NotFoundProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  let targetPath = "/";
  let targetLabel = "Back to Home";

  if (location.pathname.startsWith("/projects")) {
    targetPath = "/projects";
    targetLabel = "Back to Projects";
  } else if (location.pathname.startsWith("/blogs")) {
    targetPath = "/blogs";
    targetLabel = "Back to Blogs";
  } else if (location.pathname.startsWith("/opensource")) {
    targetPath = "/opensource";
    targetLabel = "Back to Experience";
  }

  if (backPath) targetPath = backPath;
  if (backLabel) targetLabel = backLabel;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-6 pb-8 sm:pt-12 sm:pb-24 space-y-16">
      <FadeIn yOffset={10} duration={0.4}>
        <button
          onClick={() => navigate(targetPath)}
          className="flex w-fit items-center gap-3 text-md font-light tracking-tight text-muted-foreground cursor-pointer duration-200 hover:text-foreground"
        >
          <ChevronLeft size={20} strokeWidth={2.25} /> {targetLabel}
        </button>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="flex items-center text-lg sm:text-2xl font-light tracking-tight">
            <span className="font-normal text-foreground pr-5 border-r-2 border-border/80">
              404
            </span>
            <span className="pl-5 text-muted-foreground">
              Page not found
            </span>
          </div>
        </div>
      </FadeIn>
    </main>
  );
};

export default NotFound;
