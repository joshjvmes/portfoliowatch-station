import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TourProvider } from "@/contexts/TourContext";
import { TourTooltip } from "@/components/tour/TourTooltip";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Holdings from "./pages/Holdings";
import History from "./pages/History";
import Messages from "./pages/Messages";
import Withdrawal from "./pages/Withdrawal";
import Assets from "./pages/Assets";
import PortfolioMargin from "./pages/PortfolioMargin";
import Orders from "./pages/Orders";
import Rewards from "./pages/Rewards";
import TradingBots from "./pages/TradingBots";
import SystemStatus from "./pages/SystemStatus";
import NotFound from "./pages/NotFound";
import Deposit from "./pages/Deposit";
import VirtualCard from "./pages/VirtualCard";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <TourProvider>
          <Toaster />
          <Sonner />
          <TourTooltip />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/holdings"
              element={
                <PrivateRoute>
                  <Holdings />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <PrivateRoute>
                  <Messages />
                </PrivateRoute>
              }
            />
            <Route
              path="/deposit"
              element={
                <PrivateRoute>
                  <Deposit />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdrawal"
              element={
                <PrivateRoute>
                  <Withdrawal />
                </PrivateRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <PrivateRoute>
                  <Assets />
                </PrivateRoute>
              }
            />
            <Route
              path="/portfolio-margin"
              element={
                <PrivateRoute>
                  <PortfolioMargin />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/rewards"
              element={
                <PrivateRoute>
                  <Rewards />
                </PrivateRoute>
              }
            />
            <Route
              path="/trading-bots"
              element={
                <PrivateRoute>
                  <TradingBots />
                </PrivateRoute>
              }
            />
            <Route
              path="/system-status"
              element={
                <PrivateRoute>
                  <SystemStatus />
                </PrivateRoute>
              }
            />
            <Route
              path="/virtual-card"
              element={
                <PrivateRoute>
                  <VirtualCard />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TourProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;