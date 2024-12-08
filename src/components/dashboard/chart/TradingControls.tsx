import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface TradingControlsProps {
  tradeAmount: number[];
  stopLoss: number[];
  takeProfit: number[];
  onTradeAmountChange: (value: number[]) => void;
  onStopLossChange: (value: number[]) => void;
  onTakeProfitChange: (value: number[]) => void;
}

const TradingControls = ({
  tradeAmount,
  stopLoss,
  takeProfit,
  onTradeAmountChange,
  onStopLossChange,
  onTakeProfitChange,
}: TradingControlsProps) => {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          className="bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black font-bold py-4 md:py-6"
        >
          Buy / Long
        </Button>
        <Button 
          className="bg-[#FF4D4D] hover:bg-[#FF4D4D]/90 text-white font-bold py-4 md:py-6"
        >
          Sell / Short
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Trade Amount: {tradeAmount}% of balance
          </label>
          <Slider
            value={tradeAmount}
            onValueChange={onTradeAmountChange}
            max={100}
            step={1}
            className="[&>.relative>.absolute]:bg-[#00E5BE]"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Stop Loss: {stopLoss}% below entry
          </label>
          <Slider
            value={stopLoss}
            onValueChange={onStopLossChange}
            max={50}
            step={1}
            className="[&>.relative>.absolute]:bg-[#FF4D4D]"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Take Profit: {takeProfit}% above entry
          </label>
          <Slider
            value={takeProfit}
            onValueChange={onTakeProfitChange}
            max={100}
            step={1}
            className="[&>.relative>.absolute]:bg-[#00E5BE]"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingControls;