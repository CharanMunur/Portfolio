import { BadgeCheck, BookText, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import TechIcon from "./TechIcon";
import { skills } from "@/data/tech";
import { socials } from "@/data/socials";
import SocialIcon from "./SocialIcon";
const Hero = () => {
  return (
    <section
      className="flex flex-col justify-center pt-24 pb-8 sm:pt-32 sm:pb-12"
      id="home"
    >
      <div className="space-y-5 sm:space-y-10">
        <div className="flex items-center mb-8 gap-[14px] sm:gap-[20px]">
          <div>
            {/* avatar */}
            <img
              src="https://avatars.githubusercontent.com/u/198460996?v=4"
              alt="profile"
              loading="lazy"
              className="h-28 w-28 rounded-full border-2 border-border p-1 shadow-sm sm:h-40 sm:w-40"
            />
          </div>
          <div className="flex h-full flex-col justify-center gap-1 sm:gap-2">
            <h1 className="flex items-center gap-1 text-right text-2xl font-semibold sm:text-2xl md:text-3xl">
              Charan Munur
              <span className="text-background">
                <BadgeCheck color="currentColor" fill="#3b82f6" size={28} />
              </span>
            </h1>
            <div className="flex items-start gap-2 sm:gap-3">
              {socials.map(({ name, icon, darkIcon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="border-0"
                >
                  <SocialIcon
                    icon={icon}
                    darkIcon={darkIcon}
                    alt={name}
                    className="h-6 w-6 rounded border border-border/70 p-0.5 sm:h-7 sm:w-7"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            FullStack Developer -{" "}
            <span className="text-2xl text-muted-foreground sm:text-3xl">
              Learning Systems <br /> Shipping Clean Interfaces.
            </span>
          </h1>
          <p className="text-base font-light leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I build backend systems and clean interfaces with{" "}
            <span className="inline items-center gap-2 align-middle">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-card ml-1 inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-1 text-xs text-foreground sm:px-2.5 sm:text-sm"
                >
                  <TechIcon
                    item={skill}
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  />
                  {skill.name}
                </span>
              ))}
            </span>{" "}
            — with a keen eye for detail and responsiveness. Also exploring
            blockchain out of curiosity.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button size="lg">
              Get in Touch
              <ChevronRight />
            </Button>
            <a
              href="https://drive.google.com/file/d/1AF0owusJPd1yf1vRwCJcaex04pnEVL_H/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                size="lg"
                className="bg-card text-foreground border border-border border-dashed cursor-pointer"
              >
                Resume
                <BookText />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
