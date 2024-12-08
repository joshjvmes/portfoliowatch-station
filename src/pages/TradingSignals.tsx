import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TradingSignals = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
          <Badge variant="outline" className="bg-[#0B1221]/50">
            Coming Soon
          </Badge>
        </div>

        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Trading Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-400">
                Trading signals feature is currently under development. 
                Check back soon for real-time market insights and analysis.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TradingSignals;