import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

interface VaultHeaderProps {
  vaultBalance: string;
  vaultProfit: string;
  hiddenValue: string;
}

const VaultHeader = ({ vaultBalance, vaultProfit, hiddenValue }: VaultHeaderProps) => {
  const { showBalances, toggleBalances } = useBalanceVisibility();

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <CardTitle className="text-xl text-white">Vault P&L</CardTitle>
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
      <p className="text-2xl md:text-4xl font-bold text-white mt-2 break-words">
        {showBalances ? vaultBalance : hiddenValue}
        <span className="text-[#00E5BE] text-base md:text-xl ml-3">
          {showBalances ? vaultProfit : hiddenValue}
        </span>
      </p>
      <p className="text-gray-400 mt-1">
        Available for withdrawal: {showBalances ? vaultBalance : hiddenValue}
      </p>
    </div>
  );
};

export default VaultHeader;