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
import { Avatar, AvatarImage } from "./ui/avatar";

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
      <aside className="hidden h-screen border-r border-border/40 bg-background/90 md:sticky md:top-0 md:flex md:w-52 md:flex-col md:px-4 md:py-8">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2.5 pb-4">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src="https://avatars.githubusercontent.com/u/198460996?v=4" />
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold text-foreground">
                Charan Munur
              </div>
              <div className="text-[11px] text-muted-foreground">
                Fullstack Developer
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1.5 text-base font-medium text-muted-foreground">
            {navItems.map(({ href, label, icon: Icon, isRoute }) => {
              const isActive = isRoute
                ? location.pathname === href
                : href === "#home"
                  ? location.pathname === "/" &&
                    (!location.hash || location.hash === href)
                  : location.pathname === "/" && location.hash === href;
              const itemClass = `inline-flex h-[2.625rem] w-full items-center gap-2 rounded-md px-3 transition-colors duration-200 ${
                isActive
                  ? "bg-muted text-muted-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`;

              return isRoute ? (
                <Link key={label} to={href} className={itemClass}>
                  <Icon size={17} />
                  <span>{label}</span>
                </Link>
              ) : (
                <a key={label} href={href} className={itemClass}>
                  <Icon size={17} />
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
                    className="h-8 w-full rounded-sm text-muted-foreground hover:text-foreground data-active:border data-active:border-border data-active:bg-card data-active:text-foreground data-[state=active]:border data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:text-foreground"
                  >
                    <Icon size={16} />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
