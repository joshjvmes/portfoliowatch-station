import { toast } from "sonner";

export const NETWORK_URLS = {
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
  'devnet': 'https://api.devnet.solana.com'
};

export type NetworkType = 'mainnet-beta' | 'devnet';

export const getProvider = () => {
  if (typeof window === 'undefined') return null;
  const provider = (window as any).solana;
  if (!provider) {
    toast.error('Phantom wallet not found');
    return null;
  }
  return provider;
};

export const createConnection = (network: NetworkType) => {
  const provider = getProvider();
  if (!provider) return null;
  return new provider.Connection(NETWORK_URLS[network]);
};

export const getExplorerLink = (address: string, network: NetworkType) => {
  const baseUrl = network === 'devnet' ? 'https://explorer.solana.com/?cluster=devnet' : 'https://explorer.solana.com';
  return `${baseUrl}/address/${address}`;
};