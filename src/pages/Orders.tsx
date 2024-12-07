import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Orders = () => {
  return (
    <DashboardLayout>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Orders page content coming soon...</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Orders;