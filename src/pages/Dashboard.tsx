import DashboardLayout from "@/components/DashboardLayout";
import VIPIndicator from "@/components/dashboard/VIPIndicator";
import TradingChart from "@/components/dashboard/TradingChart";
import MarginBalance from "@/components/dashboard/MarginBalance";
import CrossMargin from "@/components/dashboard/CrossMargin";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import WalletConnect from "@/components/wallet/WalletConnect";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTour } from "@/contexts/TourContext";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

// Mock data for the candlestick chart
const mockTradingData = [
  { time: '11/17', value: 500000, profit: 1130419.05 },
  { time: '11/20', value: 600000, profit: 1135000.00 },
  { time: '11/24', value: 450000, profit: 1140000.00 },
  { time: '11/28', value: 800000, profit: 1145000.00 },
  { time: '12/1', value: 950000, profit: 1150000.00 },
  { time: '12/4', value: 1000000, profit: 1152025.79 },
];

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { startTour } = useTour();

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <VIPIndicator level={3} />
          <WalletConnect />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={startTour}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Platform Tour
        </Button>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div data-tour="trading-chart">
          <TradingChart data={mockTradingData} />
        </div>
        
        {isMobile ? (
          <div className="space-y-4">
            <div data-tour="margin-balance">
              <MarginBalance />
            </div>
            <div data-tour="market-indicators">
              <CrossMargin />
            </div>
            <div data-tour="ai-agent">
              <AssetAllocation />
            </div>
          </div>
        ) : (
          <>
            <div data-tour="margin-balance">
              <MarginBalance />
            </div>
            <div className="grid grid-cols-[1fr_400px] gap-6">
              <div data-tour="market-indicators">
                <CrossMargin />
              </div>
              <div data-tour="ai-agent">
                <AssetAllocation />
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;