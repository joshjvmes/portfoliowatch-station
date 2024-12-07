import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  return (
    <div className="flex gap-6 border-b border-white/10 pb-4 overflow-x-auto">
      {["All", "Auto-Invest", "Sideways", "Bullish", "Bearish", "Algos"].map(
        (tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`${
              activeTab === tab.toLowerCase()
                ? "text-[#00E5BE] border-b-2 border-[#00E5BE]"
                : "text-gray-400 hover:text-white"
            } whitespace-nowrap`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
            {tab === "Auto-Invest" && (
              <span className="ml-2 px-2 py-0.5 bg-[#00E5BE] text-black text-xs rounded-full">
                Hot
              </span>
            )}
          </Button>
        )
      )}
    </div>
  );
};

export default NavigationTabs;