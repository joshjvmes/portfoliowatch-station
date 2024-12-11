import { ResponsiveContainer } from "recharts";
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface VaultChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
}

const VaultChart = ({ data }: VaultChartProps) => {
  return (
    <div className="h-[300px] md:h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5BE" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00E5BE" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            stroke="#666"
            tick={{ fill: '#666' }}
          />
          <YAxis 
            stroke="#666"
            tick={{ fill: '#666' }}
            domain={['dataMin - 100000', 'dataMax + 100000']}
            tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1A2333',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00E5BE"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VaultChart;