import { memo } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="flex gap-4 w-max will-change-transform"
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...skills, ...skills].map((skill, i) => (
        <span
          key={`${skill.name}-${i}`}
          className="inline-flex items-center gap-2 px-4 py-1 bg-card rounded-lg border border-dashed whitespace-nowrap"
        >
          <TechIcon item={skill} className="w-4 h-4" />
          {skill.name}
        </span>
      ))}
    </motion.div>
  </div>
));
SkillRow.displayName = "SkillRow";

export default SkillRow;
