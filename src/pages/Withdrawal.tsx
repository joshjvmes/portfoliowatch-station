import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Withdrawal = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo functionality
    toast.success("Withdrawal scheduled successfully!");
    console.log("Withdrawal details:", { walletAddress, date });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-[#00E5BE]">
              Schedule Withdrawal
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your wallet address and select a date for your withdrawal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="wallet"
                  className="text-sm font-medium text-gray-200"
                >
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Withdrawal Date
                </label>
                <div className="border rounded-lg border-white/10 p-4 bg-[#1A2333]">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="text-white"
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
              >
                Schedule Withdrawal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdrawal;