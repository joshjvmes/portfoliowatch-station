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
      <Card className="w-full max-w-[800px] aspect-video bg-[#0F172A]/50 border-[#1E293B] backdrop-blur-sm rounded-[32px]">
        <div className="p-12 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Welcome back</h1>
          <p className="text-gray-400 mb-10 text-lg">Enter your credentials to access your account</p>
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
                    labelBottomMargin: '12px',
                    anchorBottomMargin: '8px',
                    inputPadding: '18px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '20px',
                    buttonBorderRadius: '20px',
                    inputBorderRadius: '20px',
                  },
                  fontSizes: {
                    baseInputSize: '16px',
                    baseButtonSize: '16px',
                    baseLabelSize: '16px',
                  },
                },
              },
              className: {
                container: 'space-y-8',
                label: 'text-white font-medium text-lg',
                button: 'w-full py-5 font-medium transition-colors rounded-3xl text-lg',
                input: 'w-full bg-[#1E293B] border border-[#1E293B] text-white placeholder-gray-500 rounded-3xl text-lg',
                anchor: 'text-[#38BDF8] hover:text-[#0EA5E9] transition-colors text-lg',
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