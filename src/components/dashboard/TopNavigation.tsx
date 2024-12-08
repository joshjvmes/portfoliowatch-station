import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Database,
  Coins,
  ScrollText,
  Gift,
  ChevronDown,
  Circle,
} from "lucide-react";

const topNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Assets", href: "/assets", icon: Database, hasSubmenu: true },
  { name: "Portfolio Margin", href: "/portfolio-margin", icon: Coins },
  { name: "Orders", href: "/orders", icon: ScrollText, hasSubmenu: true },
  { name: "Rewards Hub", href: "/rewards", icon: Gift },
];

const TopNavigation = () => {
  const location = useLocation();

  return (
    <div className="border-b border-white/10 bg-[#0B1221]/50 backdrop-blur-xl">
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-1">
          {topNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 text-xs border border-white/10 rounded px-3 ${
                    isActive
                      ? "bg-[#1A2333] text-[#00E5BE]"
                      : "text-gray-400 hover:text-white hover:bg-[#1A2333]"
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                  {item.hasSubmenu && (
                    <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Circle className="h-3 w-3 text-green-500 fill-green-500 animate-pulse" />
          <span className="text-gray-400">System Online</span>
        </div>
      </nav>
    </div>
  );
};

export default TopNavigation;