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
    <div className="relative">
      <div className="flex gap-2 sm:gap-6 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar px-1 sm:px-0">
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
              } whitespace-nowrap flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-sm sm:text-base`}
              onClick={() => setActiveTab(tab.name.toLowerCase())}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {tab.name}
              {tab.name === "Auto-Invest" && (
                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-[#00E5BE] text-black text-xs rounded-full">
                  Hot
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;