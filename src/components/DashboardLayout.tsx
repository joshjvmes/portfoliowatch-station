import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wallet,
  History,
  MessageSquare,
  LogOut,
  ArrowDownToLine,
  Home,
  Database,
  Coins,
  ScrollText,
  Gift,
  ChevronDown,
  Bot,
  Circle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sideNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Holdings", href: "/holdings", icon: Wallet },
    { name: "Trading Bots", href: "/trading-bots", icon: Bot },
    { name: "Withdrawal", href: "/withdrawal", icon: ArrowDownToLine },
    { name: "History", href: "/history", icon: History },
    { name: "Messages", href: "/messages", icon: MessageSquare },
  ];

  const topNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Assets", href: "/assets", icon: Database, hasSubmenu: true },
    { name: "Portfolio Margin", href: "/portfolio-margin", icon: Coins },
    { name: "Orders", href: "/orders", icon: ScrollText, hasSubmenu: true },
    { name: "Rewards Hub", href: "/rewards", icon: Gift },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast.error("Error logging out");
        return;
      }
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1221]">
      {/* Top Navigation */}
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

      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div className="w-64 bg-[#0B1221]/50 border-r border-white/10 backdrop-blur-xl">
          <div className="h-full flex flex-col">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-[#00E5BE]">$ROK Trading</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {sideNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start text-lg ${
                        isActive
                          ? "bg-[#1A2333] text-[#00E5BE]"
                          : "text-gray-400 hover:text-white hover:bg-[#1A2333]"
                      }`}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-gray-400 hover:text-white hover:bg-[#1A2333]"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;