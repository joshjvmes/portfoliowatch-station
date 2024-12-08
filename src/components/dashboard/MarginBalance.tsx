import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const MarginBalance = () => {
  const { showBalances } = useBalanceVisibility();
  const hiddenValue = "*****";
  const [mode, setMode] = useState<"Cross" | "Isolated">("Cross");
  const [showAutoRepayMenu, setShowAutoRepayMenu] = useState(false);

  const handleModeChange = () => {
    const newMode = mode === "Cross" ? "Isolated" : "Cross";
    setMode(newMode);
    toast.success(`Trading mode changed to ${newMode}`);
  };

  const handleTransfer = () => {
    toast.info("Transfer functionality coming soon");
  };

  const handleAutoRepayOption = (option: string) => {
    toast.success(`Auto repay set to: ${option}`);
    setShowAutoRepayMenu(false);
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
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
                } transition-colors duration-200`}
                onClick={handleModeChange}
              >
                {mode} Mode
              </Button>
              <Button 
                variant="outline" 
                className="text-gray-400 border-white/10 hover:bg-white/10 transition-colors duration-200"
                onClick={handleTransfer}
              >
                Transfer
              </Button>
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-white">
              {showBalances ? "59,977.3129" : hiddenValue} <span className="text-gray-400">USD</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mt-1">
              ≈ {showBalances ? "$59,977.31" : hiddenValue} / Today's Realized PnL {showBalances ? "$0.00 (+0.00%)" : hiddenValue} <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-white font-semibold">UniMMR</div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
              <span className="text-green-400 ml-2">{showBalances ? "999.99" : hiddenValue}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-gray-400 mb-2">Adjusted Equity (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "59,853.3433" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$59,853.34" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Available Balance (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "59,853.3433" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$59,853.34" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Initial Margin (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-gray-400 mb-2">Maintenance Margin (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Total Debt (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.0000" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-gray-400 px-0 hover:bg-transparent hover:text-white"
                  >
                    Auto Repay <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1F2937] border-white/10">
                  <DropdownMenuItem 
                    className="text-gray-200 hover:bg-white/10 cursor-pointer"
                    onClick={() => handleAutoRepayOption("Always")}
                  >
                    Always
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-gray-200 hover:bg-white/10 cursor-pointer"
                    onClick={() => handleAutoRepayOption("On demand")}
                  >
                    On demand
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-gray-200 hover:bg-white/10 cursor-pointer"
                    onClick={() => handleAutoRepayOption("Never")}
                  >
                    Never
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Unrealized PNL (USD)</div>
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