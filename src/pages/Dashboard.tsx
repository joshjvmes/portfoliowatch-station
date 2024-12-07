import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Available", value: 85 },
  { name: "Used", value: 15 },
];

const COLORS = ["#3B82F6", "#1E293B"];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Margin Balance Card */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">Margin Balance</h2>
                  <Eye className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Change Mode
                  </Button>
                  <Button variant="outline" className="text-gray-400 border-white/10">
                    Transfer
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-white">59,977.3129 <span className="text-gray-400">USD</span></div>
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  ≈ $59,977.31 / Today's Realized PnL $0.00 (+0.00%) <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-white font-semibold">UniMMR</div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
                  <span className="text-green-400 ml-2">999.99</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
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

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-gray-400 mb-2">Maintenance Margin (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Total Debt (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                  <Button variant="ghost" className="text-gray-400 px-0 hover:bg-transparent hover:text-white">
                    Auto Repay <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Unrealized PNL (USD)</div>
                  <div className="text-xl font-semibold text-white">0.0000</div>
                  <div className="text-gray-400">≈ $0.00</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-[1fr_400px] gap-6">
          {/* Cross Margin Card */}
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
                    <div className="text-xl font-semibold text-white">59,772.01</div>
                    <div className="text-gray-400">≈ $59,772.01</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Total Debt (USD)</div>
                    <div className="text-xl font-semibold text-white">0.00</div>
                    <div className="text-gray-400">≈ $0.00</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Account Equity (USD)</div>
                    <div className="text-xl font-semibold text-white">59,772.01</div>
                    <div className="text-gray-400">≈ $59,772.01</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Today's PNL</div>
                    <div className="text-xl font-semibold text-white">0.00</div>
                    <div className="text-gray-400">≈ $0.00</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Allocation Card */}
          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
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
    </DashboardLayout>
  );
};

export default Dashboard;