import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

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
      <Card className="w-full max-w-md bg-[#0F172A]/50 border-[#1E293B] backdrop-blur-sm">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-8">Enter your credentials to access your account</p>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#38BDF8',
                    brandAccent: '#0EA5E9',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#38BDF8',
                    defaultButtonBackgroundHover: '#0EA5E9',
                    inputBackground: '#1E293B',
                    inputBorder: '#1E293B',
                    inputBorderHover: '#38BDF8',
                    inputBorderFocus: '#38BDF8',
                    inputText: 'white',
                    inputLabelText: 'white',
                    inputPlaceholder: '#64748B',
                  },
                  space: {
                    labelBottomMargin: '8px',
                    anchorBottomMargin: '4px',
                    inputPadding: '12px',
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
                  fontSizes: {
                    baseInputSize: '14px',
                    baseButtonSize: '14px',
                    baseLabelSize: '14px',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                label: 'text-white font-medium',
                button: 'w-full py-3 font-medium transition-colors',
                input: 'w-full bg-[#1E293B] border border-[#1E293B] text-white placeholder-gray-500',
                anchor: 'text-[#38BDF8] hover:text-[#0EA5E9] transition-colors',
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;