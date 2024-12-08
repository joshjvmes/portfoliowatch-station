import { useEffect, useState } from "react";
import { useFloating, offset, flip, shift, arrow } from "@floating-ui/react";
import { Button } from "@/components/ui/button";
import { useTour, tourSteps } from "@/contexts/TourContext";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

export const TourTooltip = () => {
  const { isActive, currentStep, nextStep, previousStep, endTour } = useTour();
  const location = useLocation();
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  
  const currentSteps = tourSteps[location.pathname] || [];
  const currentTourStep = currentSteps[currentStep];

  console.log('Tour Debug:', {
    isActive,
    currentStep,
    pathname: location.pathname,
    currentSteps: currentSteps.length,
    targetSelector: currentTourStep?.target
  });

  const { refs, floatingStyles, middlewareData } = useFloating({
    placement: currentTourStep?.placement || "bottom",
    middleware: [offset(10), flip(), shift()],
  });

  useEffect(() => {
    if (isActive && currentTourStep) {
      const element = document.querySelector(currentTourStep.target) as HTMLElement;
      console.log('Target element found:', Boolean(element), currentTourStep.target);
      setTargetElement(element);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isActive, currentStep, currentTourStep]);

  if (!isActive || !currentTourStep || !targetElement) {
    console.log('Tour not rendering because:', { 
      isActive, 
      hasCurrentStep: Boolean(currentTourStep),
      hasTargetElement: Boolean(targetElement)
    });
    return null;
  }

  const handleNext = () => {
    console.log('Handling next step:', currentStep, 'of', currentSteps.length - 1);
    nextStep();
  };

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="z-50 w-80 bg-[#0B1221]/50 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-4 animate-fade-in"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-white">{currentTourStep.title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-white/10"
          onClick={endTour}
        >
          <X className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
      <p className="text-gray-300 mb-4">{currentTourStep.content}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Step {currentStep + 1} of {currentSteps.length}
        </div>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 hover:bg-white/10 text-gray-300"
              onClick={previousStep}
            >
              Previous
            </Button>
          )}
          <Button
            size="sm"
            className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
            onClick={handleNext}
          >
            {currentStep === currentSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};