import { memo } from "react";
import TechIcon from "./TechIcon";
import type { TechItem } from "@/data/tech";

const SkillRow = memo(({
  skills,
  direction,
}: {
  skills: TechItem[];
  direction: "left" | "right";
}) => (
  <div className="overflow-hidden">
    <div
      className={`flex gap-4 w-max will-change-transform ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      }`}
    >
      {[...skills, ...skills].map((skill, i) => (
        <span
          key={`${skill.name}-${i}`}
          className="inline-flex items-center gap-2 px-2 py-1 bg-card rounded-lg border border-dashed whitespace-nowrap"
        >
          <TechIcon item={skill} className="w-4 h-4" />
          {skill.name}
        </span>
      ))}
    </div>
  </div>
));
SkillRow.displayName = "SkillRow";

export default SkillRow;
