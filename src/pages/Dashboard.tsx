import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// Mock data for the candlestick chart
const mockTradingData = [
  { time: '11/17', value: 500000, profit: 1130419.05 },
  { time: '11/20', value: 600000, profit: 1135000.00 },
  { time: '11/24', value: 450000, profit: 1140000.00 },
  { time: '11/28', value: 800000, profit: 1145000.00 },
  { time: '12/1', value: 950000, profit: 1150000.00 },
  { time: '12/4', value: 1000000, profit: 1152025.79 },
];

// Mock data for the pie chart
const data = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 30 },
  { name: 'Other', value: 25 },
];

const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const [tradeAmount, setTradeAmount] = useState([50]); // Percentage of available balance
  const [stopLoss, setStopLoss] = useState([10]); // Percentage below entry
  const [takeProfit, setTakeProfit] = useState([20]); // Percentage above entry

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Trading Chart Card */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">Vault P&L</CardTitle>
              <p className="text-4xl font-bold text-white mt-2">
                $1,152,025.79
                <span className="text-[#00E5BE] text-xl ml-3">
                  +$1,130,419.05 (47.80%)
                </span>
              </p>
            </div>
            <Button variant="outline" className="text-gray-400 border-white/10">
              7d
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTradingData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5BE" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00E5BE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    stroke="#666"
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    stroke="#666"
                    tick={{ fill: '#666' }}
                    domain={['dataMin - 100000', 'dataMax + 100000']}
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A2333',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00E5BE"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Trading Controls */}
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black font-bold py-6"
                >
                  Buy / Long
                </Button>
                <Button 
                  className="bg-[#FF4D4D] hover:bg-[#FF4D4D]/90 text-white font-bold py-6"
                >
                  Sell / Short
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Trade Amount: {tradeAmount}% of balance
                  </label>
                  <Slider
                    value={tradeAmount}
                    onValueChange={setTradeAmount}
                    max={100}
                    step={1}
                    className="[&>.relative>.absolute]:bg-[#00E5BE]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Stop Loss: {stopLoss}% below entry
                  </label>
                  <Slider
                    value={stopLoss}
                    onValueChange={setStopLoss}
                    max={50}
                    step={1}
                    className="[&>.relative>.absolute]:bg-[#FF4D4D]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Take Profit: {takeProfit}% above entry
                  </label>
                  <Slider
                    value={takeProfit}
                    onValueChange={setTakeProfit}
                    max={100}
                    step={1}
                    className="[&>.relative>.absolute]:bg-[#00E5BE]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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