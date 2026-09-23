export type UseCategory = {
  title: string;
  description: string;
  items: {
    name: string;
    description: string;
    link?: string;
    tag?: string;
  }[];
};

export const usesData: UseCategory[] = [
  {
    title: "Hardware & Ergonomics",
    description: "The physical gear and ergonomic setup I use daily for engineering and deep work.",
    items: [
      {
        name: "Samsung Galaxy Book 4",
        description: "Intel Core i5 13th Gen with 8GB RAM, running Ubuntu Linux 24.04 LTS as my main development machine.",
        tag: "Laptop",
      },
      {
        name: "Logitech MK240 Combo",
        description: "Compact wireless 60% layout keyboard and lightweight mouse for ergonomic typing.",
        tag: "Peripherals",
      },
      {
        name: "Ergonomic Stand & Setup",
        description: "Laptop stand elevating the screen to eye level, paired with a Clozeu desk mat and maintaining at least 1 meter viewing distance for eye health.",
        tag: "Ergonomics",
      },
      {
        name: "boAt Rockerz 400",
        description: "On-ear wireless headphones for focus sessions and listening to music while coding.",
        tag: "Audio",
      },
    ],
  },
  {
    title: "Editor & Operating System",
    description: "My coding environment tuned for speed, efficiency, and light memory footprint.",
    items: [
      {
        name: "Zed Editor",
        description: "Primary editor — blazingly fast, written in Rust, and extremely lightweight on RAM.",
        link: "https://zed.dev",
        tag: "Editor",
      },
      {
        name: "Cursor",
        description: "Secondary AI editor — used whenever full VS Code extension (VSX) support is needed.",
        link: "https://cursor.com",
        tag: "Editor",
      },
      {
        name: "Ubuntu 24.04 LTS",
        description: "Primary Linux operating system for a fast, native terminal and dev setup.",
        tag: "OS",
      },
      {
        name: "GNOME Terminal & Bash",
        description: "Default Linux terminal shell environment for running scripts and Git commands.",
        tag: "Terminal",
      },
    ],
  },
  {
    title: "AI, CLI Tools & Cloud Hosting",
    description: "AI assistants, agentic CLI tools, and cloud infrastructure powering my development.",
    items: [
      {
        name: "Antigravity CLI, Claude & Codex",
        description: "Go-to AI suite — loving Antigravity CLI for its free student access and generous limits, alongside Claude and Codex for pair programming and rapid code generation.",
        tag: "AI & Agents",
      },
      {
        name: "Bun & Node.js",
        description: "Favorite JavaScript/TypeScript runtime and package manager, loved for its blazing speed.",
        link: "https://bun.sh",
        tag: "Runtime",
      },
      {
        name: "Git & GitHub CLI",
        description: "Version control workflow managed through Git terminal commands and gh CLI.",
        link: "https://cli.github.com",
        tag: "VCS",
      },
      {
        name: "Render & Cloudflare",
        description: "Render for deploying backend servers and Cloudflare for edge caching, DNS, and fast web delivery.",
        link: "https://render.com",
        tag: "Cloud",
      },
    ],
  },
  {
    title: "Software & Dev Stack",
    description: "Languages, frameworks, and productivity applications used in daily projects.",
    items: [
      {
        name: "Spring Boot & Go",
        description: "Spring Boot (primary Java backend framework) and Go for high-performance microservices and CLI tools.",
        tag: "Backend",
      },
      {
        name: "React, Next.js & TypeScript",
        description: "Core web stack for crafting type-safe, performant frontend applications.",
        tag: "Frontend",
      },
      {
        name: "Tailwind CSS & Vite",
        description: "Utility-first CSS framework and instant-reloading Vite build tool.",
        link: "https://tailwindcss.com",
        tag: "Tools",
      },
      {
        name: "Bruno",
        description: "Favorite open-source, Git-friendly API client for testing REST & GraphQL endpoints.",
        link: "https://usebruno.com",
        tag: "API Client",
      },
      {
        name: "Paper, Excalidraw & Clippy",
        description: "Paper sketches & Excalidraw for system diagrams, paired with Clippy for quick local clipboard management.",
        link: "https://excalidraw.com",
        tag: "Design",
      },
      {
        name: "Google Chrome, Brave & Firefox",
        description: "Chrome as primary web browser alongside Brave and Firefox for testing and privacy.",
        tag: "Browser",
      },
      {
        name: "Spotify & Focused Workflow",
        description: "Spotify for deep focus music while keeping messaging intentional (Telegram/WhatsApp) and staying clear of social media doom-scrolling.",
        tag: "Workflow",
      },
    ],
  },
];
