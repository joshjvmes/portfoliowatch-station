import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

const TransactionHistory = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address || !chain?.id) return;
      
      setLoading(true);
      try {
        // In a real app, you would fetch transactions from an API like Etherscan
        // For demo purposes, we'll show a mock transaction
        setTransactions([
          {
            hash: "0x123...abc",
            from: address,
            to: "0x456...def",
            value: "0.1 ETH",
            timestamp: Date.now(),
          },
        ]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address, chain?.id]);

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] rounded-md">
          {loading ? (
            <p className="text-gray-400">Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.hash}
                  className="p-3 rounded-lg bg-[#1A2333]/50 border border-white/10"
                >
                  <p className="text-sm text-gray-400">
                    From: {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-400">
                    To: {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                  </p>
                  <p className="text-sm text-[#00E5BE]">{tx.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No transactions found</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;