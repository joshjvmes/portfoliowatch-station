import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface RSIData {
  date: string;
  rsi: number;
}

interface RSIChartProps {
  data: RSIData[];
  loading?: boolean;
}

const RSIChart = ({ data, loading }: RSIChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading) {
    return <div className="h-[200px] animate-pulse bg-white/5 rounded-lg" />;
  }

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: data.map(d => d.date),
      labels: {
        style: {
          colors: '#666'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        style: {
          colors: '#666'
        }
      }
    },
    tooltip: {
      theme: 'dark'
    },
    colors: ['#8b5cf6']
  };

  const series = [{
    name: 'RSI',
    data: data.map(d => d.rsi)
  }];

  if (!mounted) return null;

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>RSI Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RSIChart;