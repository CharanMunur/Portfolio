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
    name: "Shrtn",
    imgSrc: "/projects/shrtn.png",
    description:
      "A production URL shortener with sub-20ms edge redirects, smart device routing, auto-destruct links, and deep click analytics — deployed across Cloudflare, Render, and Vercel.",
    about:
      "A full-stack URL shortener & analytics platform. Short links resolve in under 20ms via a Go WebAssembly worker on Cloudflare Edge that queries Upstash Redis — asynchronously logging click data to PostgreSQL through Spring Boot. Supports custom aliases, auto-destruct limits, password protection, smart iOS/Android routing, QR codes, and deep per-link analytics with UTM tracking, referrer categorization, and a 7-day growth velocity.",
    features: [
      "Go WebAssembly worker on Cloudflare Edge handles redirects in under 20ms across 300+ global locations using Upstash Redis REST",
      "Redirect cache is warmed eagerly on link creation so the first click always hits Redis, never the database",
      "Auto-destruct links automatically deactivate and evict from cache once a max click threshold is reached",
      "Smart device routing resolves separate iOS, Android, and desktop destinations from the User-Agent at the edge",
      "Click tracking runs asynchronously via ctx.waitUntil so analytics writes never affect redirect speed",
      "Edge asset caching for static bundles eliminates cold-start 502 errors on Render's free tier",
      "Per-link analytics cover browser, OS, country, referrer category, UTM params, a 7×24 traffic heatmap, and 7-day growth velocity",
      "Links can be password-protected with bcrypt hashing, generate QR codes, and export analytics as CSV or JSON",
    ],
    techStack: [
      // backend
      projectTech.go,
      projectTech.springboot,
      projectTech.postgresql,
      projectTech.redis,
      // frontend
      projectTech.react,
      projectTech.typescript,
      projectTech.tailwindcss,
      projectTech.shadcnui,
      projectTech.framermotion,
      // devops
      projectTech.cloudflare,
      projectTech.docker,
      // auth / other
      projectTech.jwt,
      projectTech.webassembly,
    ],
    liveLink: "https://shrtn.fun",
    githubLink: "https://github.com/CharanMunur/shrtn",
  },
  {
    name: "Clippy",
    imgSrc: "/projects/clippy.png",
    description:
      "A native clipboard manager for GNOME/Ubuntu. Captures text and image history, lets you pin, search, and drag entries straight into other apps - built to feel like it belongs on the desktop.",
    about:
      "Built after switching from Windows and missing its clipboard history tool. Could not find a Linux equivalent with a clean UI that did not need heavy configuration, so I built one myself in Rust with GTK4 and libadwaita. It follows the system's light/dark theme and accent color automatically, stores everything locally with no cloud or telemetry, and runs quietly in the background until summoned with a global shortcut.",
    features: [
      "Automatic clipboard history for both text and images, stored locally in SQLite",
      "Pin entries to keep them at the top - survives Clear All",
      "Live search across clipboard history as you type",
      "Click any entry to copy it instantly, or drag it directly into another app",
      "Configurable global keyboard shortcut to toggle the window",
      "Native GNOME look - follows system light/dark theme and accent color via libadwaita",
      "Packaged as both .deb and .rpm for Debian/Ubuntu and Fedora-based distros",
      "No cloud sync, no telemetry - everything stays on the machine",
    ],
    techStack: [
      projectTech.rust,
      projectTech.gtk4,
      projectTech.libadwaita,
      projectTech.sqlite,
    ],
    liveLink: "https://github.com/CharanMunur/Clippy/releases",
    githubLink: "https://github.com/CharanMunur/clippy",
  },
  {
    name: "Markdown Editor",
    imgSrc: "/projects/markdown-editor.png",
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
      // frontend core
      projectTech.react,
      projectTech.javascript,
      projectTech.tailwindcss,
      // main lib
      projectTech.monaco,
      // build tool
      projectTech.vite,
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
      // frontend core
      projectTech.react,
      projectTech.javascript,
      projectTech.tailwindcss,
      // UI & animation libs
      projectTech.shadcnui,
      projectTech.motion,
      // build tool
      projectTech.vite,
    ],
    liveLink: "https://supertodo-v1.netlify.app/",
    githubLink: "https://github.com/CharanMunur/supertodo",
  },
];

// End of projects data
