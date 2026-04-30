import { ModeToggle } from "@/features/theme/mode-toggle";
import {
  BarChart3,
  BookOpenText,
  FolderKanban,
  Hammer,
  Home,
  Moon,
  Sun,
  TvMinimal,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "next-themes";

const navItems = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#skills", label: "Skills", icon: Hammer },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#stats", label: "Stats", icon: BarChart3 },
  { href: "/blog", label: "Blog", icon: BookOpenText, isRoute: true },
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
    <>
      <aside className="hidden h-screen border-r border-border/60 bg-background/85 md:sticky md:top-0 md:flex md:w-48 md:flex-col md:px-4 md:py-6">
        <div className="flex flex-1 flex-col justify-center gap-1 text-sm font-medium text-muted-foreground ">
          {navItems.map(({ href, label, icon: Icon, isRoute }) => {
            const isActive = isRoute
              ? location.pathname === href
              : href === "#Home"
                ? location.pathname === "/" && !location.hash
                : location.pathname === "/" && location.hash === href;
            const itemClass = `inline-flex h-10 w-full rounded-lg items-center gap-2 px-2.5 transition-colors ${
              isActive
                ? "bg-muted/55 text-foreground/90"
                : "text-muted-foreground hover:bg-muted/15 hover:text-foreground/90"
            }`;

            return isRoute ? (
              <Link key={label} to={href} className={itemClass}>
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ) : (
              <a key={label} href={href} className={itemClass}>
                <Icon size={16} />
                <span>{label}</span>
              </a>
            );
          })}
        </div>
        <div>
          <Tabs
            defaultValue="system"
            className="w-full"
            value={theme}
            onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
          >
            <TabsList className="grid w-full grid-cols-3 rounded-md border border-border/40 bg-muted/40 p-1 group-data-horizontal/tabs:h-10">
              {themes.map(({ theme, icon: Icon }) => (
                <TabsTrigger
                  key={theme}
                  value={theme}
                  className="h-full w-full rounded-smtext-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Icon size={16} />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
