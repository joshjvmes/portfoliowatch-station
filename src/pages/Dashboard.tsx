import DashboardLayout from "@/components/DashboardLayout";
import VIPIndicator from "@/components/dashboard/VIPIndicator";
import TradingChart from "@/components/dashboard/TradingChart";
import MarginBalance from "@/components/dashboard/MarginBalance";
import CrossMargin from "@/components/dashboard/CrossMargin";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <DashboardLayout>
      <div className="flex justify-end mb-4">
        <VIPIndicator level={3} />
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <TradingChart data={mockTradingData} />
        
        {isMobile ? (
          // Mobile view - Stacked layout with simplified components
          <div className="space-y-4">
            <MarginBalance />
            <CrossMargin />
            <AssetAllocation />
          </div>
        ) : (
          // Desktop view - Grid layout with full components
          <>
            <MarginBalance />
            <div className="grid grid-cols-[1fr_400px] gap-6">
              <CrossMargin />
              <AssetAllocation />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;