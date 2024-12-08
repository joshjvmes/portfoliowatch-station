import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import VaultHeader from "./chart/VaultHeader";
import DateRangeSelector from "./chart/DateRangeSelector";
import VaultChart from "./chart/VaultChart";
import TradingControls from "./chart/TradingControls";

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
        <VaultChart data={data} />
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