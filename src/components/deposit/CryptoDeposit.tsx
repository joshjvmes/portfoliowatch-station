import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SecurityInfo } from "./SecurityInfo";
import { toast } from "sonner";

export const CryptoDeposit = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currency || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Deposit initiated successfully!");
  };

  return (
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

      <SecurityInfo
        title="Network Selection"
        items={[
          "Supports multiple networks (ERC20, BEP20, etc.)",
          "Automatic address generation",
          "Real-time deposit tracking",
        ]}
      />

      <Button
        type="submit"
        className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
      >
        Generate Deposit Address
      </Button>
    </form>
  );
};