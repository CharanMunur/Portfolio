import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

const ONE_HOUR_MS = 60 * 60 * 1000;
const STORAGE_KEY = "stargazer_promo_dismissed_until";

export const StargazerPromo = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    sessionStorage.removeItem("dismissed_stargazer_promo");

    const dismissedUntil = Number(localStorage.getItem(STORAGE_KEY) || 0);
    const isCooldowned = Date.now() < dismissedUntil;

    if (!isCooldowned) {
      setShouldRender(true);

      const triggerShow = () => {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setIsVisible(true);
        }
      };

      // Trigger 1: 5-second fallback timer
      const timer = setTimeout(() => {
        triggerShow();
      }, 5000);

      // Trigger 2: IntersectionObserver on #projects section
      let observer: IntersectionObserver | null = null;
      const projectsEl = document.getElementById("projects");

      if (projectsEl) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              triggerShow();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(projectsEl);
      } else {
        const checkProjectsInterval = setInterval(() => {
          const el = document.getElementById("projects");
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              triggerShow();
            }
          }
        }, 500);

        return () => {
          clearTimeout(timer);
          clearInterval(checkProjectsInterval);
        };
      }

      return () => {
        clearTimeout(timer);
        if (observer) observer.disconnect();
      };
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, (Date.now() + ONE_HOUR_MS).toString());
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-50 w-64 sm:w-72"
        >
          {/* Entire Card is Clickable Link */}
          <a
            href="https://stargazer.charanmunur.in"
            target="_blank"
            rel="noreferrer"
            className="group block relative rounded-2xl border border-dotted border-border/90 bg-card/70 p-[4px] shadow-xl backdrop-blur-md transition-all hover:border-foreground/40 cursor-pointer"
          >
            {/* Inner Card Framing */}
            <div className="relative flex flex-col items-center gap-3.5 rounded-[14px] border border-dashed border-border/60 bg-card p-4 sm:p-5 text-center">
              {/* Icon badge: X by default, morphs into ArrowUpRight when card is hovered */}
              <button
                onClick={handleDismiss}
                aria-label="Close Stargazer promo"
                title="Dismiss promo"
                className="absolute top-2.5 right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-border/70 text-foreground/80 hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                <X size={14} className="shrink-0 block group-hover:hidden text-foreground/80" />
                <ArrowUpRight size={14} className="shrink-0 hidden group-hover:block text-foreground" />
              </button>

              {/* Logo in Middle */}
              <div className="flex items-center justify-center pt-1">
                <img
                  src="/stargazer-light.svg"
                  alt="Stargazer"
                  className="h-12 sm:h-14 w-auto object-contain dark:hidden"
                />
                <img
                  src="/stargazer-dark.svg"
                  alt="Stargazer"
                  className="hidden h-12 sm:h-14 w-auto object-contain dark:block"
                />
              </div>

              {/* Increased Text Size with 'open-source project' phrasing */}
              <p className="text-xs sm:text-sm font-light leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                An open-source tool to turn your GitHub stars into shareable videos & images
              </p>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StargazerPromo;
