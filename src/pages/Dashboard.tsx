import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const mockData = [
  { time: "11/17", value: 200000 },
  { time: "11/24", value: 350000 },
  { time: "12/1", value: 450000 },
  { time: "12/7", value: 500000 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#1A2333] p-2">
            <img src="/placeholder.svg" alt="Vault" className="h-full w-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">$ROK</h1>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-gray-400">Est. APR</span>
                <div className="text-[#00E5BE] text-xl font-bold">44%</div>
              </div>
              <div>
                <span className="text-gray-400">TVL</span>
                <div className="text-white text-xl font-bold">$43,164,916</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Chart */}
          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold text-white">$1,151,119.42</div>
                  <div className="text-[#00E5BE]">+ $1,129,512.69 (47.76%)</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-[#1A2333] text-white border-white/10 hover:bg-[#243044]">
                    Vault P&L
                  </Button>
                  <Button variant="outline" className="bg-[#1A2333] text-gray-400 border-white/10 hover:bg-[#243044]">
                    Vault Equity
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <XAxis 
                      dataKey="time" 
                      stroke="#4B5563"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#4B5563"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A2333",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00E5BE"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Balance & Actions */}
          <div className="space-y-6">
            <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 mb-1">Your Vault Balance</div>
                    <div className="text-2xl font-bold text-white">—</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Your All-time P&L</div>
                    <div className="text-2xl font-bold text-white">—</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button className="flex-1 bg-[#1A2333] text-white hover:bg-[#243044]">
                Deposit
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent text-gray-400 border-white/10 hover:bg-[#1A2333]">
                Withdraw
              </Button>
            </div>

            <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 mb-1 block">Amount to Deposit</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-[#1A2333] border border-white/10 rounded-lg px-4 py-2 text-white"
                        placeholder="$0.00"
                      />
                      <Button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6366F1] text-white text-sm px-3 py-1 rounded"
                      >
                        Max
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Cross Free Collateral</div>
                    <div className="text-white">—</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Cross Margin Usage</div>
                    <div className="text-white">—</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Your Vault Balance</div>
                    <div className="text-white">—</div>
                  </div>
                  <Button className="w-full bg-[#1A2333] text-white hover:bg-[#243044]">
                    Connect wallet
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
              <CardContent className="py-8 text-center">
                <div className="text-gray-400">You have no vault deposits.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;