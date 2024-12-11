export const formatNumber = (num?: number, decimals: number = 2) => {
  if (num === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPrice = (price?: number) => {
  if (price === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatPercentage = (value?: number) => {
  if (value === undefined) return "N/A";
  return `${value >= 0 ? "+" : ""}${formatNumber(value)}%`;
};