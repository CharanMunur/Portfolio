import { cn } from "@/lib/utils";
import type { TechItem } from "@/data/tech";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TechIconProps = {
  item: TechItem;
  className?: string;
};

const TechIcon = ({ item, className }: TechIconProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="relative inline-flex shrink-0 cursor-default">
          <img
            src={item.icon}
            alt={item.name}
            className={cn("block", className, item.darkIcon ? "dark:hidden" : "")}
          />
          {item.darkIcon ? (
            <img
              src={item.darkIcon}
              alt={item.name}
              className={cn("hidden", className, "dark:block")}
            />
          ) : null}
        </span>
      </TooltipTrigger>
      <TooltipContent sideOffset={5}>
        <p className="text-xs">{item.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TechIcon;
