import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const COLORS = ['#00E5BE', '#2563EB', '#FF6B6B', '#FFD93D', '#4834D4', '#686DE0'];

const currencyData = [
  { name: 'Bitcoin (BTC)', value: 45, amount: '₿ 12.45', usdValue: '$518,411.60' },
  { name: 'Ethereum (ETH)', value: 30, amount: 'Ξ 157.21', usdValue: '$345,607.74' },
  { name: 'USDT', value: 15, amount: '$ 172,803.87', usdValue: '$172,803.87' },
  { name: 'SOL', value: 10, amount: 'SOL 893.2', usdValue: '$115,202.58' },
];

const assetClassData = [
  { name: 'Cryptocurrencies', value: 55, usdValue: '$633,614.18' },
  { name: 'Stablecoins', value: 25, usdValue: '$288,006.45' },
  { name: 'DeFi Tokens', value: 12, usdValue: '$138,243.09' },
  { name: 'NFTs', value: 8, usdValue: '$92,162.07' },
];

const PieChartComponent = ({ data }: { data: typeof currencyData | typeof assetClassData }) => {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: COLORS,
    labels: data.map(item => item.name),
    legend: {
      position: 'right',
      labels: {
        colors: '#9ca3af',
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          const item = data.find(d => d.value === value);
          return item ? `${item.usdValue} (${value}%)` : `${value}%`;
        }
      },
      theme: 'dark',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      colors: ['#0B1221']
    }
  };

  const series = data.map(item => item.value);

  return (
    <div className="h-[250px] sm:h-[300px]">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="100%"
      />
    </div>
  );
};

const AssetList = ({ data }: { data: typeof currencyData | typeof assetClassData }) => {
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div 
          key={item.name}
          className="bg-[#1A2333]/50 p-3 rounded-lg border border-white/10 hover:border-[#00E5BE]/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-white text-sm">{item.name}</span>
            </div>
            <span className="text-[#00E5BE] text-sm">{item.usdValue}</span>
          </div>
          <div className="mt-2">
            <div className="bg-white/10 h-1.5 rounded-full">
              <div 
                className="h-full rounded-full bg-[#00E5BE]" 
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AssetBreakdown = () => {
  const [activeView, setActiveView] = useState<'currency' | 'class'>('currency');
  const data = activeView === 'currency' ? currencyData : assetClassData;

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">Asset Breakdown</CardTitle>
            <p className="text-sm text-gray-400 mt-1">Total Portfolio Value: $1,152,025.79</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={activeView === 'currency' ? 'default' : 'outline'}
              onClick={() => setActiveView('currency')}
              className={`text-sm px-3 py-1.5 ${activeView === 'currency' ? 'bg-[#00E5BE] hover:bg-[#00E5BE]/90' : 'border-white/10'}`}
            >
              By Currency
            </Button>
            <Button 
              variant={activeView === 'class' ? 'default' : 'outline'}
              onClick={() => setActiveView('class')}
              className={`text-sm px-3 py-1.5 ${activeView === 'class' ? 'bg-[#00E5BE] hover:bg-[#00E5BE]/90' : 'border-white/10'}`}
            >
              By Asset Class
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartComponent data={data} />
          <AssetList data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetBreakdown;