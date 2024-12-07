import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bitcoin } from "lucide-react";

const marketData = [
  {
    name: "Bitcoin",
    icon: <Bitcoin className="h-6 w-6 text-orange-500" />,
    leverage: "50×",
    price: "$99,960",
    change24h: "0.74%",
    volume24h: "$113M",
    spotVolume: "$123B",
    marketCap: "$1.94T",
    trades: "35.7K",
    openInterest: "$119M",
    funding: "0.0070%",
    chartData: [40, 35, 50, 45, 60, 55, 70], // Mock data for the sparkline
  },
];

const MarketTable = () => {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0B1221]/50 backdrop-blur-xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="search"
            placeholder="Search markets"
            className="flex-1 bg-white/5 border-0 rounded-lg px-4 py-2 text-white placeholder:text-white/40"
          />
        </div>
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          <button className="px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-400 text-sm">
            All
          </button>
          {["Recently Listed", "Launchable", "Meme", "AI & Big Data", "DeFi", "DePIN", "Layer 1", "Layer 2", "RWA", "Gaming", "Forex"].map((category) => (
            <button
              key={category}
              className="whitespace-nowrap px-3 py-1 rounded-full text-white/60 text-sm hover:bg-white/10 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-white/10">
            <TableHead>Market</TableHead>
            <TableHead>Oracle Price</TableHead>
            <TableHead>Last 24H</TableHead>
            <TableHead>24h Change</TableHead>
            <TableHead>24h Volume</TableHead>
            <TableHead>24h Spot Volume</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Trades</TableHead>
            <TableHead>Open Interest</TableHead>
            <TableHead>1h Funding</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {marketData.map((item) => (
            <TableRow key={item.name} className="hover:bg-white/5 border-white/10">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.leverage}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-20 h-8">
                  {/* Placeholder for sparkline chart */}
                  <div className="w-full h-full bg-white/10 rounded" />
                </div>
              </TableCell>
              <TableCell className="text-green-400">{item.change24h}</TableCell>
              <TableCell>{item.volume24h}</TableCell>
              <TableCell>{item.spotVolume}</TableCell>
              <TableCell>{item.marketCap}</TableCell>
              <TableCell>{item.trades}</TableCell>
              <TableCell>{item.openInterest}</TableCell>
              <TableCell className="text-green-400">{item.funding}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketTable;