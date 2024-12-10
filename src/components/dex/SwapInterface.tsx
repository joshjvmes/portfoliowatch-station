import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const DEX_OPTIONS = [
  { id: 'jupiter', name: 'Jupiter' },
  { id: 'raydium', name: 'Raydium' },
  { id: 'orca', name: 'Orca' },
];

const SwapInterface = () => {
  const [selectedDex, setSelectedDex] = useState('jupiter');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = async () => {
    try {
      setIsLoading(true);
      // Swap implementation will be added in the next step
      toast.info('Swap functionality coming soon!');
    } catch (error) {
      console.error('Swap error:', error);
      toast.error('Failed to execute swap');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Token Swap</span>
          <Select
            value={selectedDex}
            onValueChange={setSelectedDex}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select DEX" />
            </SelectTrigger>
            <SelectContent>
              {DEX_OPTIONS.map((dex) => (
                <SelectItem key={dex.id} value={dex.id}>
                  {dex.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">From</label>
          <Input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400">To</label>
          <Input
            type="number"
            placeholder="0.0"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            disabled
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSwap}
          disabled={isLoading || !fromAmount}
        >
          {isLoading ? 'Loading...' : 'Swap'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SwapInterface;