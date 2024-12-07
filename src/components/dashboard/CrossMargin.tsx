import { Card, CardContent } from "@/components/ui/card";

const CrossMargin = () => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-white font-semibold border-b-2 border-yellow-400 pb-2">Cross Margin</div>
            <div className="text-gray-400">USD⚡-M</div>
            <div className="text-gray-400">COIN-M</div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-gray-400 mb-2">Total Balance (USD)</div>
              <div className="text-xl font-semibold text-white">59,772.01</div>
              <div className="text-gray-400">≈ $59,772.01</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Total Debt (USD)</div>
              <div className="text-xl font-semibold text-white">0.00</div>
              <div className="text-gray-400">≈ $0.00</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Account Equity (USD)</div>
              <div className="text-xl font-semibold text-white">59,772.01</div>
              <div className="text-gray-400">≈ $59,772.01</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Today's PNL</div>
              <div className="text-xl font-semibold text-white">0.00</div>
              <div className="text-gray-400">≈ $0.00</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossMargin;