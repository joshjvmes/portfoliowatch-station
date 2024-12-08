import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import PriceChart from "@/components/trading/PriceChart";
import RSIChart from "@/components/trading/RSIChart";
import MACDChart from "@/components/trading/MACDChart";
import { fetchCoinData, formatChartData } from "@/utils/marketData";
import { calculateIndicators } from "@/utils/indicators";

const TradingSignals = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rawData = await fetchCoinData('bitcoin');
        const formattedData = formatChartData(rawData);
        const dataWithIndicators = calculateIndicators(formattedData);
        setData(dataWithIndicators);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

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

        <PriceChart data={data} loading={loading} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RSIChart data={data} loading={loading} />
          <MACDChart data={data} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;