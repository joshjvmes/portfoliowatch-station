import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import MarginHeader from "./margin/MarginHeader";
import MarginBalanceDisplay from "./margin/MarginBalanceDisplay";
import MarginStats from "./margin/MarginStats";

const MarginBalance = () => {
  const [mode, setMode] = useState<"Cross" | "Isolated">("Cross");

  const handleModeChange = () => {
    const newMode = mode === "Cross" ? "Isolated" : "Cross";
    setMode(newMode);
  };

  const handleTransfer = () => {
    // Transfer functionality coming soon
  };

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <MarginHeader 
            mode={mode}
            onModeChange={handleModeChange}
            onTransfer={handleTransfer}
          />
          <MarginBalanceDisplay />
          <MarginStats />
        </div>
      </CardContent>
    </Card>
  );
};

export default MarginBalance;