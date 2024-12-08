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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Wallet,
  CreditCard,
  Building2,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Bank,
} from "lucide-react";

const DepositContent = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const { showBalances, toggleBalances } = useBalanceVisibility();
  const availableBalance = "$1,152,025.79";
  const hiddenValue = "*****";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currency || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Deposit initiated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Balance Cards */}
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

      {/* Deposit Methods */}
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-[#00E5BE]">
            Deposit Funds
          </CardTitle>
          <CardDescription className="text-gray-400">
            Choose your preferred deposit method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crypto" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-[#1A2333]">
              <TabsTrigger value="crypto" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <Wallet className="mr-2 h-4 w-4" />
                Crypto
              </TabsTrigger>
              <TabsTrigger value="card" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </TabsTrigger>
              <TabsTrigger value="wire" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <Building2 className="mr-2 h-4 w-4" />
                Wire
              </TabsTrigger>
              <TabsTrigger value="ach" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <Bank className="mr-2 h-4 w-4" />
                ACH
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    <h3 className="font-medium">Network Selection</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Important: Select the correct network to avoid loss of funds
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Supports multiple networks (ERC20, BEP20, etc.)
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Automatic address generation
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Real-time deposit tracking
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
                >
                  Generate Deposit Address
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="card-amount" className="text-sm font-medium text-gray-200">
                      Amount (USD)
                    </label>
                    <Input
                      id="card-amount"
                      type="number"
                      placeholder="Enter amount"
                      className="bg-[#1A2333] border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="card-number" className="text-sm font-medium text-gray-200">
                      Card Number
                    </label>
                    <Input
                      id="card-number"
                      placeholder="**** **** **** ****"
                      className="bg-[#1A2333] border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expiry" className="text-sm font-medium text-gray-200">
                        Expiry Date
                      </label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="bg-[#1A2333] border-white/10 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cvv" className="text-sm font-medium text-gray-200">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        placeholder="***"
                        className="bg-[#1A2333] border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-[#00E5BE]">
                    <Shield className="h-5 w-5" />
                    <h3 className="font-medium">Secure Card Processing</h3>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      256-bit encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      3D Secure authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Instant processing
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
                >
                  Process Card Payment
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="wire">
              <div className="space-y-6">
                <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
                  <h3 className="font-medium text-[#00E5BE] mb-4">Wire Transfer Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Bank Name</p>
                      <p className="text-white">Global Trading Bank</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Number</p>
                      <p className="text-white">8529674103</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">SWIFT Code</p>
                      <p className="text-white">GTBKUS44</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Reference</p>
                      <p className="text-white">Include your User ID: 85296</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-[#00E5BE]">
                    <Shield className="h-5 w-5" />
                    <h3 className="font-medium">Important Information</h3>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Processing time: 1-3 business days
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Include reference number
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Minimum deposit: $1,000
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ach">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="routing" className="text-sm font-medium text-gray-200">
                      Routing Number
                    </label>
                    <Input
                      id="routing"
                      placeholder="Enter routing number"
                      className="bg-[#1A2333] border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="account" className="text-sm font-medium text-gray-200">
                      Account Number
                    </label>
                    <Input
                      id="account"
                      placeholder="Enter account number"
                      className="bg-[#1A2333] border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ach-amount" className="text-sm font-medium text-gray-200">
                      Amount (USD)
                    </label>
                    <Input
                      id="ach-amount"
                      type="number"
                      placeholder="Enter amount"
                      className="bg-[#1A2333] border-white/10 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-[#00E5BE]">
                    <Shield className="h-5 w-5" />
                    <h3 className="font-medium">ACH Transfer Information</h3>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Processing time: 3-5 business days
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      No transfer fees
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
                      Minimum deposit: $100
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
                >
                  Initiate ACH Transfer
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const Deposit = () => {
  return (
    <DashboardLayout>
      <DepositContent />
    </DashboardLayout>
  );
};

export default Deposit;