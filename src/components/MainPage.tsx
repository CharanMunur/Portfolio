import { BadgeCheck, BookText, ChevronRight } from "lucide-react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Button } from "./ui/button";
import SkillRow from "./SkillRow";
import ProjectCard from "./ProjectCard";

const MainPage = () => {
  const skills = [
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
    { name: "Springboot", icon: "https://cdn.simpleicons.org/springboot" },
    { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase" },
  ];

  const socials = [
    {
      name: "Github",
      icon: FaGithub,
      href: "https://github.com/CharanMunur",
      color: "#ffffff",
    },
    {
      name: "Linkedin",
      icon: FaLinkedin,
      href: "https://linkedin.com/in/sai-charan-munur-614623352",
      color: "#0A66C2",
    },
    {
      name: "Gmail",
      icon: BiLogoGmail,
      href: "mailto:charanmunur@gmail.com",
      color: "#EA4335",
    },
    {
      name: "Leetcode",
      icon: SiLeetcode,
      href: "https://leetcode.com/u/CharanMunur/",
      color: "#FFA116",
    },
  ];

  const row1 = [
    "React",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "shadcn/ui",
    "Vite",
    "HTML5",
    "CSS",
  ];
  const row2 = ["Java", "Spring Boot", "MySQL", "Supabase", "PostgreSQL"];
  const row3 = [
    "Git",
    "GitHub",
    "Maven",
    "Gradle",
    "Vercel",
    "Netlify",
    "Bun",
    "NPM",
  ];

  return (
    <main className="mt-32 mx-auto w-full max-w-3xl px-6" id="home">
      <div className="gap-5 space-y-8">
        <div className="flex items-center gap-6">
          <div>
            {/* avatar */}
            <img
              src="https://avatars.githubusercontent.com/u/198460996?v=4"
              alt="profile"
              className="w-40 h-40 rounded-full border border-border p-1 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl">
              Charan Munur
              <span className="text-background">
                <BadgeCheck color="currentColor" fill="#3b82f6" size={32} />
              </span>
            </h1>
            <div className="flex items-center gap-4">
              {socials.map(({ name, icon: Icon, href, color }) => (
                <a key={name} href={href} target="_blank" className="border-0 ">
                  <Icon
                    style={{ color }}
                    size={25}
                    className="border rounded"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">
            FullStack Developer -{" "}
            <span className="text-3xl text-muted-foreground">
              Learning Systems <br /> Shipping clean interfaces
            </span>
          </h1>
          <p className="text-lg font-light leading-8 text-muted-foreground">
            I build web apps focused on performance and user experience with{" "}
            <span className="inline items-center gap-2 align-middle">
              {skills.map(({ name, icon }) => (
                <span
                  key={name}
                  className="bg-card inline-flex items-center gap-1.5 rounded-md border border-dashed px-2.5 py-1 text-sm text-foreground"
                >
                  <img src={icon} className="w-4 h-4" alt={name} />
                  {name}
                </span>
              ))}
            </span>
            . I am also exploring blockchain.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg">
              Get in Touch
              <ChevronRight />
            </Button>
            <Button
              size="lg"
              className="bg-card text-foreground border border-border border-dashed"
            >
              Resume
              <BookText />
            </Button>
          </div>
        </div>
      </div>
      <section id="skills" className="mt-34 max-w-3xl">
        <div className="flex gap-3">
          <span className="text-3xl font-bold">|</span>
          <p className="text-3xl font-semibold">My Stack</p>
        </div>
        <div className="relative mt-6 flex flex-col gap-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-linear-to-l from-background to-transparent" />
          <SkillRow skills={row1} direction="left" />
          <SkillRow skills={row2} direction="right" />
          <SkillRow skills={row3} direction="left" />
        </div>
      </section>
      <section id="projects" className="mt-34 h-500">
        <div className="flex gap-3">
          <span className="text-3xl font-bold">|</span>
          <p className="text-3xl font-semibold">Projects</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
    </main>
  );
};

export default MainPage;
