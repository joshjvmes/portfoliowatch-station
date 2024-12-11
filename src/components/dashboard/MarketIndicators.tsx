import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const generateData = () => {
  return Array(20).fill(0).map((_, i) => ({
    name: i,
    value: Math.random() * 100
  }));
};

const MarketIndicator = ({ title, color, value, change }: { 
  title: string;
  color: string;
  value: number;
  change: number;
}) => {
  const [data, setData] = useState(generateData());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), { name: prev.length, value: Math.random() * 100 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      show: false
    },
    colors: [color]
  };

  const series = [{
    name: 'Value',
    data: data.map(d => d.value)
  }];

  return (
    <div className="p-4 rounded-lg bg-black/20">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-400">{title}</div>
        <div className={`text-xs ${change >= 0 ? 'text-[#00E5BE]' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div className="text-xl font-medium text-white mb-4">{value.toFixed(2)}</div>
      <div className="h-16">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
};

const MarketIndicators = () => {
  const [indicators, setIndicators] = useState([
    { title: "Fear & Greed Index", color: "#00E5BE", value: 65, change: 2.3 },
    { title: "Market Volatility", color: "#F97316", value: 42, change: -1.8 },
    { title: "Trading Volume", color: "#8B5CF6", value: 89, change: 5.2 },
    { title: "Market Sentiment", color: "#F59E0B", value: 73, change: 3.1 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndicators(prev => prev.map(indicator => ({
        ...indicator,
        value: indicator.value + (Math.random() > 0.5 ? Math.random() : -Math.random()),
        change: indicator.change + (Math.random() > 0.5 ? Math.random() * 0.1 : -Math.random() * 0.1)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="text-lg font-semibold text-white mb-6">Market Indicators</div>
        <div className="grid grid-cols-2 gap-4">
          {indicators.map((indicator, index) => (
            <MarketIndicator key={index} {...indicator} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIndicators;