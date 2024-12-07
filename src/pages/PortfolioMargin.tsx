import DashboardLayout from "@/components/DashboardLayout";
import AIAgentCard from "@/components/dashboard/AIAgentCard";
import MarketIndicators from "@/components/dashboard/MarketIndicators";
import CrossMargin from "@/components/dashboard/CrossMargin";
import MarginBalance from "@/components/dashboard/MarginBalance";

const PortfolioMargin = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AIAgentCard />
          <MarketIndicators />
        </div>
        <CrossMargin />
        <MarginBalance />
      </div>
    </DashboardLayout>
  );
};

export default PortfolioMargin;