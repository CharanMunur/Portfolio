export type Contribution = {
  id: string;
  title: string;
  description: string;
  link: string;
  status: "Merged" | "Open" | "Closed";
  date: string;
};

export type OpenSourceProject = {
  name: string;
  slug: string;
  logoLight: string;
  logoDark: string;
  link: string;
  description: string;
  prs: Contribution[];
  issues: Contribution[];
};

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "Vengeance UI",
    slug: "vengeanceui",
    logoLight: "/images/opensource/vengeance-light.svg",
    logoDark: "/images/opensource/vengeance-dark.svg",
    link: "https://github.com/Ashutoshx7/VengeanceUI",
    description: "A modern React UI library with animated components for stunning landing pages.",
    prs: [
      {
        id: "69",
        title: "feat(docs): unify and redesign codeblock UI with dual-theme support",
        description: "Unifies CodeBlock design and resolves Next.js development crashes.",
        link: "https://github.com/Ashutoshx7/VengeanceUI/pull/69",
        status: "Merged",
        date: "Aug 2026",
      }
    ],
    issues: [],
  },
  {
    name: "Reicon",
    slug: "reicon",
    logoLight: "/images/opensource/reicon-light.webp",
    logoDark: "/images/opensource/reicon-dark.webp",
    link: "https://github.com/dqev/reicon",
    description: "A meticulously crafted open-source SVG icon library for modern web apps.",
    prs: [
      {
        id: "67",
        title: "docs: add syntax highlighting to mcp server code blocks",
        description: "Adds manual JSX syntax highlighting to the plain-text code blocks in the MCP Server documentation.",
        link: "https://github.com/dqev/reicon/pull/67",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "66",
        title: "fix: correct logo download filenames and use cdn proxy for svg",
        description: "Fixes the SVG download blocked by CORS and corrects download filenames.",
        link: "https://github.com/dqev/reicon/pull/66",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "63",
        title: "docs: add syntax highlighting to troubleshooting code blocks",
        description: "Added JSX highlighting markup to troubleshooting code snippets.",
        link: "https://github.com/dqev/reicon/pull/63",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "62",
        title: "fix: include answers in FAQ markdown export and LLM chat",
        description: "Fixed FAQ markdown export omitting JSX-based answers.",
        link: "https://github.com/dqev/reicon/pull/62",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "61",
        title: "chore: fix Header smoke test duplicate link resolution",
        description: "Fixed smoke test failing due to duplicate link resolution.",
        link: "https://github.com/dqev/reicon/pull/61",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "59",
        title: "fix: resolve CORS issue on illustration",
        description: "Resolved CORS error blocking PNG/SVG downloads.",
        link: "https://github.com/dqev/reicon/pull/59",
        status: "Merged",
        date: "Aug 2026",
      },
    ],
    issues: [
      {
        id: "57",
        title: "Illustration code snippet block isn't scrollable",
        description: "Illustration code preview box clipped overflowing content.",
        link: "https://github.com/dqev/reicon/issues/57",
        status: "Closed",
        date: "Aug 2026",
      }
    ],
  },
  {
    name: "Excalidraw",
    slug: "excalidraw",
    logoLight: "/images/opensource/excalidraw-light.webp",
    logoDark: "/images/opensource/excalidraw-dark.webp",
    link: "https://github.com/excalidraw/excalidraw",
    description: "A virtual collaborative whiteboard tool for sketching hand-drawn diagrams.",
    prs: [
      {
        id: "11734",
        title: "fix: add tooltips to sidebar header icons",
        description: "Added tooltips to icon-only buttons in the sidebar header for better discoverability.",
        link: "https://github.com/excalidraw/excalidraw/pull/11734",
        status: "Open",
        date: "Jul 2026",
      }
    ],
    issues: [
      {
        id: "11731",
        title: "Library sidebar icons missing tooltips",
        description: "Missing tooltips on library sidebar icons.",
        link: "https://github.com/excalidraw/excalidraw/issues/11731",
        status: "Open",
        date: "Jul 2026",
      },
      {
        id: "11730",
        title: "Language dropdown uses native browser select styling",
        description: "Language selector used native browser styling instead of custom menu components.",
        link: "https://github.com/excalidraw/excalidraw/issues/11730",
        status: "Open",
        date: "Jul 2026",
      },
    ],
  }
];

