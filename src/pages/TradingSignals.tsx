import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

// Mock data generator for demonstration
const generateMockData = (days: number) => {
  const data = [];
  let price = 100;
  
  for (let i = 0; i < days; i++) {
    price = price + (Math.random() - 0.5) * 5;
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: price,
      volume: Math.floor(Math.random() * 1000000)
    });
  }
  
  // Calculate Simple Moving Average (20 periods)
  const sma20 = calculateSMA(data.map(d => d.price), 20);
  
  // Calculate Bollinger Bands
  const standardDeviation = calculateStandardDeviation(data.map(d => d.price), 20);
  const upperBand = sma20.map(sma => sma + standardDeviation * 2);
  const lowerBand = sma20.map(sma => sma - standardDeviation * 2);
  
  // Combine all data
  return data.map((d, i) => ({
    ...d,
    sma20: sma20[i],
    upperBand: upperBand[i],
    lowerBand: lowerBand[i],
    rsi: calculateRSI(data.slice(Math.max(0, i - 14), i + 1).map(d => d.price)),
    macd: calculateMACD(data.slice(0, i + 1).map(d => d.price))[0],
    signal: calculateMACD(data.slice(0, i + 1).map(d => d.price))[1]
  }));
};

// Technical indicator calculations
const calculateSMA = (prices: number[], period: number) => {
  const sma = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      sma.push(null);
      continue;
    }
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
};

const calculateStandardDeviation = (prices: number[], period: number) => {
  const sma = calculateSMA(prices, period);
  let sumSquaredDiff = 0;
  let validPoints = 0;
  
  for (let i = period - 1; i < prices.length; i++) {
    sumSquaredDiff += Math.pow(prices[i] - sma[i]!, 2);
    validPoints++;
  }
  
  return Math.sqrt(sumSquaredDiff / validPoints);
};

const calculateRSI = (prices: number[]) => {
  if (prices.length < 14) return null;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }
  
  const averageGain = gains / 14;
  const averageLoss = losses / 14;
  
  if (averageLoss === 0) return 100;
  
  const rs = averageGain / averageLoss;
  return 100 - (100 / (1 + rs));
};

const calculateMACD = (prices: number[]): [number | null, number | null] => {
  if (prices.length < 26) return [null, null];
  
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  
  if (!ema12 || !ema26) return [null, null];
  
  const macd = ema12 - ema26;
  const signal = calculateEMA([macd], 9);
  
  return [macd, signal];
};

const calculateEMA = (prices: number[], period: number): number | null => {
  if (prices.length < period) return null;
  
  const multiplier = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  
  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }
  
  return ema;
};

const TradingSignals = () => {
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate 90 days of mock data
    const mockData = generateMockData(90);
    setData(mockData);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
          <Badge variant="outline" className="bg-[#0B1221]/50">
            Demo Mode
          </Badge>
        </div>

        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Price Chart with Bollinger Bands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="date" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>RSI Indicator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
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

          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>MACD Indicator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
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
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;