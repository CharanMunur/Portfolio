import { motion } from "framer-motion";

const SkillRow = ({
  skills,
  direction,
}: {
  skills: string[];
  direction: "left" | "right";
}) => (
  <div className="overflow-hidden">
    <motion.div
      className="flex gap-4 w-max"
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...skills, ...skills].map((skill, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 px-4 py-1 bg-card rounded-lg border border-dashed whitespace-nowrap"
        >
          <img
            src={`https://cdn.simpleicons.org/${skill.toLowerCase().replace(/[\s/]/g, "")}`}
            className="w-4 h-4"
            alt={skill}
          />
          {skill}
        </span>
      ))}
    </motion.div>
  </div>
);

export default SkillRow;
