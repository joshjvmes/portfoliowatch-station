import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return <OnboardingWizard />;
};

export default Index;