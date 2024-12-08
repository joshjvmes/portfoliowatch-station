export const calculateSMA = (prices: number[], period: number) => {
  const sma = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      sma.push(null);
      continue;
    }
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
};

export const calculateBollingerBands = (prices: number[], period: number = 20, multiplier: number = 2) => {
  const sma = calculateSMA(prices, period);
  const bands = sma.map((mean, i) => {
    if (mean === null) return { upper: null, lower: null };
    
    const slice = prices.slice(Math.max(0, i - period + 1), i + 1);
    const stdDev = Math.sqrt(
      slice.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / slice.length
    );
    
    return {
      upper: mean + (multiplier * stdDev),
      lower: mean - (multiplier * stdDev)
    };
  });
  
  return bands;
};

export const calculateRSI = (prices: number[], period: number = 14) => {
  const rsi = [];
  let gains = 0;
  let losses = 0;
  
  // Calculate initial average gain and loss
  for (let i = 1; i < period + 1; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }
  
  let avgGain = gains / period;
  let avgLoss = losses / period;
  
  // Calculate RSI for the rest of the data
  for (let i = 0; i < prices.length; i++) {
    if (i < period) {
      rsi.push(null);
      continue;
    }
    
    const difference = prices[i] - prices[i - 1];
    avgGain = ((avgGain * (period - 1)) + (difference > 0 ? difference : 0)) / period;
    avgLoss = ((avgLoss * (period - 1)) + (difference < 0 ? -difference : 0)) / period;
    
    const rs = avgGain / avgLoss;
    rsi.push(100 - (100 / (1 + rs)));
  }
  
  return rsi;
};

export const calculateMACD = (prices: number[]) => {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macd = [];
  const signal = [];
  
  // Calculate MACD line
  for (let i = 0; i < prices.length; i++) {
    if (ema12[i] === null || ema26[i] === null) {
      macd.push(null);
      continue;
    }
    macd.push(ema12[i]! - ema26[i]!);
  }
  
  // Calculate Signal line (9-day EMA of MACD)
  const signalLine = calculateEMA(macd.filter(x => x !== null) as number[], 9);
  let signalIndex = 0;
  
  for (let i = 0; i < macd.length; i++) {
    if (macd[i] === null) {
      signal.push(null);
    } else {
      signal.push(signalLine[signalIndex++]);
    }
  }
  
  return { macd, signal };
};

export const calculateEMA = (prices: number[], period: number) => {
  const ema = [];
  const multiplier = 2 / (period + 1);
  
  let initialSMA = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      ema.push(null);
      continue;
    }
    
    if (i === period - 1) {
      ema.push(initialSMA);
      continue;
    }
    
    ema.push((prices[i] - ema[i - 1]!) * multiplier + ema[i - 1]!);
  }
  
  return ema;
};

export const calculateIndicators = (data: any[]) => {
  const prices = data.map(d => d.price);
  
  // Calculate indicators
  const sma20 = calculateSMA(prices, 20);
  const bollingerBands = calculateBollingerBands(prices);
  const rsi = calculateRSI(prices);
  const { macd, signal } = calculateMACD(prices);
  
  // Combine all data
  return data.map((d, i) => ({
    ...d,
    sma20: sma20[i],
    upperBand: bollingerBands[i]?.upper,
    lowerBand: bollingerBands[i]?.lower,
    rsi: rsi[i],
    macd: macd[i],
    signal: signal[i]
  }));
};