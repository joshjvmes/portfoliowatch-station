import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1221] p-4">
      <Card className="max-w-2xl mx-auto bg-[#0B1221]/50 border-white/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-white">User Dashboard</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Welcome to the demo dashboard. More features coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;