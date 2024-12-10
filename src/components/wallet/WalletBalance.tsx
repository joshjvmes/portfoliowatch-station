import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBalance, useAccount } from "wagmi";
import { formatEther } from "viem";

const WalletBalance = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-[#00E5BE]">
            {balance ? `${Number(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : '0.00'}
          </p>
          <p className="text-sm text-gray-400">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalance;