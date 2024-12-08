import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Circle, Square, Diamond, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface MarketData {
  name: string;
  icon: JSX.Element;
  leverage: string;
  price: string;
  change24h: string;
  volume24h: string;
  spotVolume: string;
  marketCap: string;
  trades: string;
  openInterest: string;
  funding: string;
  isPositive: boolean;
  alert?: boolean;
}

const initialMarketData: MarketData[] = [
  {
    name: "Bitcoin",
    icon: <Circle className="h-6 w-6 text-orange-500" />,
    leverage: "50×",
    price: "$99,960",
    change24h: "0.74%",
    volume24h: "$113M",
    spotVolume: "$123B",
    marketCap: "$1.94T",
    trades: "35.7K",
    openInterest: "$119M",
    funding: "0.0070%",
    isPositive: true,
  },
  {
    name: "Ethereum",
    icon: <Square className="h-6 w-6 text-blue-500" />,
    leverage: "40×",
    price: "$2,341",
    change24h: "-1.23%",
    volume24h: "$89M",
    spotVolume: "$45B",
    marketCap: "$281B",
    trades: "28.4K",
    openInterest: "$78M",
    funding: "-0.0012%",
    isPositive: false,
    alert: true,
  },
];

const MarketTable = () => {
  const [marketData, setMarketData] = useState<MarketData[]>(initialMarketData);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: `$${(parseFloat(item.price.replace(/[$,]/g, '')) + (Math.random() - 0.5) * 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        change24h: `${(parseFloat(item.change24h) + (Math.random() - 0.5) * 0.1).toFixed(2)}%`,
        isPositive: Math.random() > 0.5,
        volume24h: `$${(parseFloat(item.volume24h.replace(/[$,M]/g, '')) + (Math.random() - 0.5) * 2).toFixed(1)}M`,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-[#0B1221]/50 backdrop-blur-xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="search"
            placeholder="Search markets"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {marketData
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
            <TableRow key={index} className="hover:bg-white/5 border-white/10 group">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white flex items-center gap-2">
                      {item.name}
                      {item.alert && (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.leverage}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium text-white">{item.price}</TableCell>
              <TableCell>
                <div className="w-20 h-8">
                  {item.isPositive ? (
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-500" />
                  )}
                </div>
              </TableCell>
              <TableCell className={item.isPositive ? "text-green-400" : "text-red-400"}>
                {item.change24h}
              </TableCell>
              <TableCell className="group-hover:text-white transition-colors">{item.volume24h}</TableCell>
              <TableCell className="group-hover:text-white transition-colors">{item.spotVolume}</TableCell>
              <TableCell className="group-hover:text-white transition-colors">{item.marketCap}</TableCell>
              <TableCell className="group-hover:text-white transition-colors">{item.trades}</TableCell>
              <TableCell className="group-hover:text-white transition-colors">{item.openInterest}</TableCell>
              <TableCell className={parseFloat(item.funding) > 0 ? "text-green-400" : "text-red-400"}>
                {item.funding}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketTable;