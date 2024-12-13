interface ExchangePrice {
  name: string;
  price: number;
}

export const calculateArbitrageOpportunities = async (prices: ExchangePrice[], token: string = 'SOL') => {
  const opportunities = [];
  const fees = {
    trading: 0.001, // 0.1% trading fee
    withdrawal: 5, // $5 flat withdrawal fee
    network: 0.5, // $0.5 network fee for SOL transfers
  };

  // Compare prices between exchanges
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const buyExchange = prices[i];
      const sellExchange = prices[j];

      // Calculate price difference percentage
      const priceDiff = sellExchange.price - buyExchange.price;
      const profitPercentage = (priceDiff / buyExchange.price) * 100;

      // Calculate fees for a standard trade size
      const tradeAmount = 1000; // $1000 base trade size
      const tradingFees = tradeAmount * fees.trading * 2; // Buy and sell fees
      const totalFees = tradingFees + fees.withdrawal + fees.network;

      // Calculate potential profit after fees
      const potentialProfit = (tradeAmount * (profitPercentage / 100)) - totalFees;

      // Only include opportunities with positive profit after fees
      if (potentialProfit > 0) {
        opportunities.push({
          buyExchange: buyExchange.name,
          sellExchange: sellExchange.name,
          buyPrice: buyExchange.price,
          sellPrice: sellExchange.price,
          profitPercentage: profitPercentage,
          estimatedTimeMinutes: 2, // Estimated time for SOL transfers
          totalFees: totalFees
        });
      }

      // Check reverse direction
      const reversePriceDiff = buyExchange.price - sellExchange.price;
      const reverseProfitPercentage = (reversePriceDiff / sellExchange.price) * 100;
      const reversePotentialProfit = (tradeAmount * (reverseProfitPercentage / 100)) - totalFees;

      if (reversePotentialProfit > 0) {
        opportunities.push({
          buyExchange: sellExchange.name,
          sellExchange: buyExchange.name,
          buyPrice: sellExchange.price,
          sellPrice: buyExchange.price,
          profitPercentage: reverseProfitPercentage,
          estimatedTimeMinutes: 2, // Estimated time for SOL transfers
          totalFees: totalFees
        });
      }
    }
  }

  // Sort opportunities by profit percentage
  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};