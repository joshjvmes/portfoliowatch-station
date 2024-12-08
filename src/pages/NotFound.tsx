import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Page not found. Redirecting to home...");
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Page not found</p>
      <Button onClick={() => navigate("/")}>
        Return Home
      </Button>
    </div>
  );
};

export default NotFound;