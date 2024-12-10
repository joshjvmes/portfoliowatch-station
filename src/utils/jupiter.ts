import { Connection, PublicKey } from "@solana/web3.js";
import { Jupiter } from "@jup-ag/core";
import JSBI from 'jsbi';

export const initJupiter = async () => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  return await Jupiter.load({
    connection,
    cluster: 'mainnet-beta',
  });
};

export const getQuote = async (
  jupiter: Jupiter,
  inputMint: string,
  outputMint: string,
  amount: string,
) => {
  try {
    const routes = await jupiter.computeRoutes({
      inputMint: new PublicKey(inputMint),
      outputMint: new PublicKey(outputMint),
      amount: JSBI.BigInt(Number(amount) * 1e9),
      slippageBps: 50,
    });

    if (routes.routesInfos.length > 0) {
      const bestRoute = routes.routesInfos[0];
      return {
        outAmount: (JSBI.toNumber(bestRoute.outAmount) / 1e9).toString(),
        priceImpact: bestRoute.priceImpactPct.toFixed(2),
        bestRoute,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

export const executeSwap = async (
  jupiter: Jupiter,
  route: any,
) => {
  const { swapTransaction } = await jupiter.exchange({
    routeInfo: route,
  });

  // Get the connection instance
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  
  // Convert transaction to buffer before sending
  const rawTransaction = Buffer.from(swapTransaction.serialize());
  
  return await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: false,
    maxRetries: 2,
  });
};
