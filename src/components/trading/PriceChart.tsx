import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PriceData {
  date: string;
  price: number;
  upperBand: number;
  lowerBand: number;
  sma20: number;
}

interface PriceChartProps {
  data: PriceData[];
  loading?: boolean;
}

const PriceChart = ({ data, loading }: PriceChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading) {
    return <div className="h-[400px] animate-pulse bg-white/5 rounded-lg" />;
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
      labels: {
        style: {
          colors: '#666'
        },
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    colors: ['#2563eb', '#22c55e', '#22c55e', '#eab308']
  };

  const series = [
    {
      name: 'Price',
      data: data.map(d => d.price)
    },
    {
      name: 'Upper Band',
      data: data.map(d => d.upperBand)
    },
    {
      name: 'Lower Band',
      data: data.map(d => d.lowerBand)
    },
    {
      name: 'SMA20',
      data: data.map(d => d.sma20)
    }
  ];

  if (!mounted) return null;

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Price Chart with Bollinger Bands</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
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

export default PriceChart;