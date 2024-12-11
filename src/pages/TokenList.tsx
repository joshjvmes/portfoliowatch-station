import DashboardLayout from "@/components/DashboardLayout";
import TokenTable from "@/components/tokens/TokenTable";

const TokenList = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">Token List</h2>
          <p className="text-muted-foreground">Monitor token prices and exchange opportunities</p>
        </div>
        <TokenTable />
      </div>
    </DashboardLayout>
  );
};

export default TokenList;