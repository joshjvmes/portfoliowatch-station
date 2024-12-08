import DashboardLayout from "@/components/DashboardLayout";
import VIPIndicator from "@/components/dashboard/VIPIndicator";
import TradingChart from "@/components/dashboard/TradingChart";
import MarginBalance from "@/components/dashboard/MarginBalance";
import CrossMargin from "@/components/dashboard/CrossMargin";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTour } from "@/contexts/TourContext";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { format } from "date-fns";

// Mock data for the candlestick chart with proper date formatting
const mockTradingData = [
  { time: format(new Date('2024-03-17'), 'MM/dd'), value: 500000, profit: 1130419.05 },
  { time: format(new Date('2024-03-20'), 'MM/dd'), value: 600000, profit: 1135000.00 },
  { time: format(new Date('2024-03-24'), 'MM/dd'), value: 450000, profit: 1140000.00 },
  { time: format(new Date('2024-03-28'), 'MM/dd'), value: 800000, profit: 1145000.00 },
  { time: format(new Date('2024-04-01'), 'MM/dd'), value: 950000, profit: 1150000.00 },
  { time: format(new Date('2024-04-04'), 'MM/dd'), value: 1000000, profit: 1152025.79 },
];

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { startTour } = useTour();

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <VIPIndicator level={3} />
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
            <div data-tour="cross-margin">
              <CrossMargin />
            </div>
            <div data-tour="asset-allocation">
              <AssetAllocation />
            </div>
          </div>
        ) : (
          <>
            <div data-tour="margin-balance">
              <MarginBalance />
            </div>
            <div className="grid grid-cols-[1fr_400px] gap-6">
              <div data-tour="cross-margin">
                <CrossMargin />
              </div>
              <div data-tour="asset-allocation">
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