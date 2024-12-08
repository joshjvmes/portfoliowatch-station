import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Database,
  Coins,
  ScrollText,
  Gift,
  Circle,
  Turtle,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const topNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Assets", href: "/assets", icon: Database },
  { name: "Portfolio Margin", href: "/portfolio-margin", icon: Coins },
  { name: "Orders", href: "/orders", icon: ScrollText },
  { name: "Rewards Hub", href: "/rewards", icon: Gift },
];

const TopNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

  const toggleTheme = () => {
    setIsBlackAndWhite(!isBlackAndWhite);
    document.documentElement.classList.toggle('black-and-white');
  };

  return (
    <div className="border-b border-white/10 bg-[#0B1221]/50 backdrop-blur-xl">
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto no-scrollbar">
          {topNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 text-xs border border-white/10 rounded px-3 whitespace-nowrap ${
                    isActive
                      ? "bg-[#1A2333] text-[#00E5BE]"
                      : "text-gray-400 hover:text-white hover:bg-[#1A2333]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {!isMobile && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Turtle className="h-4 w-4" />
          </Button>
          <Link 
            to="/system-status"
            className="flex items-center space-x-2 text-sm hover:text-white transition-colors ml-2 shrink-0"
          >
            <Circle className="h-3 w-3 text-green-500 fill-green-500 animate-pulse" />
            {!isMobile && (
              <span className="text-gray-400 hover:text-white">System Online</span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TopNavigation;