import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const data = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 30 },
  { name: 'Other', value: 25 },
];

const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

const AssetAllocation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: COLORS,
    labels: data.map(item => item.name),
    legend: {
      position: 'bottom',
      labels: {
        colors: '#9ca3af',
      },
    },
    tooltip: {
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

  if (!mounted) return null;

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;