import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PortfolioMargin = () => {
  return (
    <DashboardLayout>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Portfolio Margin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Portfolio margin content coming soon...</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PortfolioMargin;