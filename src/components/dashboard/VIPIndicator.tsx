import { Gem } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VIPIndicatorProps {
  level: number; // Level from 1-5
}

const VIPIndicator = ({ level }: VIPIndicatorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Gem
                key={index}
                className={`h-5 w-5 transition-all ${
                  index < level
                    ? "text-[#00E5BE]"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>VIP Level {level}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VIPIndicator;