import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Info, ArrowDown } from "lucide-react";

const mockChartData = [
  { time: "11/17", value: 200000 },
  { time: "11/24", value: 350000 },
  { time: "12/1", value: 450000 },
  { time: "12/7", value: 500000 },
];

const pieData = [
  { name: "BTC", value: 70 },
  { name: "ETH", value: 30 },
];

const COLORS = ["#1D4ED8", "#2563EB"];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Main Stats Section */}
        <div className="grid gap-6">
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">Margin Balance</h2>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="bg-[#F7B84B] text-black border-transparent hover:bg-[#F7B84B]/90">
                    Change Mode
                  </Button>
                  <Button variant="outline" className="bg-[#1A2333] text-white border-white/10 hover:bg-[#243044]">
                    Transfer
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-white">59,977.3129 USD</div>
                <div className="text-gray-400">≈ $59,977.31 / Today's Realized PnL $0.00 (+0.00%)</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-gray-400 mb-2">Adjusted Equity (USD)</div>
                  <div className="text-xl font-semibold text-white">59,853.3433</div>
                  <div className="text-gray-400">≈ $59,853.34</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Available Balance (USD)</div>
                  <div className="text-xl font-semibold text-white">59,853.3433</div>
                  <div className="text-gray-400">≈ $59,853.34</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Initial Margin (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-gray-400 mb-2">Maintenance Margin (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Total Debt (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                  <Button variant="ghost" className="text-gray-400 p-0 h-auto hover:text-white">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    Auto Repay
                  </Button>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Unrealized PNL (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Allocation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Cross Margin</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-[#1A2333] text-white border-white/10 hover:bg-[#243044]">
                      USD⚑-M
                    </Button>
                    <Button variant="ghost" className="text-gray-400">
                      COIN-M
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-gray-400 mb-2">Total Balance (USD)</div>
                    <div className="text-lg font-semibold text-white">59,772.01</div>
                    <div className="text-gray-400">≈ $59,772.01</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Total Debt (USD)</div>
                    <div className="text-lg font-semibold text-white">0.00</div>
                    <div className="text-gray-400">≈ $0.00</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Account Equity (USD)</div>
                    <div className="text-lg font-semibold text-white">59,772.01</div>
                    <div className="text-gray-400">≈ $59,772.01</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Today's PNL (USD)</div>
                    <div className="text-lg font-semibold text-white">0.00</div>
                    <div className="text-gray-400">≈ $0.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Asset Allocation</h3>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;