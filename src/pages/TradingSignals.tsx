import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceChart from "@/components/trading/PriceChart";
import RSIChart from "@/components/trading/RSIChart";
import MACDChart from "@/components/trading/MACDChart";
import ArbitrageOpportunities from "@/components/trading/ArbitrageOpportunities";
import ArbitrageAnalysis from "@/components/trading/ArbitrageAnalysis";
import { fetchCoinData } from "@/utils/marketData";
import { useToast } from "@/components/ui/use-toast";

const TradingSignals = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('Loading initial trading data');
        const data = await fetchCoinData('bitcoin');
        const formattedData = data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toISOString().split('T')[0],
          price,
        }));
        console.log('Initial data loaded:', formattedData.length, 'data points');
        setChartData(formattedData);
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load trading data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [toast]);

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
                <PriceChart data={chartData} loading={isLoading} />
              </div>
              <div>
                <ArbitrageOpportunities opportunities={[]} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RSIChart data={chartData} loading={isLoading} />
              <MACDChart data={chartData} loading={isLoading} />
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