import DashboardLayout from "@/components/DashboardLayout";
import AssetBreakdown from "@/components/assets/AssetBreakdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Assets = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1A2333]/50 p-4 rounded-lg border border-white/10">
                <p className="text-gray-400">Total Balance</p>
                <p className="text-2xl font-bold text-white mt-1">$1,152,025.79</p>
                <p className="text-[#00E5BE] text-sm">+$12,493 (24h)</p>
              </div>
              <div className="bg-[#1A2333]/50 p-4 rounded-lg border border-white/10">
                <p className="text-gray-400">Active Positions</p>
                <p className="text-2xl font-bold text-white mt-1">8</p>
                <p className="text-[#00E5BE] text-sm">+2 this week</p>
              </div>
              <div className="bg-[#1A2333]/50 p-4 rounded-lg border border-white/10">
                <p className="text-gray-400">Total P&L</p>
                <p className="text-2xl font-bold text-[#00E5BE] mt-1">+$31,245</p>
                <p className="text-gray-400 text-sm">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AssetBreakdown />
      </div>
    </DashboardLayout>
  );
};

export default Assets;