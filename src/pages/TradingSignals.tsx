import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceChart from "@/components/trading/PriceChart";
import RSIChart from "@/components/trading/RSIChart";
import MACDChart from "@/components/trading/MACDChart";
import ArbitrageOpportunities from "@/components/trading/ArbitrageOpportunities";
import ArbitrageAnalysis from "@/components/trading/ArbitrageAnalysis";

const TradingSignals = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
          <Badge variant="outline" className="bg-[#0B1221]/50">
            Live Data
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#0B1221]/50 border-white/10">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="arbitrage">Cross-Exchange Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PriceChart data={[]} loading={false} />
              </div>
              <div>
                <ArbitrageOpportunities opportunities={[]} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RSIChart data={[]} loading={false} />
              <MACDChart data={[]} loading={false} />
            </div>
          </TabsContent>

          <TabsContent value="arbitrage">
            <ArbitrageAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;