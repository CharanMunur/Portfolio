import type { Blog } from "@/data/blog";
import { ArrowUpRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, description, tags, date, readTime }: Blog) => {
  const navigate = useNavigate();
  const slug = `/blogs/${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(slug)}
      onKeyDown={(e) => e.key === "Enter" && navigate(slug)}
      className="flex flex-col gap-3 bg-card border border-dashed border-border/80 p-4 sm:p-5 rounded-2xl w-full overflow-hidden hover:bg-muted/20 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] sm:text-xs tracking-wide text-muted-foreground ">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
          <Clock size={12} className="sm:size-[14px]" />
          {readTime}
        </div>
      </div>

      <div className="flex flex-row items-start justify-between w-full gap-3 sm:gap-4 mt-1">
        <span className="text-lg font-light text-foreground transition-all duration-200 line-clamp-2 sm:text-xl">
          {title}
        </span>
        <ArrowUpRight className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors mt-0.5" />
      </div>

      <p className="text-sm font-light leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 text-[12px]  text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm border border-border/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
