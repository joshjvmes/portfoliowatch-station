import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import WalletConnect from "@/components/wallet/WalletConnect";
import WalletBalance from "@/components/wallet/WalletBalance";
import NetworkStatus from "@/components/wallet/NetworkStatus";
import TransactionHistory from "@/components/wallet/TransactionHistory";
import TokenTransfer from "@/components/wallet/TokenTransfer";
import { useAccount } from "wagmi";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { w3mProvider } from '@web3modal/ethereum';

// Configure chains & providers
const projectId = '3bc71515e830445a56ca773f191fe27e';

const { publicClient, chains } = configureChains(
  [mainnet, polygon],
  [w3mProvider({ projectId })]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [],
  publicClient,
});

const Web3Dashboard = () => {
  const { isConnected } = useAccount();

  return (
    <WagmiConfig config={wagmiConfig}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Web3 Dashboard</h2>
            <WalletConnect />
          </div>

          {isConnected ? (
            <div className="grid gap-6 md:grid-cols-2">
              <WalletBalance />
              <NetworkStatus />
              <TokenTransfer />
              <TransactionHistory />
            </div>
          ) : (
            <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <p className="text-gray-400">Connect your wallet to view dashboard</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </WagmiConfig>
  );
};

export default Web3Dashboard;