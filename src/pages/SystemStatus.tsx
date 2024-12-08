import DashboardLayout from "@/components/DashboardLayout";
import { Circle } from "lucide-react";

const SystemStatus = () => {
  const chains = [
    { name: "Aptos", status: "online" },
    { name: "Arbitrum One", status: "online" },
    { name: "Arbitrum Nova", status: "online" },
    { name: "Astar zkEVM", status: "online" },
    { name: "Avalanche", status: "online" },
    { name: "Base", status: "online" },
    { name: "BSC", status: "maintenance" },
    { name: "Chiliz", status: "online" },
    { name: "Ethereum", status: "online" },
    { name: "Optimism", status: "online" },
    { name: "Polygon", status: "online" },
    { name: "Kava", status: "online" },
    { name: "Sei", status: "online" },
    { name: "Solana", status: "online" },
    { name: "Shape", status: "online" },
    { name: "SKALE", status: "online" },
    { name: "Sui", status: "maintenance" },
    { name: "Xai", status: "online" },
    { name: "Zora", status: "online" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-2xl font-semibold text-white">System Status</h2>
          <p className="text-gray-400 mt-1">
            Current status of supported blockchain networks
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chains.map((chain) => (
            <div
              key={chain.name}
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-[#1A2333]"
            >
              <span className="text-white">{chain.name}</span>
              <div className="flex items-center gap-2">
                <Circle
                  className={`h-3 w-3 ${
                    chain.status === "online"
                      ? "text-green-500 fill-green-500 animate-pulse"
                      : "text-yellow-500 fill-yellow-500"
                  }`}
                />
                <span
                  className={
                    chain.status === "online"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {chain.status === "online" ? "Online" : "Maintenance"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemStatus;