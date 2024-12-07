import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, ArrowUpRight, Wallet, Activity } from "lucide-react";
import { useState, useEffect } from "react";

const AIAgentCard = () => {
  const [balance, setBalance] = useState(300);
  const [spendingLimit, setSpendingLimit] = useState(5);
  
  // Simulate balance updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + (Math.random() > 0.5 ? 0.01 : -0.01));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#00E5BE]" />
            <span className="text-[#00E5BE] font-medium">ONCHAIN AI AGENT 01</span>
          </div>
          <Badge variant="outline" className="bg-[#00E5BE]/10 text-[#00E5BE] border-[#00E5BE]/20">
            Active
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-black/20">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">AGENT 01 WALLET</div>
                <div className="text-white font-medium">{balance.toFixed(2)} USDC</div>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Spending Limit</div>
            <div className="text-white font-medium">{spendingLimit} USDC</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-black/20">
              <Activity className="h-5 w-5 text-[#00E5BE] mb-2" />
              <div className="text-sm text-gray-400">24h Trades</div>
              <div className="text-white font-medium">12</div>
            </div>
            <div className="p-4 rounded-lg bg-black/20">
              <Activity className="h-5 w-5 text-yellow-400 mb-2" />
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-white font-medium">94.2%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentCard;