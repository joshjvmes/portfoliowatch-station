export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ExchangePrice {
  exchange: string;
  price: number;
  volume24h: number;
  last_updated: string;
}

export const fetchCoinData = async (coinId: string, days: number = 90): Promise<MarketData> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch market data');
  }
  
  return response.json();
};

export const fetchTopCoins = async (): Promise<string[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top coins');
  }

  const data = await response.json();
  return data.map((coin: any) => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name
  }));
};

export const fetchExchangePrices = async (coinId: string): Promise<ExchangePrice[]> => {
  // Fetch tickers from multiple exchanges for a given coin
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/tickers`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch exchange prices');
  }
  
  const data = await response.json();
  
  // Process and normalize exchange data
  return data.tickers
    .filter((ticker: any) => ticker.target === 'USD' || ticker.target === 'USDT')
    .map((ticker: any) => ({
      exchange: ticker.market.name,
      price: ticker.last,
      volume24h: ticker.volume,
      last_updated: ticker.last_traded_at
    }));
};

export const formatChartData = (data: MarketData) => {
  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price: price,
    volume: data.total_volumes.find(([t]) => t === timestamp)?.[1] || 0
  }));
};