import { blogs } from "@/data/blog";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FadeIn } from "@/components/helpers/FadeIn";

const BlogDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const blog = blogs.find(
    (b) => b.title.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl text-muted-foreground">
        Blog not found
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-6 pb-8 sm:pt-12 sm:pb-24 space-y-6">
      <FadeIn yOffset={10} duration={0.4}>
        <button
          onClick={() => navigate("/blogs")}
          className="flex w-fit items-center gap-3 text-md font-light tracking-tight text-muted-foreground cursor-pointer duration-200 hover:text-foreground"
        >
          <ChevronLeft size={20} strokeWidth={2.25} /> Back to Blogs
        </button>
      </FadeIn>

      <div className="flex flex-col gap-6">
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-wide text-muted-foreground">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5  text-xs text-muted-foreground">
              <Clock size={12} />
              {blog.readTime}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-light leading-tight tracking-tight sm:text-4xl">
            {blog.title}
          </h1>
          <p className="mt-4 text-lg font-light text-muted-foreground sm:text-xl">
            {blog.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap items-center gap-2">
            <Tag size={14} className="text-muted-foreground shrink-0" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[12px]  text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <hr className="border-dashed border-border/60" />
        </FadeIn>

        <FadeIn delay={0.25}>
          <article
            className="
              prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-light prose-headings:tracking-tight
              prose-h1:text-2xl prose-h1:sm:text-3xl
              prose-h2:text-xl prose-h2:sm:text-2xl
              prose-h3:text-lg prose-h3:sm:text-xl
              prose-h4:text-base prose-h4:sm:text-lg
              prose-h5:text-sm prose-h6:text-sm
              prose-p:font-light prose-p:text-muted-foreground
              prose-strong:font-medium prose-strong:text-foreground
              prose-a:font-normal prose-a:text-foreground prose-a:no-underline hover:prose-a:underline
              prose-li:font-light prose-blockquote:font-light
            "
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="rounded-lg w-full"
                  />
                ),
              }}
            >
              {blog.content}
            </Markdown>
          </article>
        </FadeIn>
      </div>
    </main>
  );
};

export default BlogDetail;
