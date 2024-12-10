import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import { ethers } from 'ethers';

// Common tokens
export const WETH = new Token(
  1, // mainnet
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

export const USDC = new Token(
  1,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin'
);

// Initialize router with provider
export const initializeRouter = (provider: ethers.providers.Provider) => {
  return new AlphaRouter({ chainId: 1, provider });
};

// Get quote for a swap
export const getQuote = async (
  router: AlphaRouter,
  inputAmount: CurrencyAmount<Token>,
  outputToken: Token
) => {
  try {
    const route = await router.route(
      inputAmount,
      outputToken,
      TradeType.EXACT_INPUT,
      {
        recipient: ethers.constants.AddressZero,
        slippageTolerance: new Percent(5, 100), // 5% slippage
        deadline: Math.floor(Date.now() / 1000 + 1800), // 30 minute deadline
      }
    );

    return route;
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
};