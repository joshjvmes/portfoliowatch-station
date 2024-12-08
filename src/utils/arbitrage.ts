interface ExchangePrice {
  exchange: string;
  price: number;
  tradingFee: number; // percentage
  transferTime: number; // minutes
}

interface ArbitrageOpportunity {
  buyExchange: string;
  sellExchange: string;
  profitPercentage: number;
  buyPrice: number;
  sellPrice: number;
  totalFees: number;
  estimatedTime: number;
  netProfit: number;
}

export const calculateArbitrageOpportunities = (prices: ExchangePrice[]) => {
  const opportunities: ArbitrageOpportunity[] = [];

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const buyExchange = prices[i];
      const sellExchange = prices[j];
      
      // Calculate fees
      const buyFee = buyExchange.price * (buyExchange.tradingFee / 100);
      const sellFee = sellExchange.price * (sellExchange.tradingFee / 100);
      const totalFees = buyFee + sellFee;
      
      // Calculate gross profit
      const grossProfit = sellExchange.price - buyExchange.price;
      const netProfit = grossProfit - totalFees;
      
      // Calculate profit percentage after fees
      const profitPercentage = (netProfit / buyExchange.price) * 100;
      
      // Total estimated time for the arbitrage
      const estimatedTime = buyExchange.transferTime + sellExchange.transferTime;
      
      // Only show opportunities with >0.5% profit after fees
      if (profitPercentage > 0.5) {
        opportunities.push({
          buyExchange: buyExchange.exchange,
          sellExchange: sellExchange.exchange,
          profitPercentage,
          buyPrice: buyExchange.price,
          sellPrice: sellExchange.price,
          totalFees,
          estimatedTime,
          netProfit
        });
      }

      // Check reverse direction
      const reverseBuyFee = sellExchange.price * (sellExchange.tradingFee / 100);
      const reverseSellFee = buyExchange.price * (buyExchange.tradingFee / 100);
      const reverseTotalFees = reverseBuyFee + reverseSellFee;
      
      const reverseGrossProfit = buyExchange.price - sellExchange.price;
      const reverseNetProfit = reverseGrossProfit - reverseTotalFees;
      const reverseProfitPercentage = (reverseNetProfit / sellExchange.price) * 100;

      if (reverseProfitPercentage > 0.5) {
        opportunities.push({
          buyExchange: sellExchange.exchange,
          sellExchange: buyExchange.exchange,
          profitPercentage: reverseProfitPercentage,
          buyPrice: sellExchange.price,
          sellPrice: buyExchange.price,
          totalFees: reverseTotalFees,
          estimatedTime,
          netProfit: reverseNetProfit
        });
      }
    }
  }

  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};