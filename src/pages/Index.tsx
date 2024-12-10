import DashboardLayout from "@/components/DashboardLayout";
import TradingChart from "@/components/dashboard/TradingChart";
import MarginBalance from "@/components/dashboard/MarginBalance";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import ApexChart from "@/components/dashboard/ApexChart";

const Index = () => {
  // Sample data for the trading chart
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: 1000000 + Math.random() * 300000
  }));

  // Sample data for the trading activity chart
  const tradingActivityData = [150000, 180000, 170000, 200000, 220000, 270000, 250000];
  const tradingActivityCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TradingChart data={chartData} />
          </div>
          <MarginBalance />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssetAllocation />
          <ApexChart 
            title="Trading Activity"
            data={tradingActivityData}
            categories={tradingActivityCategories}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;