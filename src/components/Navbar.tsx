import { Menu, Moon, Sun, TvMinimal, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "next-themes";
import { useState } from "react";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
];

const themes = [
  { theme: "system", icon: TvMinimal },
  { theme: "light", icon: Sun },
  { theme: "dark", icon: Moon },
];

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const currentTheme = theme ?? "system";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-dashed border-border/60 transition-all ${isOpen ? "bg-background" : "bg-background/65 backdrop-blur"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="shrink-0 text-lg font-light tracking-normal text-foreground sm:text-xl hover:opacity-80 transition-opacity"
        >
          @charanmunur
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex flex-1 items-center justify-end gap-1 pr-3">
          {navItems.map(({ href, label }) => {
            const isActive = location.pathname.startsWith(href);

            const itemClass = `rounded-md px-3 py-2 text-base font-light transition-colors ${
              isActive
                ? "!text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`;

            return (
              <Link key={label} to={href} className={itemClass}>
                {label}
              </Link>
            );
          })}
        </div>

        <div
          className="hidden sm:block h-6 w-px shrink-0 bg-border/80 mx-2"
          aria-hidden="true"
        />

        <div className="hidden sm:flex shrink-0 items-center">
          <Tabs
            value={currentTheme}
            onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
          >
            <TabsList className="flex rounded-full border border-dashed border-border/70 bg-muted/30 gap-1 p-1">
              {themes.map(({ theme, icon: Icon }) => (
                <TabsTrigger
                  key={theme}
                  value={theme}
                  className="h-6 w-6 rounded-full flex items-center justify-center bg-transparent text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground! data-[state=active]:shadow-sm"
                >
                  <Icon className="size-[16px]" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="relative w-9 h-9 flex sm:hidden items-center justify-center p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <Menu
            className={`absolute transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
            size={20}
          />
          <X
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            size={20}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden absolute top-16 left-0 w-full border-b border-dashed border-border/60 bg-background px-4 py-4 flex flex-col gap-4 shadow-sm transition-all ease-in-out duration-200 origin-top ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navItems.map(({ href, label }) => {
            const isActive = location.pathname.startsWith(href);
            const itemClass = `rounded-md px-3 py-2.5 text-base font-light tracking-tight transition-colors ${
              isActive
                ? "bg-accent/60 text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
            }`;
            return (
              <Link
                key={label}
                to={href}
                onClick={() => setIsOpen(false)}
                className={itemClass}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="h-px w-full bg-border/80" aria-hidden="true" />

        <div className="flex items-center justify-between px-1">
          <span className="text-base font-light tracking-tight text-muted-foreground">
            Theme
          </span>
          <Tabs
            value={currentTheme}
            onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
          >
            <TabsList className="flex rounded-full border border-dashed border-border/70 bg-muted/30 gap-1 p-1">
              {themes.map(({ theme, icon: Icon }) => (
                <TabsTrigger
                  key={theme}
                  value={theme}
                  className="h-6 w-6 rounded-full flex items-center justify-center bg-transparent text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground! data-[state=active]:shadow-sm"
                >
                  <Icon className="size-[16px]" />
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
