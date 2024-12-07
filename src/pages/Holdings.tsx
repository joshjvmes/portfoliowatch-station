import DashboardLayout from "@/components/DashboardLayout";
import TradingStats from "@/components/holdings/TradingStats";
import RecentlyListed from "@/components/holdings/RecentlyListed";
import BiggestMovers from "@/components/holdings/BiggestMovers";
import MarketTable from "@/components/holdings/MarketTable";

const Holdings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
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