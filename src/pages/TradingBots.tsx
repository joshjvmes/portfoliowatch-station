import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Bot,
  ChartCandlestick,
  ArrowUpDown,
  DollarSign,
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
    },
    {
      id: "futures-grid",
      title: "Futures Grid",
      icon: ArrowUpDown,
      description:
        "Amplify your purchasing power with an advanced version of Grid Trading.",
      features: ["Short Orders", "USD-M / COIN-M"],
    },
    {
      id: "arbitrage-bot",
      title: "Arbitrage Bot",
      icon: DollarSign,
      description: "A delta neutral strategy to earn Funding Fee effortlessly.",
      features: ["Funding Rate Arbitrage", "Hedged Price Risk"],
    },
    {
      id: "rebalancing-bot",
      title: "Rebalancing Bot",
      icon: Bot,
      description:
        "A long term position strategy supporting an investment portfolio.",
      features: ["Diversify risk", "Dynamic rebalance"],
    },
    {
      id: "algo-order",
      title: "Algo Order",
      icon: ChartCandlestick,
      description:
        "Enhance execution of large orders in smaller blocks with intelligent algo orders.",
      features: ["TWAP and POV", "Reduce execution costs"],
    },
  ];

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
          {botTypes.map((bot) => (
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