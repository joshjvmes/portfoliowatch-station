import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1221] via-[#0d1829] to-[#0B1221] p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Card className="w-full max-w-[400px] bg-[#0B1221]/30 border border-white/10 backdrop-blur-xl shadow-[0_0_15px_rgba(0,229,190,0.1)] relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-transparent pointer-events-none rounded-2xl" />
        <CardHeader className="relative pb-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent mb-1">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="relative pt-0">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563EB',
                    brandAccent: '#1E40AF',
                    brandButtonText: '#0B1221',
                    defaultButtonBackground: '#1A2333',
                    defaultButtonBackgroundHover: '#243044',
                    inputBackground: '#1A2333',
                    inputBorder: '#2A3441',
                    inputBorderHover: '#3A4451',
                    inputBorderFocus: '#2563EB',
                    inputText: 'white',
                  },
                  space: {
                    buttonPadding: '10px',
                    inputPadding: '10px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                  },
                },
              },
              className: {
                container: 'space-y-3',
                label: 'text-white text-xs font-medium block mb-1',
                input: 'w-full bg-[#1A2333] border border-[#2A3441] text-white placeholder-gray-400 text-sm transition-all duration-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20',
                button: 'w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#2563EB] text-[#0B1221] font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[#2563EB]/20 backdrop-blur-sm bg-opacity-80 border border-white/10',
                anchor: 'text-[#1E40AF] hover:text-[#2563EB] transition-colors duration-200 text-xs',
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
