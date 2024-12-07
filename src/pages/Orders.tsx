import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderBook from "@/components/orders/OrderBook";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        {/* Summary Card */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-sm text-muted-foreground">24h Volume</div>
                <div className="text-2xl font-bold text-white">$1.2B</div>
                <Badge className="mt-2" variant="secondary">+12.5%</Badge>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-sm text-muted-foreground">Open Orders</div>
                <div className="text-2xl font-bold text-white">1,234</div>
                <Badge className="mt-2" variant="secondary">Active</Badge>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-sm text-muted-foreground">Order Fill Rate</div>
                <div className="text-2xl font-bold text-white">98.7%</div>
                <Badge className="mt-2" variant="secondary">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Book */}
        <OrderBook />
      </div>
    </DashboardLayout>
  );
};

export default Orders;