import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAccount, usePrepareSendTransaction, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";

const TokenTransfer = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { address } = useAccount();

  const { config } = usePrepareSendTransaction({
    to,
    value: amount ? parseEther(amount) : undefined,
  });

  const { sendTransaction } = useSendTransaction({
    ...config,
    onSuccess: () => {
      toast.success("Transaction sent successfully!");
      setTo("");
      setAmount("");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleTransfer = () => {
    if (!to || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    sendTransaction?.();
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Transfer Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Recipient Address"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-[#1A2333] border-white/10 text-white"
            />
          </div>
          <div>
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#1A2333] border-white/10 text-white"
            />
          </div>
          <Button
            onClick={handleTransfer}
            className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
            disabled={!sendTransaction || !to || !amount}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenTransfer;