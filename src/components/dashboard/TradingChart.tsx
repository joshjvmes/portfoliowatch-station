import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { Eye, EyeOff } from "lucide-react";

interface TradingChartProps {
  data: any[];
}

const TradingChart = ({ data }: TradingChartProps) => {
  const [tradeAmount, setTradeAmount] = useState([50]);
  const [stopLoss, setStopLoss] = useState([10]);
  const [takeProfit, setTakeProfit] = useState([20]);
  const isMobile = useIsMobile();
  const { showBalances, toggleBalances } = useBalanceVisibility();
  const vaultBalance = "$1,152,025.79";
  const vaultProfit = "+$1,130,419.05 (47.80%)";
  const hiddenValue = "*****";

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl text-white">Vault P&L</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBalances}
              className="text-gray-400 hover:text-white hover:bg-[#1A2333]"
            >
              {showBalances ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-2xl md:text-4xl font-bold text-white mt-2 break-words">
            {showBalances ? vaultBalance : hiddenValue}
            <span className="text-[#00E5BE] text-base md:text-xl ml-3">
              {showBalances ? vaultProfit : hiddenValue}
            </span>
          </p>
          <p className="text-gray-400 mt-1">
            Available for withdrawal: {showBalances ? vaultBalance : hiddenValue}
          </p>
        </div>
        <Button variant="outline" className="text-gray-400 border-white/10">
          7d
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
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
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Value']}
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

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black font-bold py-4 md:py-6"
            >
              Buy / Long
            </Button>
            <Button 
              className="bg-[#FF4D4D] hover:bg-[#FF4D4D]/90 text-white font-bold py-4 md:py-6"
            >
              Sell / Short
            </Button>
          </div>

          {!isMobile && (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingChart;