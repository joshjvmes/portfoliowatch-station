import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and redirect accordingly
    const isAuthenticated = false; // This will be replaced with actual auth check
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1221]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00E5BE] border-r-2 mx-auto mb-4"></div>
        <p className="text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Index;