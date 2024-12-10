import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from "react";

const HighchartsDemo = () => {
  const [options, setOptions] = useState({
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Market Performance',
      style: {
        color: '#fff'
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          color: '#666'
        }
      },
      lineColor: '#666',
      tickColor: '#666'
    },
    yAxis: {
      title: {
        text: 'Value ($)',
        style: {
          color: '#666'
        }
      },
      labels: {
        style: {
          color: '#666'
        }
      },
      gridLineColor: 'rgba(255,255,255,0.1)'
    },
    series: [{
      name: 'Portfolio Value',
      data: [10000, 12000, 11500, 13500, 13000, 14500],
      color: '#00E5BE'
    }],
    legend: {
      itemStyle: {
        color: '#fff'
      }
    },
    credits: {
      enabled: false
    }
  });

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Highcharts Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HighchartsDemo;