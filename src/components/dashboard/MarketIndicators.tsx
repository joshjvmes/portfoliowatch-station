import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MarketIndicatorProps {
  title: string;
  value: number;
  change: number;
  data: { value: number }[];
}

const MarketIndicator: React.FC<MarketIndicatorProps> = ({
  title,
  value,
  change,
  data,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-3 sm:p-4 rounded-lg bg-black/20">
      <div className="flex items-center justify-between mb-2 min-w-0">
        <div className="text-xs sm:text-sm text-gray-400 truncate sm:truncate-none mr-2">{title}</div>
        <div className={`text-[10px] sm:text-xs whitespace-nowrap ${change >= 0 ? 'text-[#00E5BE]' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(1)}%
        </div>
      </div>
      <div className="text-base sm:text-xl font-medium text-white mb-4 truncate sm:truncate-none">
        {value.toFixed(2)}
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={change >= 0 ? '#00E5BE' : '#EF4444'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketIndicator;