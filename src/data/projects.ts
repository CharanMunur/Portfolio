import { projectTech } from "@/data/tech";
import type { TechItem } from "@/data/tech";

export interface Project {
  name: string;
  imgSrc: string;
  description: string;
  techStack: TechItem[];
  liveLink: string;
  githubLink: string;
  about: string;
  features: string[];
}

export const projects: Project[] = [
  {
    name: "SuperTodo",
    imgSrc: "/projects/supertodo.png",
    description:
      "A full-featured todo app with priorities, due dates, subtasks, and date-grouped views. Animated with Framer Motion and styled with shadcn/ui for a polished experience.",
    about:
      "A personal productivity app built to go beyond a basic todo list. It supports subtasks, priority levels, due dates, and groups tasks by date for a cleaner overview. Built with React, shadcn/ui, and Framer Motion, with a heavy focus on animations and a polished user experience.",
    features: [
      "Create, edit, and delete tasks with subtask support and completion tracking",
      "Priority levels (High, Medium, Low) with visual indicators",
      "Due date picker with date-grouped task views",
      "Filter by All, Pending, and Completed — sort by status, priority, or date",
      "Smooth Framer Motion animations on task add, complete, and delete",
      "Dark and light theme toggle with persistent preference",
      "Data persisted via localStorage — survives page refresh",
    ],
    techStack: [
      projectTech.react,
      projectTech.javascript,
      projectTech.tailwindcss,
      projectTech.vite,
      projectTech.motion,
      projectTech.shadcnui,
    ],
    liveLink: "https://supertodo-v1.netlify.app/",
    githubLink: "https://github.com/CharanMunur/supertodo",
  },
  {
    name: "Markdown Editor",
    imgSrc: "/projects/markdowneditor.png",
    description:
      "A Monaco-powered markdown editor with live GitHub-style preview, PDF export via Print.js, theme toggle, and optional sync scroll to keep both panes aligned.",
    about:
      "A dual-pane workbench built for writing and previewing markdown in real time. It leverages Monaco Editor for syntax highlighting and code completion, with a live GitHub-styled preview on the right. Shipped with useful features like instant PDF export and synchronized scrolling.",
    features: [
      "Monaco Editor with syntax highlighting and code completion",
      "Live GitHub-styled markdown preview in the right pane",
      "Sync scroll — preview stays aligned with the editor as you type",
      "PDF export via Print.js with a single click",
      "Copy entire content to clipboard",
      "Dark and light theme toggle",
      "Content persisted via localStorage across sessions",
      "Bundled default markdown file for instant demo",
    ],
    techStack: [
      projectTech.react,
      projectTech.javascript,
      projectTech.tailwindcss,
      projectTech.vite,
      projectTech.monaco,
    ],
    liveLink: "https://markdown-editor-v1.netlify.app/",
    githubLink: "https://github.com/CharanMunur/markdown-editor",
  },
  {
    name: "Shadcn Scaffold",
    imgSrc: "/projects/shadcn-scaffold.png",
    description:
      "An automated CLI tool that instantly bootstraps production-ready React applications with Vite, TypeScript, Tailwind CSS v4, and shadcn/ui.",
    about:
      "Built to eliminate boilerplate fatigue. shadcn-scaffold is an interactive command-line interface that completely automates modern React project setups. From configuring complex path aliases and injecting dark mode providers, to orchestrating heavy dependencies—this tool condenses hours of manual configuration into a single, lightning-fast terminal command.",
    features: [
      "Interactive terminal UI built with React Ink for dynamic package selection",
      "Zero-config integration of Tailwind CSS v4 and shadcn/ui base components",
      "Injects fully functional Theme Providers and custom Mode Toggles",
      "Dynamically patches tsconfig.json and Vite settings to fix path aliasing bugs",
      "Orchestrates child processes (Execa) for reliable dependency resolution",
      "Published globally to NPM for instant execution via npx or bunx",
    ],
    techStack: [
      projectTech.nodejs,
      projectTech.typescript,
      projectTech.ink,
      projectTech.commander,
      projectTech.execa,
    ],
    liveLink: "https://www.npmjs.com/package/shadcn-scaffold",
    githubLink: "https://github.com/CharanMunur/shadcn-scaffold",
  },
];
