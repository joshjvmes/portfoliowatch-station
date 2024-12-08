import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type TourStep = {
  target: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
};

type TourContextType = {
  isActive: boolean;
  currentStep: number;
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export const tourSteps: Record<string, TourStep[]> = {
  "/dashboard": [
    {
      target: "[data-tour='trading-chart']",
      title: "Trading Chart",
      content: "Monitor real-time market data and trading performance with our interactive chart.",
      placement: "bottom"
    },
    {
      target: "[data-tour='margin-balance']",
      title: "Margin Balance",
      content: "View your current margin balance and manage your trading positions.",
      placement: "left"
    },
    {
      target: "[data-tour='market-indicators']",
      title: "Market Indicators",
      content: "Track key market indicators like Fear & Greed Index and Market Volatility.",
      placement: "top"
    },
    {
      target: "[data-tour='ai-agent']",
      title: "AI Trading Agent",
      content: "Your personal AI trading assistant that helps manage and optimize your trades.",
      placement: "right"
    }
  ],
  "/deposit": [
    {
      target: "[data-tour='balance-cards']",
      title: "Account Balance",
      content: "View your current balance and available funds for trading.",
      placement: "bottom"
    },
    {
      target: "[data-tour='deposit-methods']",
      title: "Deposit Methods",
      content: "Choose from multiple secure deposit options including crypto, card, wire transfer, and ACH.",
      placement: "bottom"
    }
  ],
  "/withdrawal": [
    {
      target: "[data-tour='withdrawal-balance']",
      title: "Available for Withdrawal",
      content: "Check your available balance and 24-hour withdrawal limits.",
      placement: "bottom"
    },
    {
      target: "[data-tour='withdrawal-form']",
      title: "Withdrawal Form",
      content: "Select your preferred withdrawal method and enter the amount you wish to withdraw.",
      placement: "bottom"
    }
  ]
};

export const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Reset tour when route changes
    setIsActive(false);
    setCurrentStep(0);
  }, [location.pathname]);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    const maxSteps = tourSteps[location.pathname]?.length || 0;
    if (currentStep < maxSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      endTour();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <TourContext.Provider value={{
      isActive,
      currentStep,
      startTour,
      endTour,
      nextStep,
      previousStep
    }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};