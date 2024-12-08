import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RSI, BollingerBands, MACD } from "trading-signals";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface SignalData {
  timestamp: number;
  price: number;
  rsi: number | null;
  upperBand: number | null;
  lowerBand: number | null;
  macd: number | null;
  signal: number | null;
}

const TradingSignals = () => {
  const [signals, setSignals] = useState<SignalData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      // Simulate price data for demonstration
      const generateSignals = () => {
        try {
          const rsi = new RSI(14);
          const bb = new BollingerBands(20, 2);
          const macd = new MACD({ 
            period: 12,
            signalPeriod: 9
          });
          
          const newSignals: SignalData[] = [];
          
          for (let i = 0; i < 100; i++) {
            const price = 40000 + Math.sin(i / 10) * 1000 + Math.random() * 500;
            
            try {
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
                  macd: macd.getResult().macd?.toNumber() || null,
                  signal: macd.getResult().signal?.toNumber() || null,
                });
              }
            } catch (err) {
              console.error("Error updating indicators:", err);
              continue; // Skip this data point but continue processing others
            }
          }
          
          setSignals(newSignals);
          setError(null);
        } catch (err) {
          console.error("Error generating signals:", err);
          setError("Failed to generate trading signals. Please try again later.");
        }
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

    } catch (err) {
      console.error("Error in trading signals setup:", err);
      setError("Failed to initialize trading signals. Please try again later.");
    }
  }, [toast]);

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

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