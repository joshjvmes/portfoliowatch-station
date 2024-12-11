import { TableCell, TableRow } from "@/components/ui/table";
import { TokenInfo } from "@solana/spl-token-registry";

interface TokenTableRowProps {
  token: TokenInfo;
  priceData: {
    jupiter?: {
      price?: number;
      change24h?: number;
      liquidity?: number;
      avgTime?: number;
    };
    raydium?: {
      price?: number;
      change24h?: number;
      liquidity?: number;
      avgTime?: number;
    };
    orca?: {
      price?: number;
      change24h?: number;
      liquidity?: number;
      avgTime?: number;
    };
  };
}

const formatPrice = (price?: number) => {
  if (!price) return 'N/A';
  return `$${price.toFixed(2)}`;
};

const formatChange = (change?: number) => {
  if (!change) return 'N/A';
  const color = change >= 0 ? 'text-green-500' : 'text-red-500';
  return <span className={color}>{change.toFixed(2)}%</span>;
};

const formatLiquidity = (liquidity?: number) => {
  if (!liquidity) return 'N/A';
  return `$${(liquidity / 1000000).toFixed(2)}M`;
};

const formatTime = (time?: number) => {
  if (!time) return 'N/A';
  return `${time}ms`;
};

export const TokenTableRow = ({ token, priceData }: TokenTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          {token.logoURI && (
            <img
              src={token.logoURI}
              alt={token.symbol}
              className="w-6 h-6 rounded-full"
            />
          )}
          <div>
            <div className="font-medium">{token.symbol}</div>
            <div className="text-sm text-muted-foreground">
              {token.name}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>Jupiter: {formatPrice(priceData.jupiter?.price)}</div>
          <div>Raydium: {formatPrice(priceData.raydium?.price)}</div>
          <div>Orca: {formatPrice(priceData.orca?.price)}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>Jupiter: {formatChange(priceData.jupiter?.change24h)}</div>
          <div>Raydium: {formatChange(priceData.raydium?.change24h)}</div>
          <div>Orca: {formatChange(priceData.orca?.change24h)}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>Jupiter: {formatLiquidity(priceData.jupiter?.liquidity)}</div>
          <div>Raydium: {formatLiquidity(priceData.raydium?.liquidity)}</div>
          <div>Orca: {formatLiquidity(priceData.orca?.liquidity)}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>Jupiter: {formatTime(priceData.jupiter?.avgTime)}</div>
          <div>Raydium: {formatTime(priceData.raydium?.avgTime)}</div>
          <div>Orca: {formatTime(priceData.orca?.avgTime)}</div>
        </div>
      </TableCell>
      <TableCell>Coming soon</TableCell>
      <TableCell>Coming soon</TableCell>
    </TableRow>
  );
};