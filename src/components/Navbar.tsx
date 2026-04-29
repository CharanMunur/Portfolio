import { ModeToggle } from "@/features/theme/mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center w-full p-4 bg-background text-neutral-400">
      <div className="container flex items-center justify-between mx-auto max-w-5xl">
        <div className="text-2xl">CharanMunur</div>
        <div className="flex gap-10">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#stats">Stats</a>
          <a href="/blog">Blog</a>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
