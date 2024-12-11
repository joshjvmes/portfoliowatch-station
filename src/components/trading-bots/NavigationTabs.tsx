import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, TrendingUp, TrendingDown, ArrowLeftRight, Binary } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const tabs = [
    { name: "All", icon: Binary },
    { name: "Auto-Invest", icon: Bot },
    { name: "Sideways", icon: ArrowLeftRight },
    { name: "Bullish", icon: TrendingUp },
    { name: "Bearish", icon: TrendingDown },
  ];

  return (
    <div className="flex gap-6 border-b border-white/10 pb-4 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.name}
            variant="ghost"
            className={`${
              activeTab === tab.name.toLowerCase()
                ? "text-[#00E5BE] border-b-2 border-[#00E5BE]"
                : "text-gray-400 hover:text-white"
            } whitespace-nowrap flex items-center gap-2`}
            onClick={() => setActiveTab(tab.name.toLowerCase())}
          >
            <Icon className="h-4 w-4" />
            {tab.name}
            {tab.name === "Auto-Invest" && (
              <span className="ml-2 px-2 py-0.5 bg-[#00E5BE] text-black text-xs rounded-full">
                Hot
              </span>
            )}
          </Button>
        )
      })}
    </div>
  );
};

export default NavigationTabs;