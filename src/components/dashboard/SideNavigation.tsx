import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const SideNavigation = () => {
  return (
    <nav className="w-64 bg-[#0B1221] border-r border-white/10 p-4">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A2333] rounded-lg transition-colors"
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A2333] rounded-lg transition-colors"
      >
        Dashboard
      </Link>
      <Link
        to="/assets"
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A2333] rounded-lg transition-colors"
      >
        Assets
      </Link>
      <Link
        to="/holdings"
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A2333] rounded-lg transition-colors"
      >
        Holdings
      </Link>
      <Link
        to="/orders"
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A2333] rounded-lg transition-colors"
      >
        Orders
      </Link>
      <Link
        to="/web3"
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A2333] rounded-lg transition-colors"
      >
        <Wallet className="h-5 w-5" />
        Web3
      </Link>
    </nav>
  );
};

export default SideNavigation;
