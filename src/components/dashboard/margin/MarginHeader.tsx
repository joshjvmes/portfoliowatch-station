import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

interface MarginHeaderProps {
  mode: "Cross" | "Isolated";
  onModeChange: () => void;
  onTransfer: () => void;
}

const MarginHeader = ({ mode, onModeChange, onTransfer }: MarginHeaderProps) => {
  const { showBalances, toggleBalances } = useBalanceVisibility();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-white">Margin Balance</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleBalances}
          className="text-gray-400 hover:text-white hover:bg-[#1A2333] -ml-2"
        >
          {showBalances ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className={`${
            mode === "Cross" 
              ? "bg-yellow-400 text-black hover:bg-yellow-500" 
              : "bg-red-500 text-white hover:bg-red-600"
          } transition-colors duration-200 text-sm`}
          onClick={onModeChange}
        >
          {mode} Mode
        </Button>
        <Button 
          variant="outline" 
          className="text-gray-400 border-white/10 hover:bg-white/10 transition-colors duration-200 text-sm"
          onClick={onTransfer}
        >
          Transfer
        </Button>
      </div>
    </div>
  );
};

export default MarginHeader;