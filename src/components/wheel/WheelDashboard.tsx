import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, Coins, LineChart, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

type QuadrantType = "liquidity" | "ai" | "cheques" | "margin" | null;

const quadrantData = {
  liquidity: {
    title: "Liquidity Provider",
    icon: Coins,
    color: "from-blue-500/20 to-blue-600/20",
    activeColor: "from-blue-500 to-blue-600",
    description: "Manage and provide liquidity across multiple pools"
  },
  ai: {
    title: "AI Agents",
    icon: Brain,
    color: "from-purple-500/20 to-purple-600/20",
    activeColor: "from-purple-500 to-purple-600",
    description: "Advanced AI-powered trading strategies and analysis"
  },
  cheques: {
    title: "Cheques & Balances",
    icon: Scale,
    color: "from-green-500/20 to-green-600/20",
    activeColor: "from-green-500 to-green-600",
    description: "Monitor and manage your account balance and transactions"
  },
  margin: {
    title: "Margin Trading",
    icon: LineChart,
    color: "from-red-500/20 to-red-600/20",
    activeColor: "from-red-500 to-red-600",
    description: "Access leveraged trading with advanced risk management"
  }
};

export const WheelDashboard = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantType>(null);
  const [rotation, setRotation] = useState(0);

  const handleQuadrantClick = (quadrant: QuadrantType) => {
    let newRotation = 0;
    
    switch(quadrant) {
      case "liquidity": newRotation = 0; break;
      case "ai": newRotation = 270; break;
      case "cheques": newRotation = 90; break;
      case "margin": newRotation = 180; break;
    }
    
    setRotation(newRotation);
    setTimeout(() => setSelectedQuadrant(quadrant), 500);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[600px]">
        <div 
          className="relative w-[500px] h-[500px] transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Quadrants */}
          {(Object.keys(quadrantData) as QuadrantType[]).map((key, index) => {
            const quadrant = quadrantData[key];
            const Icon = quadrant.icon;
            const angle = index * 90;
            
            return (
              <button
                key={key}
                onClick={() => handleQuadrantClick(key)}
                className={cn(
                  "absolute w-[250px] h-[250px] rounded-tl-full",
                  "transition-all duration-300 hover:scale-105",
                  "flex items-center justify-center",
                  "bg-gradient-to-br backdrop-blur-sm",
                  quadrant.color,
                  "hover:shadow-lg hover:shadow-white/10",
                  "group"
                )}
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "bottom right",
                }}
              >
                <div 
                  className="relative -rotate-45"
                  style={{ transform: `rotate(${-angle - 45}deg)` }}
                >
                  <Icon className="w-10 h-10 text-white/80 group-hover:text-white transition-colors" />
                  <p className="text-sm font-medium text-white/80 group-hover:text-white mt-2">
                    {quadrant.title}
                  </p>
                </div>
              </button>
            );
          })}
          
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      <Dialog open={selectedQuadrant !== null} onOpenChange={() => setSelectedQuadrant(null)}>
        <DialogContent className="sm:max-w-[500px] bg-black/90 border-white/10 text-white backdrop-blur-lg">
          {selectedQuadrant && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {quadrantData[selectedQuadrant].icon && 
                    <quadrantData[selectedQuadrant].icon className="w-5 h-5" />
                  }
                  {quadrantData[selectedQuadrant].title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-400">
                  {quadrantData[selectedQuadrant].description}
                </p>
                {/* Add more content specific to each quadrant here */}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};