import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartLine, Database, DollarSign, Clock, Zap, ArrowLeftRight } from "lucide-react";

export const TokenTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Token</TableHead>
        <TableHead>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center gap-2">
            <ChartLine className="h-4 w-4" />
            24h Change
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Liquidity
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Avg. Transaction Time
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            Exchange Rates
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Arbitrage
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};