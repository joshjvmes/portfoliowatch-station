import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Bot,
  ChartCandlestick,
  ArrowUpDown,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import HeroStats from "@/components/trading-bots/HeroStats";
import NavigationTabs from "@/components/trading-bots/NavigationTabs";
import BotCard from "@/components/trading-bots/BotCard";

const TradingBots = () => {
  const [activeTab, setActiveTab] = useState("all");

  const botTypes = [
    {
      id: "spot-grid",
      title: "Spot Grid",
      icon: ChartCandlestick,
      description: "Buy low and sell high 24/7 automatically with just one click.",
      features: ["Volatile Markets", "Preset Ranges"],
      category: "sideways",
    },
    {
      id: "futures-grid",
      title: "Futures Grid",
      icon: ArrowUpDown,
      description:
        "Amplify your purchasing power with an advanced version of Grid Trading.",
      features: ["Short Orders", "USD-M / COIN-M"],
      category: "sideways",
    },
    {
      id: "arbitrage-bot",
      title: "Arbitrage Bot",
      icon: DollarSign,
      description: "A delta neutral strategy to earn Funding Fee effortlessly.",
      features: ["Funding Rate Arbitrage", "Hedged Price Risk"],
      category: "auto-invest",
    },
    {
      id: "rebalancing-bot",
      title: "Rebalancing Bot",
      icon: Bot,
      description:
        "A long term position strategy supporting an investment portfolio.",
      features: ["Diversify risk", "Dynamic rebalance"],
      category: "auto-invest",
    },
    {
      id: "bull-algo",
      title: "Bull Market Algo",
      icon: TrendingUp,
      description:
        "Optimize your trading strategy for upward trending markets.",
      features: ["Long positions", "Momentum tracking"],
      category: "bullish",
    },
    {
      id: "bear-algo",
      title: "Bear Market Algo",
      icon: TrendingDown,
      description:
        "Protect and profit during market downturns with automated strategies.",
      features: ["Short positions", "Downtrend detection"],
      category: "bearish",
    },
  ];

  const filteredBots = botTypes.filter(bot => 
    activeTab === "all" ? true : bot.category === activeTab
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <HeroStats />
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Bot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredBots.map((bot) => (
            <BotCard key={bot.id} {...bot} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            className="text-[#00E5BE] hover:text-[#00E5BE]/80"
          >
            More Bots
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradingBots;