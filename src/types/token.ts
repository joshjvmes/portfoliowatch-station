export interface TokenData {
  symbol: string;
  name: string;
  logoURI?: string;
  price?: number;
  change24h?: number;
  liquidity?: number;
  avgTxTime?: number;
  exchangeRates?: {
    raydium?: number;
    orca?: number;
  };
  arbitrage?: number;
}