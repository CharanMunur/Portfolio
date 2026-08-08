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
    name: "Excalidraw",
    slug: "excalidraw",
    logoLight: "/images/opensource/excalidraw-light.webp",
    logoDark: "/images/opensource/excalidraw-dark.webp",
    link: "https://github.com/excalidraw/excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams",
    prs: [
      {
        id: "11734",
        title: "fix: add tooltips to sidebar header icons",
        description: "Added tooltips to icon-only buttons in the sidebar header (Search, Library, Comments, Presentation, and Close) using the existing Tooltip component for better discoverability and consistency.",
        link: "https://github.com/excalidraw/excalidraw/pull/11734",
        status: "Open",
        date: "Jul 2026",
      }
    ],
    issues: [
      {
        id: "11731",
        title: "Library sidebar icons missing tooltips",
        description: "Noticed the icons in the library sidebar header (search, library, comments, presentation/stats) don't have any tooltip on hover. Created an issue to align them with the pin icon's pattern.",
        link: "https://github.com/excalidraw/excalidraw/issues/11731",
        status: "Open",
        date: "Jul 2026",
      },
      {
        id: "11730",
        title: "Language dropdown uses native browser select styling",
        description: "Reported an inconsistency where the language selector was rendered using the browser's native <select> styling instead of matching the rest of the application's custom menu components.",
        link: "https://github.com/excalidraw/excalidraw/issues/11730",
        status: "Open",
        date: "Jul 2026",
      },
    ],
  },
  {
    name: "Reicon",
    slug: "reicon",
    logoLight: "/images/opensource/reicon-light.webp",
    logoDark: "/images/opensource/reicon-dark.webp",
    link: "https://github.com/dqev/reicon",
    description: "A beautifully crafted, open-source icon library",
    prs: [
      {
        id: "63",
        title: "docs: add syntax highlighting to troubleshooting code blocks",
        description: "Converted data.ts to data.tsx and added manual JSX highlighting markup to the code snippets in the Troubleshooting section to match the rest of the docs.",
        link: "https://github.com/dqev/reicon/pull/63",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "62",
        title: "fix: include answers in FAQ markdown export and LLM chat",
        description: "Fixed a bug where clicking \"Copy as Markdown\" or \"Open in ChatGPT\" on the FAQ page omitted the JSX-based answers by adding a plain-text markdownAnswer property.",
        link: "https://github.com/dqev/reicon/pull/62",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "61",
        title: "chore: fix Header smoke test duplicate link resolution",
        description: "Fixed the Header smoke test in src/test/smoke.test.tsx which was failing due to getByText finding duplicate \"Icons\" links by switching to getAllByText.",
        link: "https://github.com/dqev/reicon/pull/61",
        status: "Merged",
        date: "Aug 2026",
      },
      {
        id: "59",
        title: "fix: resolve CORS issue on illustration",
        description: "Resolved the CORS error that blocked PNG/SVG illustration downloads by generating a local Blob directly from the svgCode state. Also updated exported filenames to accurately reflect the selected export size.",
        link: "https://github.com/dqev/reicon/pull/59",
        status: "Merged",
        date: "Aug 2026",
      },
    ],
    issues: [
      {
        id: "57",
        title: "Illustration code snippet block isn't scrollable",
        description: "Reported a bug on illustration detail pages where the code preview box clipped overflowing content instead of scrolling, and proposed a flex container min-height fix.",
        link: "https://github.com/dqev/reicon/issues/57",
        status: "Closed",
        date: "Aug 2026",
      }
    ],
  }
];
