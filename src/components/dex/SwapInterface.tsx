import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SwapInterface = () => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Token Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-400">
          DEX functionality is temporarily disabled. Coming back soon!
        </p>
      </CardContent>
    </Card>
  );
};

export default SwapInterface;