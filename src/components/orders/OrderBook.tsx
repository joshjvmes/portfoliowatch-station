import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type Order = {
  id: string;
  price: number;
  amount: number;
  total: number;
  type: "buy" | "sell";
  timestamp: Date;
};

const OrderBook = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulate real-time order updates
  useEffect(() => {
    const generateOrder = (): Order => {
      const basePrice = 43250;
      const randomPrice = basePrice + (Math.random() - 0.5) * 100;
      const randomAmount = +(Math.random() * 2).toFixed(4);
      
      return {
        id: Math.random().toString(36).substring(7),
        price: +randomPrice.toFixed(2),
        amount: randomAmount,
        total: +(randomPrice * randomAmount).toFixed(2),
        type: Math.random() > 0.5 ? "buy" : "sell",
        timestamp: new Date(),
      };
    };

    // Add initial orders
    const initialOrders = Array.from({ length: 20 }, generateOrder);
    setOrders(initialOrders);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const newOrder = generateOrder();
        return [newOrder, ...prevOrders].slice(0, 20);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center justify-between">
          <span>Order Book</span>
          <Badge variant="outline" className="text-xs">
            BTC/USDT
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 text-sm text-muted-foreground pb-2 border-b border-white/10">
            <div>Price (USDT)</div>
            <div>Amount (BTC)</div>
            <div>Total (USDT)</div>
            <div>Time</div>
          </div>
          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-4 text-sm items-center hover:bg-white/5 rounded-lg transition-colors p-2"
              >
                <div className={`flex items-center gap-2 ${
                  order.type === "buy" ? "text-green-400" : "text-red-400"
                }`}>
                  {order.type === "buy" ? (
                    <ArrowUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4" />
                  )}
                  {order.price.toLocaleString()}
                </div>
                <div className="text-white">{order.amount}</div>
                <div className="text-muted-foreground">
                  {order.total.toLocaleString()}
                </div>
                <div className="text-muted-foreground">
                  {order.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderBook;