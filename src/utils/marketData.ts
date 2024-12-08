export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
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

export const formatChartData = (data: MarketData) => {
  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price: price,
    volume: data.total_volumes.find(([t]) => t === timestamp)?.[1] || 0
  }));
};