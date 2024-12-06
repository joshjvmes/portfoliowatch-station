import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { time: "00:00", price: 1.2 },
  { time: "04:00", price: 1.4 },
  { time: "08:00", price: 1.3 },
  { time: "12:00", price: 1.5 },
  { time: "16:00", price: 1.4 },
  { time: "20:00", price: 1.6 },
  { time: "24:00", price: 1.7 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">$ROK Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00E5BE]">$1.70</div>
            <div className="text-green-400">+5.2%</div>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="time" stroke="#4B5563" />
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
                    dataKey="price"
                    stroke="#00E5BE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00E5BE]">$12,450.00</div>
            <div className="text-green-400">+2.5%</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00E5BE]">$5,280.00</div>
            <div className="text-gray-400">Ready to trade</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;