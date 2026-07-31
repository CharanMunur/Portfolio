import { cn } from "@/lib/utils";
import type { TechItem } from "@/data/tech";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TechIconProps = {
  item: TechItem;
  className?: string;
  showTooltip?: boolean;
};

const TechIcon = ({ item, className, showTooltip = false }: TechIconProps) => {
  const icon = (
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
  );

  if (!showTooltip) return icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{icon}</TooltipTrigger>
      <TooltipContent sideOffset={5}>
        <p className="text-xs">{item.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TechIcon;
