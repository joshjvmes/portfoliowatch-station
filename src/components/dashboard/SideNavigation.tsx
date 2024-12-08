import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wallet,
  History,
  MessageSquare,
  LogOut,
  ArrowDownToLine,
  Bot,
  Eye,
  EyeOff,
  PlusCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

const sideNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Holdings", href: "/holdings", icon: Wallet },
  { name: "Trading Bots", href: "/trading-bots", icon: Bot },
  { name: "Deposit", href: "/deposit", icon: PlusCircle },
  { name: "Withdrawal", href: "/withdrawal", icon: ArrowDownToLine },
  { name: "History", href: "/history", icon: History },
  { name: "Messages", href: "/messages", icon: MessageSquare },
];

const SideNavigation = () => {
  const location = useLocation();
  const { showBalances, toggleBalances } = useBalanceVisibility();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast.error("Error logging out");
        return;
      }
      toast.success("Logged out successfully");
      // No need to navigate manually - the auth state change listener in PrivateRoute will handle it
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="w-64 bg-[#0B1221]/50 border-r border-white/10 backdrop-blur-xl">
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#00E5BE]">$ROK Trading</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBalances}
            className="text-gray-400 hover:text-white hover:bg-[#1A2333]"
          >
            {showBalances ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </Button>
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
  );
};

export default SideNavigation;