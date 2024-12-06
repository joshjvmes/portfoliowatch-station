import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wallet,
  History,
  MessageSquare,
  LogOut,
  ArrowDownToLine,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Balance", href: "/balance", icon: Wallet },
    { name: "Withdrawal", href: "/withdrawal", icon: ArrowDownToLine },
    { name: "History", href: "/history", icon: History },
    { name: "Messages", href: "/messages", icon: MessageSquare },
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
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#0B1221]/50 border-r border-white/10 backdrop-blur-xl">
          <div className="h-full flex flex-col">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-[#00E5BE]">$ROK Trading</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
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