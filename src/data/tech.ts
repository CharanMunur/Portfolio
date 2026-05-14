export interface TechItem {
  name: string;
  icon: string;
  darkIcon?: string;
}

export const skills: TechItem[] = [
  { name: "React", icon: "/tech/react.svg" },
  { name: "JavaScript", icon: "/tech/js.svg" },
  { name: "TypeScript", icon: "/tech/typescript.svg" },
  { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  { name: "Spring Boot", icon: "/tech/springboot.svg" },
  { name: "Supabase", icon: "/tech/supabase.svg" },
];

export const frontendSkills: TechItem[] = [
  { name: "React", icon: "/tech/react.svg" },
  { name: "TypeScript", icon: "/tech/typescript.svg" },
  { name: "JavaScript", icon: "/tech/js.svg" },
  { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  {
    name: "shadcn/ui",
    icon: "/tech/shadcn-ui-light.svg",
    darkIcon: "/tech/shadcn-ui-dark.svg",
  },
  { name: "Vite", icon: "/tech/vite.svg" },
  { name: "HTML5", icon: "/tech/html5.svg" },
  {
    name: "CSS",
    icon: "/tech/css3.svg",
    darkIcon: "/tech/css3-dark.svg",
  },
];

export const backendSkills: TechItem[] = [
  { name: "Java", icon: "/tech/java.svg" },
  { name: "Spring Boot", icon: "/tech/springboot.svg" },
  { name: "MySQL", icon: "/tech/mysql.svg" },
  { name: "Supabase", icon: "/tech/supabase.svg" },
  { name: "PostgreSQL", icon: "/tech/postgre.svg" },
];

export const toolsSkills: TechItem[] = [
  { name: "Git", icon: "/tech/git.svg" },
  {
    name: "GitHub",
    icon: "/social/github.svg",
    darkIcon: "/social/github-dark.svg",
  },
  { name: "Maven", icon: "/tech/apachemaven.svg" },
  { name: "Gradle", icon: "/tech/gradle.svg" },
  { name: "Vercel", icon: "/tech/vercel-light.svg", darkIcon: "/tech/vercel-dark.svg" },
  { name: "Netlify", icon: "/tech/netlify.svg" },
  {
    name: "Bun",
    icon: "/tech/bun.svg",
    darkIcon: "/tech/bun-dark.svg",
  },
  { name: "NPM", icon: "/tech/npm.svg" },
];

export const skillRows: { direction: "left" | "right"; category: string; items: TechItem[] }[] = [
  {
    direction: "left",
    category: "Frontend",
    items: frontendSkills,
  },
  {
    direction: "right",
    category: "Backend",
    items: backendSkills,
  },
  {
    direction: "left",
    category: "Tools & DevOps",
    items: toolsSkills,
  },
];

export const projectTech = {
  react: { name: "React", icon: "/tech/react.svg" },
  javascript: { name: "JavaScript", icon: "/tech/js.svg" },
  typescript: { name: "TypeScript", icon: "/tech/typescript.svg" },
  tailwindcss: { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  vite: { name: "Vite", icon: "/tech/vite.svg" },
  motion: { name: "Framer Motion", icon: "/tech/motion.svg" },
  radixui: {
    name: "Radix UI",
    icon: "/tech/radixui.svg",
    darkIcon: "/tech/radixui-dark.svg",
  },
  shadcnui: {
    name: "shadcn/ui",
    icon: "/tech/shadcn-ui-light.svg",
    darkIcon: "/tech/shadcn-ui-dark.svg",
  },
  supabase: { name: "Supabase", icon: "/tech/supabase.svg" },
  monaco: { name: "Monaco Editor", icon: "/tech/monaco.svg" },
  nodejs: {
    name: "Node.js",
    icon: "/tech/nodejs-light.svg",
    darkIcon: "/tech/nodejs-dark.svg",
  },
  ink: {
    name: "Ink",
    icon: "/tech/ink-light.svg",
    darkIcon: "/tech/ink-dark.svg",
  },
  commander: {
    name: "Commander.js",
    icon: "/tech/commander-light.svg",
    darkIcon: "/tech/commander-dark.svg",
  },
  execa: {
    name: "Execa",
    icon: "/tech/execa-light.svg",
    darkIcon: "/tech/execa-dark.svg",
  },
} as const;
