import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceChart from "@/components/trading/PriceChart";
import RSIChart from "@/components/trading/RSIChart";
import MACDChart from "@/components/trading/MACDChart";
import ArbitrageOpportunities from "@/components/trading/ArbitrageOpportunities";
import { fetchCoinData, formatChartData } from "@/utils/marketData";
import { calculateIndicators } from "@/utils/indicators";
import { calculateArbitrageOpportunities } from "@/utils/arbitrage";
import { useToast } from "@/hooks/use-toast";

const EXCHANGES = [
  { name: "Binance", price: 0 },
  { name: "Coinbase", price: 0 },
  { name: "Kraken", price: 0 },
  { name: "Gemini", price: 0 }
];

const TradingSignals = () => {
  const [currentToken, setCurrentToken] = useState<'BTC' | 'ETH'>('BTC');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exchangePrices, setExchangePrices] = useState(EXCHANGES);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const { toast } = useToast();

  // Simulate different exchange prices with small variations
  const simulateExchangePrices = (basePrice: number) => {
    return EXCHANGES.map(exchange => ({
      name: exchange.name,
      price: basePrice * (1 + (Math.random() - 0.5) * 0.02) // +/- 1% variation
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Remove toLowerCase() here as we want to use the uppercase token symbol
        const rawData = await fetchCoinData(currentToken);
        const formattedData = formatChartData(rawData);
        const dataWithIndicators = calculateIndicators(formattedData);
        setData(dataWithIndicators);

        // Simulate exchange prices based on the latest price
        const latestPrice = formattedData[formattedData.length - 1].price;
        const prices = simulateExchangePrices(latestPrice);
        setExchangePrices(prices);

        // Calculate arbitrage opportunities with fees
        const arb = await calculateArbitrageOpportunities(prices, currentToken);
        setOpportunities(arb);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        toast({
          title: "Error",
          description: "Failed to fetch market data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [currentToken, toast]);

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
          <Badge variant="outline" className="bg-[#0B1221]/50">
            Live Data
          </Badge>
        </div>

        <Tabs defaultValue="BTC" className="w-full" onValueChange={(v) => setCurrentToken(v as 'BTC' | 'ETH')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="BTC">Bitcoin (BTC)</TabsTrigger>
            <TabsTrigger value="ETH">Ethereum (ETH)</TabsTrigger>
          </TabsList>

          {['BTC', 'ETH'].map((token) => (
            <TabsContent key={token} value={token}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PriceChart data={data} loading={loading} />
                </div>
                <div>
                  <ArbitrageOpportunities 
                    opportunities={opportunities} 
                    token={token}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <RSIChart data={data} loading={loading} />
                <MACDChart data={data} loading={loading} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;