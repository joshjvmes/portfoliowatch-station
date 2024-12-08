import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const TradingStats = () => {
  const [stats, setStats] = useState({
    volume: 351216617,
    volumeChange: 12.4,
    openInterest: 512813307,
    openInterestChange: -3.2,
    earnedByStakers: 28097.33,
    earnedChange: 5.8
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        volume: prev.volume + (Math.random() - 0.5) * 1000000,
        volumeChange: prev.volumeChange + (Math.random() - 0.5) * 0.5,
        openInterest: prev.openInterest + (Math.random() - 0.5) * 2000000,
        openInterestChange: prev.openInterestChange + (Math.random() - 0.5) * 0.3,
        earnedByStakers: prev.earnedByStakers + (Math.random() - 0.5) * 100,
        earnedChange: prev.earnedChange + (Math.random() - 0.5) * 0.2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center justify-between">
            Trading Volume
            <div className={`flex items-center text-sm ${stats.volumeChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.volumeChange > 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(stats.volumeChange).toFixed(1)}%
            </div>
          </CardTitle>
          <span className="text-xs text-muted-foreground">24h</span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#2563EB] animate-pulse">
            ${stats.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Updated just now
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center justify-between">
            Open Interest
            <div className={`flex items-center text-sm ${stats.openInterestChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.openInterestChange > 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(stats.openInterestChange).toFixed(1)}%
            </div>
          </CardTitle>
          <span className="text-xs text-muted-foreground">Current</span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#2563EB] animate-pulse">
            ${stats.openInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Live tracking enabled
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center justify-between">
            Earned by Stakers
            <div className={`flex items-center text-sm ${stats.earnedChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.earnedChange > 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(stats.earnedChange).toFixed(1)}%
            </div>
          </CardTitle>
          <span className="text-xs text-muted-foreground">24h</span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#2563EB] animate-pulse">
            ${stats.earnedByStakers.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Real-time rewards
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingStats;