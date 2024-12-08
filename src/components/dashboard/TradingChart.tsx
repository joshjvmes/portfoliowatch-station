import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import VaultHeader from "./chart/VaultHeader";
import DateRangeSelector from "./chart/DateRangeSelector";
import VaultChart from "./chart/VaultChart";
import TradingControls from "./chart/TradingControls";
import { subDays, subMonths, subQuarters } from "date-fns";

interface TradingChartProps {
  data: any[];
}

const TradingChart = ({ data }: TradingChartProps) => {
  const [tradeAmount, setTradeAmount] = useState([50]);
  const [stopLoss, setStopLoss] = useState([10]);
  const [takeProfit, setTakeProfit] = useState([20]);
  const [selectedRange, setSelectedRange] = useState('7d');
  const isMobile = useIsMobile();
  const vaultBalance = "$1,152,025.79";
  const vaultProfit = "+$1,130,419.05 (47.80%)";
  const hiddenValue = "*****";

  const dateRanges = [
    { label: '24h', value: '24h' },
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: 'Q', value: 'Q' },
    { label: 'All', value: 'all' },
  ];

  const filteredData = useMemo(() => {
    const now = new Date();
    let cutoffDate;

    switch (selectedRange) {
      case '24h':
        cutoffDate = subDays(now, 1);
        break;
      case '7d':
        cutoffDate = subDays(now, 7);
        break;
      case '30d':
        cutoffDate = subMonths(now, 1);
        break;
      case 'Q':
        cutoffDate = subQuarters(now, 1);
        break;
      case 'all':
        return data;
      default:
        cutoffDate = subDays(now, 7);
    }

    return data.filter(item => {
      const itemDate = new Date(item.time);
      return itemDate >= cutoffDate;
    });
  }, [selectedRange, data]);

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <VaultHeader 
          vaultBalance={vaultBalance}
          vaultProfit={vaultProfit}
          hiddenValue={hiddenValue}
        />
        <DateRangeSelector
          dateRanges={dateRanges}
          selectedRange={selectedRange}
          onRangeSelect={setSelectedRange}
        />
      </CardHeader>
      <CardContent>
        <VaultChart data={filteredData} />
        {!isMobile && (
          <TradingControls
            tradeAmount={tradeAmount}
            stopLoss={stopLoss}
            takeProfit={takeProfit}
            onTradeAmountChange={setTradeAmount}
            onStopLossChange={setStopLoss}
            onTakeProfitChange={setTakeProfit}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TradingChart;