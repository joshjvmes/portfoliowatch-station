import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SecurityInfo } from "./SecurityInfo";

export const CardDeposit = () => {
  return (
    <form className="space-y-6">
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

      <SecurityInfo
        title="Secure Card Processing"
        items={[
          "256-bit encryption",
          "3D Secure authentication",
          "Instant processing",
        ]}
      />

      <Button
        type="submit"
        className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
      >
        Process Card Payment
      </Button>
    </form>
  );
};