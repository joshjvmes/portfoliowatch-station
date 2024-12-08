import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RSI, BollingerBands, MACD } from "trading-signals";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface SignalData {
  timestamp: number;
  price: number;
  rsi: number;
  upperBand: number;
  lowerBand: number;
  macd: number;
  signal: number;
}

const TradingSignals = () => {
  const [signals, setSignals] = useState<SignalData[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate price data for demonstration
    const generateSignals = () => {
      const rsi = new RSI(14);
      const bb = new BollingerBands(20, 2);
      const macd = new MACD({ 
        shortPeriod: 12,  // Changed from 'short'
        longPeriod: 26,   // Changed from 'long'
        signalPeriod: 9   // Changed from 'signal'
      });
      
      const newSignals: SignalData[] = [];
      
      // Generate 100 data points
      for (let i = 0; i < 100; i++) {
        const price = 40000 + Math.sin(i / 10) * 1000 + Math.random() * 500;
        rsi.update(price);
        bb.update(price);
        macd.update(price);
        
        if (rsi.isStable && bb.isStable && macd.isStable) {
          newSignals.push({
            timestamp: Date.now() - (100 - i) * 3600000,
            price,
            rsi: rsi.getResult().toNumber(),
            upperBand: bb.getResult().upper.toNumber(),
            lowerBand: bb.getResult().lower.toNumber(),
            macd: macd.getResult().macd?.toNumber() || 0,
            signal: macd.getResult().signal?.toNumber() || 0,
          });
        }
      }
      
      setSignals(newSignals);
    };

    generateSignals();
    
    // Update signals every 30 seconds
    const interval = setInterval(() => {
      generateSignals();
      toast({
        title: "Signals Updated",
        description: "Trading signals have been refreshed with latest data",
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
          <Badge variant="outline" className="bg-[#0B1221]/50">
            Live Updates
          </Badge>
        </div>

        {/* Price Chart */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Price Action & Bollinger Bands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signals}>
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    stroke="#666"
                  />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A2333',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#00E5BE" name="Price" dot={false} />
                  <Line type="monotone" dataKey="upperBand" stroke="#FF4D4D" name="Upper Band" dot={false} />
                  <Line type="monotone" dataKey="lowerBand" stroke="#4CAF50" name="Lower Band" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* RSI Chart */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>RSI Indicator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signals}>
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    stroke="#666"
                  />
                  <YAxis domain={[0, 100]} stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A2333',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="rsi" stroke="#FFD700" name="RSI" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* MACD Chart */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>MACD Indicator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signals}>
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    stroke="#666"
                  />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A2333',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="macd" stroke="#FF69B4" name="MACD" dot={false} />
                  <Line type="monotone" dataKey="signal" stroke="#4169E1" name="Signal" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;