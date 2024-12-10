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
    console.error('Phantom wallet not found');
    return null;
  }
  if (!provider.isPhantom) {
    console.error('Please use Phantom wallet');
    return null;
  }
  return provider;
};

export const createConnection = (network: NetworkType) => {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    return new provider.Connection(NETWORK_URLS[network], 'confirmed');
  } catch (error) {
    console.error('Failed to create Solana connection:', error);
    return null;
  }
};

export const getExplorerLink = (address: string, network: NetworkType) => {
  const baseUrl = network === 'devnet' ? 'https://explorer.solana.com/?cluster=devnet' : 'https://explorer.solana.com';
  return `${baseUrl}/address/${address}`;
};

export const fetchWalletData = async (address: string, network: NetworkType) => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('Phantom wallet not found');
    }

    const connection = createConnection(network);
    if (!connection) {
      throw new Error('Failed to create Solana connection');
    }

    // Create PublicKey instance with error handling
    let publicKey;
    try {
      publicKey = new provider.PublicKey(address);
    } catch (error) {
      throw new Error('Invalid wallet address');
    }

    // Fetch SOL balance
    const balance = await connection.getBalance(publicKey);

    // Fetch token accounts with retry
    let tokenAccounts;
    try {
      tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: new provider.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );
    } catch (error) {
      console.error('Error fetching token accounts:', error);
      tokenAccounts = { value: [] };
    }

    // Fetch recent transactions with retry
    let signatures;
    try {
      signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      signatures = [];
    }

    return {
      balance: balance / 1e9,
      tokens: tokenAccounts.value.map((account: any) => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount,
        decimals: account.account.data.parsed.info.tokenAmount.decimals,
        symbol: account.account.data.parsed.info.symbol
      })),
      transactions: signatures.map((sig: any) => ({
        signature: sig.signature,
        timestamp: sig.blockTime,
        type: 'transfer',
        amount: 0
      }))
    };
  } catch (error: any) {
    console.error('Error in fetchWalletData:', error);
    throw new Error(error.message || 'Failed to fetch wallet data');
  }
};