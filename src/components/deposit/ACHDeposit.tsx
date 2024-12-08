import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SecurityInfo } from "./SecurityInfo";

export const ACHDeposit = () => {
  return (
    <form className="space-y-6">
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

      <SecurityInfo
        title="ACH Transfer Information"
        items={[
          "Processing time: 3-5 business days",
          "No transfer fees",
          "Minimum deposit: $100",
        ]}
      />

      <Button
        type="submit"
        className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
      >
        Initiate ACH Transfer
      </Button>
    </form>
  );
};