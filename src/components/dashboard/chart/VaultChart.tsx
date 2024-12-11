import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface VaultChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
}

const VaultChart = ({ data }: VaultChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.map(d => d.time),
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
        formatter: (value) => `$${(value/1000).toFixed(0)}K`
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    colors: ['#00E5BE']
  };

  const series = [{
    name: 'Value',
    data: data.map(d => d.value)
  }];

  if (!mounted) return null;

  return (
    <div className="h-[300px] md:h-[400px] mt-4">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="100%"
      />
    </div>
  );
};

export default VaultChart;