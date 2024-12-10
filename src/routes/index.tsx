import { Navigate } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";
import Index from "@/pages/Index";
import Wheel from "@/pages/Wheel";
import Holdings from "@/pages/Holdings";
import { History } from "@/pages/History";
import Messages from "@/pages/Messages";
import Deposit from "@/pages/Deposit";
import Withdrawal from "@/pages/Withdrawal";
import Assets from "@/pages/Assets";
import PortfolioMargin from "@/pages/PortfolioMargin";
import Orders from "@/pages/Orders";
import Rewards from "@/pages/Rewards";
import TradingBots from "@/pages/TradingBots";
import SystemStatus from "@/pages/SystemStatus";
import VirtualCard from "@/pages/VirtualCard";
import Settings from "@/pages/Settings";
import TradingSignals from "@/pages/TradingSignals";
import NotFound from "@/pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><UserDashboard /></PrivateRoute>
  },
  {
    path: "/wheel",
    element: <PrivateRoute><Wheel /></PrivateRoute>
  },
  {
    path: "/holdings",
    element: <PrivateRoute><Holdings /></PrivateRoute>
  },
  {
    path: "/history",
    element: <PrivateRoute><History /></PrivateRoute>
  },
  {
    path: "/messages",
    element: <PrivateRoute><Messages /></PrivateRoute>
  },
  {
    path: "/deposit",
    element: <PrivateRoute><Deposit /></PrivateRoute>
  },
  {
    path: "/withdrawal",
    element: <PrivateRoute><Withdrawal /></PrivateRoute>
  },
  {
    path: "/assets",
    element: <PrivateRoute><Assets /></PrivateRoute>
  },
  {
    path: "/portfolio-margin",
    element: <PrivateRoute><PortfolioMargin /></PrivateRoute>
  },
  {
    path: "/orders",
    element: <PrivateRoute><Orders /></PrivateRoute>
  },
  {
    path: "/rewards",
    element: <PrivateRoute><Rewards /></PrivateRoute>
  },
  {
    path: "/trading-bots",
    element: <PrivateRoute><TradingBots /></PrivateRoute>
  },
  {
    path: "/system-status",
    element: <PrivateRoute><SystemStatus /></PrivateRoute>
  },
  {
    path: "/virtual-card",
    element: <PrivateRoute><VirtualCard /></PrivateRoute>
  },
  {
    path: "/settings",
    element: <PrivateRoute><Settings /></PrivateRoute>
  },
  {
    path: "/trading-signals",
    element: <PrivateRoute><TradingSignals /></PrivateRoute>
  },
  {
    path: "*",
    element: <NotFound />
  }
];