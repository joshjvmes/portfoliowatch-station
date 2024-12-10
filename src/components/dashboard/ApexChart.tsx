import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "react-dom";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ApexChartProps {
  title?: string;
  data: number[];
  categories: string[];
}

const ApexChart = ({ title = "Trading Activity", data, categories }: ApexChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    theme: {
      mode: "dark",
    },
    colors: ["#00E5BE"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "rgba(255,255,255,0.1)",
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#666",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#666",
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Value",
      data,
    },
  ];

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <Chart
            options={options}
            series={series}
            type="area"
            height="100%"
            width="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ApexChart;