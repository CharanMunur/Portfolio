import { FadeIn } from "@/components/helpers/FadeIn";
import { usesData } from "@/data/uses";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Uses = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-6 pb-8 sm:pt-12 sm:pb-24 space-y-8">
      {/* Back Button */}
      <FadeIn yOffset={10} duration={0.4}>
        <button
          onClick={() => navigate("/")}
          className="flex w-fit items-center gap-2 text-md font-light tracking-tight text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Back to Home
        </button>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-light tracking-tight sm:text-4xl">
            Uses
          </h1>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            A curated list of the hardware, software, editor configuration, and tools I use daily for engineering and productivity.
          </p>
        </div>
      </FadeIn>

      {/* Divider */}
      <div className="w-full h-px bg-border/60 border-dashed" />

      {/* Categories */}
      <div className="space-y-10">
        {usesData.map((category, idx) => (
          <FadeIn key={category.title} delay={0.15 + idx * 0.05}>
            <section className="space-y-4">
              <h2 className="text-xl font-light tracking-tight text-foreground sm:text-2xl">
                {category.title}
              </h2>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 py-2 border-b border-dashed border-border/40 last:border-0"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-light tracking-tight text-foreground">
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="text-[11px] font-light text-muted-foreground/60">
                            · {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1 sm:mt-0"
                      >
                        <span>Visit</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        ))}
      </div>

      {/* Note footer */}
      <FadeIn delay={0.3}>
        <p className="text-xs text-muted-foreground/70 font-light leading-relaxed pt-4 border-t border-dashed border-border/40">
          This page is inspired by the <a href="https://uses.tech" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">/uses page movement</a> created by <a href="https://wesbos.com" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">Wes Bos</a>.
        </p>
      </FadeIn>
    </main>
  );
};

export default Uses;
