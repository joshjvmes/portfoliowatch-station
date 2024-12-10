import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { BalanceVisibilityProvider } from "@/contexts/BalanceVisibilityContext";

// Pages
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";
import TradingSignals from "@/pages/TradingSignals";
import Holdings from "@/pages/Holdings";
import Orders from "@/pages/Orders";
import History from "@/pages/History";
import Messages from "@/pages/Messages";
import Deposit from "@/pages/Deposit";
import Withdrawal from "@/pages/Withdrawal";
import VirtualCard from "@/pages/VirtualCard";
import WalletManagement from "@/pages/WalletManagement";
import PortfolioMargin from "@/pages/PortfolioMargin";
import TradingBots from "@/pages/TradingBots";
import Wheel from "@/pages/Wheel";
import Rewards from "@/pages/Rewards";
import Settings from "@/pages/Settings";
import SystemStatus from "@/pages/SystemStatus";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <BalanceVisibilityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/trading-signals" element={<TradingSignals />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/history" element={<History />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/virtual-card" element={<VirtualCard />} />
          <Route path="/wallet" element={<WalletManagement />} />
          <Route path="/portfolio-margin" element={<PortfolioMargin />} />
          <Route path="/trading-bots" element={<TradingBots />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </BalanceVisibilityProvider>
  );
};

export default App;