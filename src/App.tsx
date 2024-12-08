import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { BalanceVisibilityProvider } from "@/contexts/BalanceVisibilityContext";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <Router>
      <BalanceVisibilityProvider>
        <Toaster />
        <Dashboard />
      </BalanceVisibilityProvider>
    </Router>
  );
}

export default App;
