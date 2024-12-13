import { supabase } from "@/integrations/supabase/client";

interface ExchangePrice {
  name: string;
  price: number;
}

interface ExchangeMetadata {
  exchange_name: string;
  trading_fee_percentage: number;
  withdrawal_fee_flat: number;
  avg_transfer_time_minutes: number;
}

export const calculateArbitrageOpportunities = async (prices: ExchangePrice[], token: string = 'BTC') => {
  // Fetch exchange metadata from Supabase
  const { data: exchangeMetadata, error } = await supabase
    .from('exchange_metadata')
    .select('*');

  if (error) {
    console.error('Error fetching exchange metadata:', error);
    return [];
  }

  const opportunities: {
    buyExchange: string;
    sellExchange: string;
    profitPercentage: number;
    buyPrice: number;
    sellPrice: number;
    estimatedTimeMinutes: number;
    totalFees: number;
  }[] = [];

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const price1 = prices[i].price;
      const price2 = prices[j].price;
      
      const exchange1Meta = exchangeMetadata.find(
        (meta: ExchangeMetadata) => meta.exchange_name === prices[i].name
      );
      const exchange2Meta = exchangeMetadata.find(
        (meta: ExchangeMetadata) => meta.exchange_name === prices[j].name
      );

      if (!exchange1Meta || !exchange2Meta) continue;

      const buyPrice = Math.min(price1, price2);
      const sellPrice = Math.max(price1, price2);
      const buyExchange = price1 < price2 ? prices[i].name : prices[j].name;
      const sellExchange = price1 < price2 ? prices[j].name : prices[i].name;

      const buyExchangeMeta = buyExchange === prices[i].name ? exchange1Meta : exchange2Meta;
      const sellExchangeMeta = sellExchange === prices[i].name ? exchange1Meta : exchange2Meta;

      // Calculate fees
      const tradingFeeBuy = buyPrice * (buyExchangeMeta.trading_fee_percentage / 100);
      const tradingFeeSell = sellPrice * (sellExchangeMeta.trading_fee_percentage / 100);
      const withdrawalFee = buyExchangeMeta.withdrawal_fee_flat;
      const totalFees = tradingFeeBuy + tradingFeeSell + withdrawalFee;

      // Calculate profit after fees
      const grossProfit = sellPrice - buyPrice;
      const netProfit = grossProfit - totalFees;
      const profitPercentage = (netProfit / buyPrice) * 100;

      // Calculate estimated time
      const estimatedTimeMinutes = 
        buyExchangeMeta.avg_transfer_time_minutes + 
        sellExchangeMeta.avg_transfer_time_minutes;

      if (profitPercentage > 0.5) { // Only show opportunities with >0.5% profit
        opportunities.push({
          buyExchange,
          sellExchange,
          profitPercentage,
          buyPrice,
          sellPrice,
          estimatedTimeMinutes,
          totalFees
        });

        // Store the opportunity in the database
        await supabase.from('price_discrepancies').insert({
          token_symbol: token,
          exchange_from: buyExchange,
          exchange_to: sellExchange,
          price_difference_percentage: profitPercentage,
          profitable_after_fees: true,
          potential_profit_usd: netProfit
        });
      }
    }
  }

  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};