import { useAccount, useBalance, useNetwork, useDisconnect } from 'wagmi';
import { toast } from "sonner";

export const useWalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address: address,
  });
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    try {
      disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return {
    address,
    isConnected,
    chain,
    balance,
    handleDisconnect,
  };
};