import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const moversData = [
  {
    icon: "/lovable-uploads/b5c4ca02-3959-4e56-9a16-9b4457a01398.png",
    name: "Doland...",
    leverage: "20×",
    price: "$0.1237",
    change: "+34.47%",
    amount: "19.8K TREMP",
    totalValue: "$2.45K",
  },
  {
    name: "LUCE",
    leverage: "20×",
    price: "$0.1603",
    change: "+27.94%",
    amount: "5.32K LUCE",
    totalValue: "$853",
  },
  {
    name: "Turbo",
    leverage: "20×",
    price: "$0.011443",
    change: "+21.86%",
    amount: "1.37M TURBO",
    totalValue: "$15.6K",
  },
];

const BiggestMovers = () => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl text-white">Biggest Movers</CardTitle>
          <span className="bg-indigo-600/30 text-indigo-400 px-2 py-1 rounded text-xs">24H</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">
            Gainers
          </button>
          <button className="px-3 py-1 rounded-full text-white/60 text-sm hover:bg-white/10 transition-colors">
            Losers
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moversData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  {item.icon ? (
                    <img src={item.icon} alt={item.name} className="h-8 w-8" />
                  ) : (
                    <div className="h-8 w-8 bg-indigo-500/20 rounded-lg" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.leverage}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-white text-right">{item.price}</div>
                  <div className="text-xs text-green-400 text-right">{item.change}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white text-right">{item.totalValue}</div>
                  <div className="text-xs text-muted-foreground text-right">{item.amount}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BiggestMovers;