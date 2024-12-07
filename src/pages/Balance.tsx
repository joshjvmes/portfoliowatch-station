import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Bitcoin, Ethereum } from "lucide-react";

const mockBalanceHistory = [
  { date: "Jan", balance: 5000 },
  { date: "Feb", balance: 7500 },
  { date: "Mar", balance: 6800 },
  { date: "Apr", balance: 9200 },
  { date: "May", balance: 8400 },
  { date: "Jun", balance: 11000 },
];

const depositOptions = [
  {
    name: "Ethereum",
    icon: <Ethereum className="h-8 w-8" />,
    description: "Deposit using ETH",
  },
  {
    name: "Bitcoin",
    icon: <Bitcoin className="h-8 w-8" />,
    description: "Deposit using BTC",
  },
  {
    name: "Polygon",
    imageSrc: "/lovable-uploads/f681b13b-e242-4932-a6fc-36ea5ab403b4.png",
    description: "Deposit using MATIC",
  },
  {
    name: "More Options",
    description: "+20 more chains available",
    isMore: true,
  },
];

const Balance = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2563EB]">$11,000.00</div>
            <div className="text-green-400">+15.2% this month</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Available for Trading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2563EB]">$8,500.00</div>
            <div className="text-gray-400">Ready to trade</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Balance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockBalanceHistory}>
                  <XAxis dataKey="date" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2333",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#2563EB"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Deposit Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {depositOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                >
                  {option.isMore ? (
                    <div className="text-2xl font-bold text-white">+20</div>
                  ) : option.icon ? (
                    option.icon
                  ) : (
                    <img
                      src={option.imageSrc}
                      alt={option.name}
                      className="h-8 w-8 object-contain"
                    />
                  )}
                  <div className="text-sm font-medium text-white">{option.name}</div>
                  <div className="text-xs text-gray-400">{option.description}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Balance;