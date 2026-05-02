import { Moon, Sun, TvMinimal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "next-themes";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#stats", label: "Stats" },
  { href: "/blog", label: "Blog", isRoute: true },
];

const themes = [
  { theme: "system", icon: TvMinimal },
  { theme: "light", icon: Sun },
  { theme: "dark", icon: Moon },
];

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-backdrop-filter:bg-foregr/70">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-4 px-6">
        <div className="shrink-0 text-xs font-light tracking-normal text-foreground sm:text-xl">
          @charanmunur
        </div>

        <div className="flex flex-1 items-center justify-end gap-0.5 pr-2 sm:gap-1 sm:pr-3">
          {navItems.map(({ href, label, isRoute }) => {
            const isActive = isRoute
              ? location.pathname === href
              : href === "#home"
                ? location.pathname === "/" &&
                  (!location.hash || location.hash === href)
                : location.pathname === "/" && location.hash === href;

            const itemClass = `rounded-md px-2.5 py-1.5 text-xs font-light transition-colors sm:px-3 sm:py-2 sm:text-base ${
              isActive
                ? "!text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`;

            return isRoute ? (
              <Link key={label} to={href} className={itemClass}>
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className={itemClass}>
                {label}
              </a>
            );
          })}
        </div>

        <div className="h-6 w-px shrink-0 bg-border/80" aria-hidden="true" />

        <div className="flex shrink-0 items-center">
          <Tabs
            defaultValue="system"
            value={theme}
            onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
          >
            <TabsList className="flex rounded-full border border-border/70 bg-muted/30 gap-1 p-1">
              {themes.map(({ theme, icon: Icon }) => (
                <TabsTrigger
                  key={theme}
                  value={theme}
                  className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground! data-[state=active]:shadow-sm"
                >
                  <Icon size={18} />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
