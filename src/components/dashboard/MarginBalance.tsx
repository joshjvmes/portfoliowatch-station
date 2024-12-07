import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";

const MarginBalance = () => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-white">Margin Balance</h2>
              <Eye className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-yellow-400 text-black hover:bg-yellow-500">
                Change Mode
              </Button>
              <Button variant="outline" className="text-gray-400 border-white/10">
                Transfer
              </Button>
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-white">59,977.3129 <span className="text-gray-400">USD</span></div>
            <div className="flex items-center gap-2 text-gray-400 mt-1">
              ≈ $59,977.31 / Today's Realized PnL $0.00 (+0.00%) <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-white font-semibold">UniMMR</div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
              <span className="text-green-400 ml-2">999.99</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-gray-400 mb-2">Adjusted Equity (USD)</div>
              <div className="text-xl font-semibold text-white">59,853.3433</div>
              <div className="text-gray-400">≈ $59,853.34</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Available Balance (USD)</div>
              <div className="text-xl font-semibold text-white">59,853.3433</div>
              <div className="text-gray-400">≈ $59,853.34</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Initial Margin (USD)</div>
              <div className="text-xl font-semibold text-white">0.0000</div>
              <div className="text-gray-400">≈ $0.00</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-gray-400 mb-2">Maintenance Margin (USD)</div>
              <div className="text-xl font-semibold text-white">0.0000</div>
              <div className="text-gray-400">≈ $0.00</div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Total Debt (USD)</div>
              <div className="text-xl font-semibold text-white">0.0000</div>
              <div className="text-gray-400">≈ $0.00</div>
              <Button variant="ghost" className="text-gray-400 px-0 hover:bg-transparent hover:text-white">
                Auto Repay <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Unrealized PNL (USD)</div>
              <div className="text-xl font-semibold text-white">0.0000</div>
              <div className="text-gray-400">≈ $0.00</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarginBalance;