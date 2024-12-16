import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00E5BE] border-r-2 mx-auto"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;