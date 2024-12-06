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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>$ROK Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.70</div>
            <div className="text-success">+5.2%</div>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563EB"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
            <div className="text-success">+2.5%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,280.00</div>
            <div className="text-muted-foreground">Ready to trade</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;