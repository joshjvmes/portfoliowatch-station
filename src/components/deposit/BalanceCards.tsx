import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

export const BalanceCards = () => {
  const { showBalances, toggleBalances } = useBalanceVisibility();
  const availableBalance = "$1,152,025.79";
  const hiddenValue = "*****";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-400">Available Balance</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBalances}
              className="text-gray-400 hover:text-white hover:bg-[#1A2333]"
            >
              {showBalances ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-3xl font-bold text-[#00E5BE]">
            {showBalances ? availableBalance : hiddenValue}
          </p>
        </CardHeader>
      </Card>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-400">24h Deposit Limit</CardTitle>
          <p className="text-3xl font-bold text-white">$250,000.00</p>
        </CardHeader>
      </Card>
    </div>
  );
};