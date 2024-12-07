import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, DollarSign } from "lucide-react";

const recentlyListedData = [
  {
    icon: <DollarSign className="h-8 w-8" />,
    name: "Ethena...",
    leverage: "20×",
    price: "$1.0019",
    change: "-0.07%",
    isNegative: true,
  },
  {
    icon: <DollarSign className="h-8 w-8 text-purple-500" />,
    name: "Aaveg...",
    leverage: "20×",
    price: "$1.4330",
    change: "4.73%",
    isNegative: false,
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    name: "Amplef...",
    leverage: "20×",
    price: "$1.501",
    change: "10.32%",
    isNegative: false,
  },
];

const RecentlyListed = () => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-white">Recently Listed</CardTitle>
        <span className="bg-indigo-600/30 text-indigo-400 px-2 py-1 rounded text-xs">NEW</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentlyListedData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">{item.icon}</div>
                <div>
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.leverage}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-white text-right">{item.price}</div>
                  <div className={`text-xs ${item.isNegative ? 'text-red-400' : 'text-green-400'} text-right`}>
                    {item.change}
                  </div>
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

export default RecentlyListed;