import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Bot,
  ChartCandlestick,
  ArrowUpDown,
  DollarSign,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const TradingBots = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
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
        "Enhance execution of large orders in smaller blocks with intelligent algo orders. Also available via the API.",
      features: ["TWAP and POV", "Reduce execution costs"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 space-y-8">
        {/* Hero Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Trading Bots</h1>
            <p className="text-gray-400 max-w-2xl">
              Deploy bots for seamless crypto trading automation. Discover and
              replicate top strategies on Binance.
            </p>
            <div className="flex gap-8 mt-6">
              <div>
                <p className="text-gray-400">Active Strategies</p>
                <p className="text-3xl font-bold text-white">137,054</p>
              </div>
              <div>
                <p className="text-gray-400">Total Value</p>
                <p className="text-3xl font-bold text-white">$7,516,117,350.16</p>
              </div>
            </div>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black mt-4">
              Trade Now
            </Button>
          </div>

          {/* Carousel Section */}
          <div className="bg-[#1A1F2C] rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Discover Our Trading Bots
              </h2>
              <img
                src="/lovable-uploads/f044bedc-0dc0-4a07-b358-ef34b437e2e4.png"
                alt="Bot"
                className="w-16 h-16"
              />
            </div>
            <Button variant="link" className="text-yellow-400">
              Learn More
            </Button>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-400">
                {currentSlide} / 2
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                  disabled={currentSlide === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentSlide(Math.min(2, currentSlide + 1))}
                  disabled={currentSlide === 2}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-gray-800 pb-4">
          {["All", "Auto-Invest", "Sideways", "Bullish", "Bearish", "Algos"].map(
            (tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`${
                  activeTab === tab.toLowerCase()
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
                {tab === "Auto-Invest" && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-400 text-black text-xs rounded-full">
                    Hot
                  </span>
                )}
              </Button>
            )
          )}
        </div>

        {/* Bot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {botTypes.map((bot) => (
            <div
              key={bot.id}
              className="bg-[#1A1F2C] rounded-xl p-6 space-y-4 hover:bg-[#242938] transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <bot.icon className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">{bot.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">{bot.description}</p>
              <ul className="space-y-2">
                {bot.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 text-sm flex gap-2">
                    <span className="text-yellow-400">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="ghost"
                className="w-full mt-4 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                Create
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="ghost" className="text-yellow-400">
            More Bots
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradingBots;