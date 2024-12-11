import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: any[];
  loading?: boolean;
}

const PriceChart = ({ data, loading }: PriceChartProps) => {
  if (loading) {
    return <div className="h-[400px] animate-pulse bg-white/5 rounded-lg" />;
  }

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Price Chart with Bollinger Bands</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#666"
                tick={{ fill: '#666' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A2333',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#2563eb" 
                fill="#2563eb" 
                fillOpacity={0.1} 
              />
              <Area 
                type="monotone" 
                dataKey="upperBand" 
                stroke="#22c55e" 
                fill="none" 
              />
              <Area 
                type="monotone" 
                dataKey="lowerBand" 
                stroke="#22c55e" 
                fill="none" 
              />
              <Area 
                type="monotone" 
                dataKey="sma20" 
                stroke="#eab308" 
                fill="none" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;