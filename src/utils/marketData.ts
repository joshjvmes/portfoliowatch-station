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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCoinData = async (coinId: string, days: number = 90): Promise<MarketData> => {
  console.log('Fetching coin data for:', coinId);
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      if (response.status === 429) {
        console.log('Rate limited, waiting before retry...');
        await delay(2000); // Wait 2 seconds before retry
        return fetchCoinData(coinId, days);
      }
      throw new Error(`Failed to fetch market data: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received coin data:', { coinId, dataPoints: data.prices?.length || 0 });
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

export const fetchTopCoins = async (): Promise<any[]> => {
  console.log('Fetching top coins');
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1'
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.log('Rate limited, waiting before retry...');
        await delay(2000);
        return fetchTopCoins();
      }
      throw new Error(`Failed to fetch top coins: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received top coins:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    throw error;
  }
};

export const fetchExchangePrices = async (coinId: string): Promise<ExchangePrice[]> => {
  console.log('Fetching exchange prices for:', coinId);
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/tickers`
    );
    
    if (!response.ok) {
      if (response.status === 429) {
        console.log('Rate limited, waiting before retry...');
        await delay(2000);
        return fetchExchangePrices(coinId);
      }
      throw new Error(`Failed to fetch exchange prices: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received exchange prices:', { 
      coinId, 
      exchanges: data.tickers?.length || 0 
    });
    
    // Process and normalize exchange data
    return data.tickers
      .filter((ticker: any) => ticker.target === 'USD' || ticker.target === 'USDT')
      .map((ticker: any) => ({
        exchange: ticker.market.name,
        price: ticker.last,
        volume24h: ticker.volume,
        last_updated: ticker.last_traded_at
      }));
  } catch (error) {
    console.error('Error fetching exchange prices:', error);
    throw error;
  }
};

export const formatChartData = (data: MarketData) => {
  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString().split('T')[0],
    price: price,
    volume: data.total_volumes.find(([t]) => t === timestamp)?.[1] || 0
  }));
};