interface ExchangePrice {
  name: string;
  price: number;
}

export const calculateArbitrageOpportunities = (prices: ExchangePrice[]) => {
  const opportunities: {
    buyExchange: string;
    sellExchange: string;
    profitPercentage: number;
    buyPrice: number;
    sellPrice: number;
  }[] = [];

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const price1 = prices[i].price;
      const price2 = prices[j].price;
      
      const profitPercentage = ((Math.max(price1, price2) - Math.min(price1, price2)) / Math.min(price1, price2)) * 100;
      
      if (profitPercentage > 0.5) { // Only show opportunities with >0.5% profit
        opportunities.push({
          buyExchange: price1 < price2 ? prices[i].name : prices[j].name,
          sellExchange: price1 < price2 ? prices[j].name : prices[i].name,
          profitPercentage,
          buyPrice: Math.min(price1, price2),
          sellPrice: Math.max(price1, price2)
        });
      }
    }
  }

  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};