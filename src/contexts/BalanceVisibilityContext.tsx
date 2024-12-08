import React, { createContext, useContext, useState } from "react";

interface BalanceVisibilityContextType {
  showBalances: boolean;
  toggleBalances: () => void;
}

const BalanceVisibilityContext = createContext<BalanceVisibilityContextType>({
  showBalances: true,
  toggleBalances: () => {},
});

export const useBalanceVisibility = () => useContext(BalanceVisibilityContext);

export const BalanceVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showBalances, setShowBalances] = useState(true);

  const toggleBalances = () => {
    setShowBalances((prev) => !prev);
  };

  return (
    <BalanceVisibilityContext.Provider value={{ showBalances, toggleBalances }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
};