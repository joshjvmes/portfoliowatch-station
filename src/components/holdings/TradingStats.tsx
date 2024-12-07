import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TradingStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Trading Volume</CardTitle>
          <span className="text-xs text-muted-foreground">24h</span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#2563EB]">$351,216,617</div>
        </CardContent>
      </Card>

      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Open Interest</CardTitle>
          <span className="text-xs text-muted-foreground">Current</span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#2563EB]">$512,813,307</div>
        </CardContent>
      </Card>

      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Earned by Stakers</CardTitle>
          <span className="text-xs text-muted-foreground">24h</span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#2563EB]">$28,097.33</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingStats;