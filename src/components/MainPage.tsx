import { BadgeCheck } from "lucide-react";

const MainPage = () => {
  const skills = [
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
    { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss" },
    { name: "Springboot", icon: "https://cdn.simpleicons.org/springboot" },
    { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase" },
  ];
  return (
    <main className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* banner */}
        <div className="relative">
          <img
            src="https://preview.redd.it/clean-and-minimalistic-vagabond-banner-for-discord-and-v0-48g7ci8ondia1.jpg?width=1080&crop=smart&auto=webp&s=ce86ddb0f24cdeecfc194030b95132e8d398afc5"
            alt="banner"
            className="w-full h-56 object-cover rounded-t-2xl"
          />

          {/* avatar */}
          <img
            src="https://avatars.githubusercontent.com/u/198460996?v=4"
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-background absolute -bottom-16 left-6"
          />
        </div>

        {/* content */}
        <div className="mt-20 space-y-8">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Charan Munur
            <span className="text-background">
              <BadgeCheck color="currentColor" fill="#3b82f6" size={32} />
            </span>
          </h1>

          <p className="text-4xl font-semibold">
            Fullstack Developer -{" "}
            <span className="text-3xl text-muted-foreground">
              Learning Systems
              <br />
              Shipping Clean interfaces{" "}
            </span>
          </p>
        </div>
        {/* description */}
        <p className="mt-6 text-muted-foreground leading-relaxed">
          I build scalable web apps with{" "}
          <span className="inline-flex flex-wrap items-center gap-2 align-middle">
            {skills.map(({ name, icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 text-sm bg-muted/50 border border-dashed border-border rounded-md"
              >
                <img src={icon} className="w-4 h-4" alt={name} />
                {name}
              </span>
            ))}
          </span>
          . Focused on performance and user experience. Exploring AI to build
          smarter solutions.
        </p>
      </div>
    </main>
  );
};

export default MainPage;
