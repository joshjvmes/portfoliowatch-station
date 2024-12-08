import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight } from "lucide-react";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const MarginBalance = () => {
  const { showBalances } = useBalanceVisibility();
  const hiddenValue = "*****";
  const [mode, setMode] = useState<"Cross" | "Isolated">("Cross");
  const [showAutoRepayMenu, setShowAutoRepayMenu] = useState(false);
  const isMobile = useIsMobile();

  const handleModeChange = () => {
    const newMode = mode === "Cross" ? "Isolated" : "Cross";
    setMode(newMode);
  };

  const handleTransfer = () => {
    // Transfer functionality coming soon
  };

  const handleAutoRepayOption = (option: string) => {
    // Set auto repay option
    setShowAutoRepayMenu(false);
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-white">Margin Balance</h2>
              <Eye className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`${
                  mode === "Cross" 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "bg-red-500 text-white hover:bg-red-600"
                } transition-colors duration-200 text-sm`}
                onClick={handleModeChange}
              >
                {mode} Mode
              </Button>
              <Button 
                variant="outline" 
                className="text-gray-400 border-white/10 hover:bg-white/10 transition-colors duration-200 text-sm"
                onClick={handleTransfer}
              >
                Transfer
              </Button>
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-4xl font-bold text-white break-all">
              {showBalances ? "59,977.3129" : hiddenValue} <span className="text-gray-400">USD</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mt-1 text-sm md:text-base">
              ≈ {showBalances ? "$59,977.31" : hiddenValue} / Today's Realized PnL {showBalances ? "$0.00 (+0.00%)" : hiddenValue} <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div>
              <div className="text-gray-400 mb-2 text-sm">Adjusted Equity (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "59,853.3433" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$59,853.34" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2 text-sm">Available Balance (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "59,853.3433" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$59,853.34" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2 text-sm">Initial Margin (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div>
              <div className="text-gray-400 mb-2 text-sm">Maintenance Margin (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2 text-sm">Total Debt (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2 text-sm">Unrealized PNL (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarginBalance;
