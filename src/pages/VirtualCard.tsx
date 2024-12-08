import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Lock,
  RefreshCcw,
  PauseCircle,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const VirtualCard = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const mockCardData = {
    number: "4532 •••• •••• 7895",
    expiry: "12/25",
    cvv: "•••",
    balance: "$2,500.00",
  };

  const toggleCardVisibility = () => {
    setShowCardDetails(!showCardDetails);
  };

  const handleLoadBalance = () => {
    toast.success("Balance loaded successfully");
  };

  const handleChangePin = () => {
    toast.success("PIN changed successfully");
  };

  const handleGenerateNewCard = () => {
    toast.success("New card generated successfully");
  };

  const handleFreezeCard = () => {
    setIsPaused(!isPaused);
    toast.success(isPaused ? "Card unfrozen" : "Card frozen");
  };

  const handleDeleteCard = () => {
    toast.success("Card deleted successfully");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Card Display */}
        <Card className="bg-gradient-to-br from-[#0B1221] via-[#0d1829] to-[#0B1221] border-white/10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-[#00E5BE]">Virtual Card</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCardVisibility}
                className="text-gray-400 hover:text-white"
              >
                {showCardDetails ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-[#1A2333] p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5BE]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative space-y-4">
                <CreditCard className="h-10 w-10 text-[#00E5BE]" />
                <p className="text-xl font-mono">
                  {showCardDetails ? mockCardData.number : "•••• •••• •••• ••••"}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Expiry Date</p>
                    <p className="font-mono">
                      {showCardDetails ? mockCardData.expiry : "••/••"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">CVV</p>
                    <p className="font-mono">
                      {showCardDetails ? mockCardData.cvv : "•••"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Balance</p>
                    <p className="font-mono text-[#00E5BE]">{mockCardData.balance}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#0B1221]/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white">Load Balance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="number"
                placeholder="Enter amount"
                className="bg-[#1A2333] border-white/10"
              />
              <Button
                onClick={handleLoadBalance}
                className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
              >
                Load Balance
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#0B1221]/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white">Card Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleChangePin}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5"
              >
                <Lock className="mr-2 h-4 w-4" />
                Change PIN
              </Button>
              <Button
                onClick={handleGenerateNewCard}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Generate New Card
              </Button>
              <Button
                onClick={handleFreezeCard}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5"
              >
                <PauseCircle className="mr-2 h-4 w-4" />
                {isPaused ? "Unfreeze Card" : "Freeze Card"}
              </Button>
              <Button
                onClick={handleDeleteCard}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VirtualCard;