import { NetworkType, getExplorerLink } from "@/utils/solana";

interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  network: NetworkType;
  address: string;
}

export const RecentTransactions = ({ transactions, network, address }: RecentTransactionsProps) => {
  if (!transactions.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-gray-400">Recent Transactions</p>
      <div className="space-y-2">
        {transactions.map((tx, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <a
              href={`${getExplorerLink(address, network)}/tx/${tx.signature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono hover:text-[#AB9FF2]"
            >
              {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
            </a>
            <span>{new Date(tx.timestamp * 1000).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};