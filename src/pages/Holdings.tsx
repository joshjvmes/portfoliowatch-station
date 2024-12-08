import DashboardLayout from "@/components/DashboardLayout";
import TradingStats from "@/components/holdings/TradingStats";
import RecentlyListed from "@/components/holdings/RecentlyListed";
import BiggestMovers from "@/components/holdings/BiggestMovers";
import MarketTable from "@/components/holdings/MarketTable";

const Holdings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">Holdings</h2>
          <p className="text-muted-foreground">Monitor your assets and market movements</p>
        </div>
        
        <TradingStats />
        
        <div className="grid gap-6 md:grid-cols-2">
          <RecentlyListed />
          <BiggestMovers />
        </div>
        
        <MarketTable />
      </div>
    </DashboardLayout>
  );
};

export default Holdings;