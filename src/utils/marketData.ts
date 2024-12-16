import ccxt from 'ccxt';
import { toast } from "sonner";

const initializeCoinbaseClient = async () => {
  try {
    const exchange = new ccxt.coinbase({
      enableRateLimit: true,
    });
    return exchange;
  } catch (error) {
    console.error('Error initializing Coinbase client:', error);
    toast.error('Failed to connect to Coinbase');
    throw error;
  }
};

export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export const fetchCoinData = async (coinId: string, days: number = 90): Promise<MarketData> => {
  try {
    const exchange = await initializeCoinbaseClient();
    const symbol = `${coinId}/USD`;
    
    // Fetch OHLCV data
    const ohlcv = await exchange.fetchOHLCV(symbol, '1d', undefined, days);
    
    // Format data for chart display
    const prices: [number, number][] = ohlcv.map(candle => [candle[0], candle[4]]);
    const volumes: [number, number][] = ohlcv.map(candle => [candle[0], candle[5]]);
    const marketCaps: [number, number][] = ohlcv.map(candle => [
      candle[0],
      candle[4] * candle[5] // Approximate market cap using price * volume
    ]);

    return {
      prices,
      market_caps: marketCaps,
      total_volumes: volumes,
    };
  } catch (error) {
    console.error('Error fetching data from Coinbase:', error);
    toast.error('Failed to fetch market data');
    throw error;
  }
};

export const formatChartData = (data: MarketData) => {
  return data.prices.map(([timestamp, price], index) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price: price,
    volume: data.total_volumes[index]?.[1] || 0,
    marketCap: data.market_caps[index]?.[1] || 0
  }));
};

// Get current ticker information
export const fetchTickerData = async (symbol: string) => {
  try {
    const exchange = await initializeCoinbaseClient();
    const ticker = await exchange.fetchTicker(`${symbol}/USD`);
    return ticker;
  } catch (error) {
    console.error('Error fetching ticker:', error);
    toast.error('Failed to fetch ticker data');
    throw error;
  }
};

// Get order book data
export const fetchOrderBook = async (symbol: string, limit: number = 20) => {
  try {
    const exchange = await initializeCoinbaseClient();
    const orderBook = await exchange.fetchOrderBook(`${symbol}/USD`, limit);
    return orderBook;
  } catch (error) {
    console.error('Error fetching order book:', error);
    toast.error('Failed to fetch order book');
    throw error;
  }
};

// Get available trading pairs
export const fetchTradingPairs = async () => {
  try {
    const exchange = await initializeCoinbaseClient();
    const markets = await exchange.loadMarkets();
    return markets;
  } catch (error) {
    console.error('Error fetching trading pairs:', error);
    toast.error('Failed to fetch trading pairs');
    throw error;
  }
};

// Get recent trades
export const fetchRecentTrades = async (symbol: string, limit: number = 50) => {
  try {
    const exchange = await initializeCoinbaseClient();
    const trades = await exchange.fetchTrades(`${symbol}/USD`, undefined, limit);
    return trades;
  } catch (error) {
    console.error('Error fetching recent trades:', error);
    toast.error('Failed to fetch recent trades');
    throw error;
  }
};