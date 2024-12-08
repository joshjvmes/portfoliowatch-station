import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, ArrowRight, Shield, Eye, EyeOff } from "lucide-react";

const WithdrawalContent = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const { showBalances, toggleBalances } = useBalanceVisibility();
  const availableBalance = "$1,152,025.79";
  const hiddenValue = "*****";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress || !currency || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Withdrawal request submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Balance Cards */}
      <div data-tour="withdrawal-balance" className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <CardTitle className="text-xl text-gray-400">24h Withdrawal Limit</CardTitle>
            <p className="text-3xl font-bold text-white">$100,000.00</p>
          </CardHeader>
        </Card>
      </div>

      {/* Withdrawal Form */}
      <div data-tour="withdrawal-form">
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-[#00E5BE] flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Withdraw Crypto
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your wallet details and amount to withdraw
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="wallet" className="text-sm font-medium text-gray-200">
                  Wallet Address
                </label>
                <Input
                  id="wallet"
                  placeholder="Enter your wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-[#1A2333] border-white/10 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Select Currency
                  </label>
                  <Select onValueChange={setCurrency}>
                    <SelectTrigger className="bg-[#1A2333] border-white/10 text-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A2333] border-white/10">
                      <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                      <SelectItem value="usdt">Tether (USDT)</SelectItem>
                      <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-200">
                    Amount
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-[#1A2333] border-white/10 text-white"
                    required
                  />
                </div>
              </div>

              <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 text-[#00E5BE]">
                  <Shield className="h-5 w-5" />
                  <h3 className="font-medium">Security Verification Required</h3>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  For your security, this withdrawal will require:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                    Email verification
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                    2FA authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                    Face verification for amounts over $10,000
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
              >
                Proceed with Withdrawal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Withdrawal = () => {
  return (
    <DashboardLayout>
      <WithdrawalContent />
    </DashboardLayout>
  );
};

export default Withdrawal;