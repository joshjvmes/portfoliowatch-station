import { ChevronRight } from "lucide-react";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

const MarginBalanceDisplay = () => {
  const { showBalances } = useBalanceVisibility();
  const hiddenValue = "*****";

  return (
    <div>
      <div className="text-2xl md:text-4xl font-bold text-white break-all">
        {showBalances ? "59,977.3129" : hiddenValue} <span className="text-gray-400">USD</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400 mt-1 text-sm md:text-base">
        ≈ {showBalances ? "$59,977.31" : hiddenValue} / Today's Realized PnL {showBalances ? "$0.00 (+0.00%)" : hiddenValue} <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
};

export default MarginBalanceDisplay;