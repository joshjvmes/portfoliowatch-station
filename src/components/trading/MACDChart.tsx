import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface MACDData {
  date: string;
  macd: number;
  signal: number;
}

interface MACDChartProps {
  data: MACDData[];
  loading?: boolean;
}

const MACDChart = ({ data, loading }: MACDChartProps) => {
  if (loading) {
    return <div className="h-[200px] animate-pulse bg-white/5 rounded-lg" />;
  }

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>MACD Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
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
                dataKey="macd" 
                stroke="#ec4899" 
                fill="#ec4899" 
                fillOpacity={0.1} 
              />
              <Area 
                type="monotone" 
                dataKey="signal" 
                stroke="#f59e0b" 
                fill="none" 
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MACDChart;