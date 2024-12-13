export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const COINGECKO_IDS = {
  'SOL': 'solana'
};

export const fetchCoinData = async (coinId: string, days: number = 90): Promise<MarketData> => {
  const geckoId = COINGECKO_IDS[coinId as keyof typeof COINGECKO_IDS];
  if (!geckoId) {
    throw new Error('Unsupported coin ID');
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${geckoId}/market_chart?vs_currency=usd&days=${days}`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('CoinGecko API Error:', errorData);
    throw new Error('Failed to fetch market data');
  }
  
  return response.json();
};

export const formatChartData = (data: MarketData) => {
  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price: price,
    volume: data.total_volumes.find(([t]) => t === timestamp)?.[1] || 0
  }));
};

// For future real exchange integration
export const fetchExchangePrices = async (coinId: string) => {
  // This would be replaced with real exchange API calls
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS[coinId as keyof typeof COINGECKO_IDS]}&vs_currencies=usd`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch exchange prices');
  }
  
  return response.json();
};