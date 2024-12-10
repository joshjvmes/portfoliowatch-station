import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";

const steps = [
  {
    title: "Welcome to Our Platform",
    content: "Experience the future of trading with our advanced platform. Let's get you started with a quick tour.",
  },
  {
    title: "Choose Your Path",
    content: "Are you here to manage and oversee operations, or to explore and trade on our platform?",
    choices: [
      { label: "Administrator", value: "admin", description: "Manage users and platform operations" },
      { label: "Trader", value: "user", description: "Access trading features and portfolio management" },
    ],
  },
  {
    title: "Ready to Begin",
    content: "Great! Let's create your account and get started.",
  },
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string>("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // If admin, go to login, if trader go to register
      if (selectedType === "admin") {
        navigate("/login");
      } else {
        navigate("/register");
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1221] via-[#0d1829] to-[#0B1221] p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Card className="w-full max-w-[600px] bg-[#0B1221]/30 border border-white/10 backdrop-blur-xl relative">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-gray-400">{currentStepData.content}</p>
            </div>

            {currentStepData.choices && (
              <div className="grid gap-4 pt-4">
                {currentStepData.choices.map((choice) => (
                  <button
                    key={choice.value}
                    onClick={() => setSelectedType(choice.value)}
                    className={`p-4 rounded-lg border ${
                      selectedType === choice.value
                        ? "border-[#2563EB] bg-[#2563EB]/10"
                        : "border-white/10 hover:border-white/20"
                    } text-left transition-all`}
                  >
                    <div className="font-medium text-white">{choice.label}</div>
                    <div className="text-sm text-gray-400">{choice.description}</div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-white/10"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedType}
                className="bg-[#2563EB] hover:bg-[#2563EB]/80"
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWizard;