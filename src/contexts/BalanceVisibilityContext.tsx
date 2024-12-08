import React, { createContext, useContext, useState } from "react";

interface BalanceVisibilityContextType {
  showBalances: boolean;
  toggleBalances: () => void;
}

const BalanceVisibilityContext = createContext<BalanceVisibilityContextType | undefined>(undefined);

export function BalanceVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [showBalances, setShowBalances] = useState(true);

  const toggleBalances = () => {
    setShowBalances(prev => !prev);
  };

  return (
    <BalanceVisibilityContext.Provider value={{ showBalances, toggleBalances }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
}

export function useBalanceVisibility() {
  const context = useContext(BalanceVisibilityContext);
  if (context === undefined) {
    throw new Error("useBalanceVisibility must be used within a BalanceVisibilityProvider");
  }
  return context;
}