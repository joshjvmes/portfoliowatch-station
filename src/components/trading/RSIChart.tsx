import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RSIData {
  date: string;
  rsi: number;
}

interface RSIChartProps {
  data: RSIData[];
  loading?: boolean;
}

const RSIChart = ({ data, loading }: RSIChartProps) => {
  if (loading) {
    return <div className="h-[200px] animate-pulse bg-white/5 rounded-lg" />;
  }

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>RSI Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                domain={[0, 100]} 
                stroke="#666"
                tick={{ fill: '#666' }}
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
                dataKey="rsi" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.1} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RSIChart;