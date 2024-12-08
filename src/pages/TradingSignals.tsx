import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import PriceChart from "@/components/trading/PriceChart";
import RSIChart from "@/components/trading/RSIChart";
import MACDChart from "@/components/trading/MACDChart";
import ArbitrageOpportunities from "@/components/trading/ArbitrageOpportunities";
import { fetchCoinData, formatChartData } from "@/utils/marketData";
import { calculateIndicators } from "@/utils/indicators";
import { calculateArbitrageOpportunities } from "@/utils/arbitrage";
import { useToast } from "@/hooks/use-toast";

const EXCHANGES = [
  { exchange: "Binance", price: 0, tradingFee: 0.1, transferTime: 15 },
  { exchange: "Coinbase", price: 0, tradingFee: 0.5, transferTime: 20 },
  { exchange: "Kraken", price: 0, tradingFee: 0.26, transferTime: 18 },
  { exchange: "Gemini", price: 0, tradingFee: 0.35, transferTime: 25 }
];

const TradingSignals = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exchangePrices, setExchangePrices] = useState(EXCHANGES);
  const { toast } = useToast();

  // Simulate different exchange prices with small variations
  const simulateExchangePrices = (basePrice: number) => {
    return EXCHANGES.map(exchange => ({
      ...exchange,
      price: basePrice * (1 + (Math.random() - 0.5) * 0.02) // +/- 1% variation
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rawData = await fetchCoinData('bitcoin');
        const formattedData = formatChartData(rawData);
        const dataWithIndicators = calculateIndicators(formattedData);
        setData(dataWithIndicators);

        // Simulate exchange prices based on the latest price
        const latestPrice = formattedData[formattedData.length - 1].price;
        const prices = simulateExchangePrices(latestPrice);
        setExchangePrices(prices);

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
  }, [toast]);

  const arbitrageOpportunities = calculateArbitrageOpportunities(exchangePrices);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PriceChart data={data} loading={loading} />
          </div>
          <div>
            <ArbitrageOpportunities opportunities={arbitrageOpportunities} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RSIChart data={data} loading={loading} />
          <MACDChart data={data} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;