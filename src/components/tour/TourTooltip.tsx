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
      className="z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 animate-fade-in"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{currentTourStep.title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={endTour}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{currentTourStep.content}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {currentSteps.length}
        </div>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={previousStep}
            >
              Previous
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleNext}
          >
            {currentStep === currentSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};