import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  History,
  CreditCard,
  Bot,
  MessageCircle,
  ArrowDownLeft,
  LogOut,
  Settings,
  ArrowUp,
  LineChart
} from "lucide-react";

const SideNavigation = () => {
  const location = useLocation();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
    { name: "Deposit", icon: ArrowUp, route: "/deposit" },
    { name: "History", icon: History, route: "/history" },
    { name: "Virtual Card", icon: CreditCard, route: "/virtual-card" },
    { name: "Messages", icon: MessageCircle, route: "/messages" },
    { name: "Trading Bots", icon: Bot, route: "/trading-bots" },
    { name: "Trading Signals", icon: LineChart, route: "/trading-signals" },
    { name: "Withdrawal", icon: ArrowDownLeft, route: "/withdrawal" },
  ];

  return (
    <div className="w-64 bg-[#0B1221] border-r border-white/10 p-4 flex flex-col h-full">
      <nav className="space-y-2 flex-1">
        {navigationItems.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors",
              isActiveRoute(item.route) &&
                "text-white bg-white/5 font-medium"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;