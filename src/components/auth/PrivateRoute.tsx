import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Bolt } from "lucide-react";
import { toast } from "sonner";
import { AuthError, Session } from "@supabase/supabase-js";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session initialization error:", error);
          setSession(null);
        } else {
          setSession(session);
        }
      } catch (error) {
        console.error("Session error:", error);
        toast.error("Authentication error. Please try logging in again.");
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1221]">
        <div className="flex flex-col items-center gap-4">
          <Bolt className="w-12 h-12 text-blue-500 animate-pulse" />
          <p className="text-blue-500 animate-fade-in">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;