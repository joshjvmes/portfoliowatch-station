import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1221] p-4">
      <Card className="w-full max-w-[500px] bg-[#0B1221]/50 border border-white/10 backdrop-blur-xl">
        <CardHeader>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 text-lg">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#00E5BE',
                    brandAccent: '#00E5BE',
                    brandButtonText: '#0B1221',
                    defaultButtonBackground: '#1A2333',
                    defaultButtonBackgroundHover: '#243044',
                    inputBackground: '#0B1221',
                    inputBorder: '#1A2333',
                    inputBorderHover: '#243044',
                    inputBorderFocus: '#00E5BE',
                  },
                  space: {
                    buttonPadding: '16px',
                    inputPadding: '16px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    buttonBorderRadius: '12px',
                    inputBorderRadius: '12px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                  },
                },
              },
              className: {
                container: 'space-y-6',
                label: 'text-white text-lg font-medium block mb-2',
                input: 'w-full bg-[#0B1221] border border-[#1A2333] text-white placeholder-gray-400 text-lg',
                button: 'w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-[#0B1221] font-medium text-lg',
                anchor: 'text-[#00E5BE] hover:text-[#00E5BE]/90',
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