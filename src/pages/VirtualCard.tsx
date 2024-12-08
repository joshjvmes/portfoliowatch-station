import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { CreditCard, Lock, History, PlusCircle, Ban, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockTransactions = [
  {
    id: 1,
    merchant: "Amazon",
    amount: "$129.99",
    date: "2024-03-15",
    status: "Completed",
  },
  {
    id: 2,
    merchant: "Netflix",
    amount: "$15.99",
    date: "2024-03-14",
    status: "Completed",
  },
  {
    id: 3,
    merchant: "Spotify",
    amount: "$9.99",
    date: "2024-03-13",
    status: "Completed",
  },
];

const VirtualCard = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("1234");
  const [balance, setBalance] = useState("5,000.00");

  const cardNumber = "4532 •••• •••• 7890";
  const cardExpiry = "12/25";
  const cardCVV = "***";

  const handleGenerateNewCard = () => {
    toast.success("New virtual card generated successfully!");
  };

  const handleUpdatePin = () => {
    toast.success("PIN updated successfully!");
  };

  const handleDeleteCard = () => {
    toast.error("Card deleted successfully!");
  };

  const handleLoadBalance = () => {
    toast.success("Balance loaded successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Card Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-[#00E5BE] flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Virtual Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-[#1A2333] to-[#2A3343] p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-white">Balance</p>
                  <p className="text-2xl font-bold text-[#00E5BE]">${balance}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Card Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white">{cardNumber}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowCardDetails(!showCardDetails)}
                        className="text-gray-400 hover:text-white"
                      >
                        {showCardDetails ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Expiry</p>
                    <p className="text-white">{cardExpiry}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">CVV</p>
                    <p className="text-white">{cardCVV}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Controls */}
          <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-[#00E5BE] flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Card Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ban className="h-5 w-5 text-gray-400" />
                  <span className="text-white">Freeze Card</span>
                </div>
                <Switch
                  checked={isCardFrozen}
                  onCheckedChange={setIsCardFrozen}
                />
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type={showPin ? "text" : "password"}
                    placeholder="Enter new PIN"
                    className="bg-[#1A2333] border-white/10 text-white"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowPin(!showPin)}
                    className="border-white/10"
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  onClick={handleUpdatePin}
                  className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
                >
                  Update PIN
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Enter amount to load"
                    className="bg-[#1A2333] border-white/10 text-white"
                  />
                </div>
                <Button
                  onClick={handleLoadBalance}
                  className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
                >
                  Load Balance
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleGenerateNewCard}
                  className="flex-1 bg-[#1A2333] hover:bg-[#1A2333]/90"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Generate New Card
                </Button>
                <Button
                  onClick={handleDeleteCard}
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-[#00E5BE] flex items-center gap-2">
              <History className="h-6 w-6" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Merchant</TableHead>
                  <TableHead className="text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-white/10 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      {transaction.merchant}
                    </TableCell>
                    <TableCell className="text-white">
                      {transaction.amount}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VirtualCard;