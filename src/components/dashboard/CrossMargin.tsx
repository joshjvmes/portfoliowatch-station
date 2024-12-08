import { Card, CardContent } from "@/components/ui/card";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { useIsMobile } from "@/hooks/use-mobile";

const CrossMargin = () => {
  const { showBalances } = useBalanceVisibility();
  const isMobile = useIsMobile();
  const hiddenValue = "*****";

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
            <div className="text-white font-semibold border-b-2 border-yellow-400 pb-2 whitespace-nowrap">Cross Margin</div>
            <div className="text-gray-400 whitespace-nowrap">USD⚡-M</div>
            <div className="text-gray-400 whitespace-nowrap">COIN-M</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div>
              <div className="text-gray-400 mb-2 text-sm">Total Balance (USD)</div>
              <div className="text-lg md:text-xl font-semibold text-white">{showBalances ? "59,772.01" : hiddenValue}</div>
              <div className="text-gray-400 text-sm">≈ {showBalances ? "$59,772.01" : hiddenValue}</div>
            </div>
            {!isMobile && (
              <>
                <div>
                  <div className="text-gray-400 mb-2 text-sm">Total Debt (USD)</div>
                  <div className="text-lg md:text-xl font-semibold text-white">{showBalances ? "0.00" : hiddenValue}</div>
                  <div className="text-gray-400 text-sm">≈ {showBalances ? "$0.00" : hiddenValue}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2 text-sm">Account Equity (USD)</div>
                  <div className="text-lg md:text-xl font-semibold text-white">{showBalances ? "59,772.01" : hiddenValue}</div>
                  <div className="text-gray-400 text-sm">≈ {showBalances ? "$59,772.01" : hiddenValue}</div>
                </div>
              </>
            )}
            <div>
              <div className="text-gray-400 mb-2 text-sm">Today's PNL</div>
              <div className="text-lg md:text-xl font-semibold text-white">{showBalances ? "0.00" : hiddenValue}</div>
              <div className="text-gray-400 text-sm">≈ {showBalances ? "$0.00" : hiddenValue}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossMargin;