import { Card, CardContent } from "@/components/ui/card";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

const CrossMargin = () => {
  const { showBalances } = useBalanceVisibility();
  const hiddenValue = "*****";

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-white font-semibold border-b-2 border-yellow-400 pb-2">Cross Margin</div>
            <div className="text-gray-400">USD⚡-M</div>
            <div className="text-gray-400">COIN-M</div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-gray-400 mb-2">Total Balance (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "59,772.01" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$59,772.01" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Total Debt (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.00" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Account Equity (USD)</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "59,772.01" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$59,772.01" : hiddenValue}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Today's PNL</div>
              <div className="text-xl font-semibold text-white">{showBalances ? "0.00" : hiddenValue}</div>
              <div className="text-gray-400">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossMargin;