import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

const mockTransactions = [
  {
    id: 1,
    type: "Buy",
    amount: "$2,500.00",
    tokens: "1,250 $ROK",
    date: "2024-03-15",
    status: "Completed",
  },
  {
    id: 2,
    type: "Sell",
    amount: "$1,800.00",
    tokens: "900 $ROK",
    date: "2024-03-14",
    status: "Completed",
  },
  {
    id: 3,
    type: "Buy",
    amount: "$3,200.00",
    tokens: "1,600 $ROK",
    date: "2024-03-13",
    status: "Completed",
  },
];

const History = () => {
  return (
    <DashboardLayout>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Trading History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-[#1A2333]">
                <tr>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Tokens</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-[#1A2333] hover:bg-[#1A2333]/50"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          transaction.type === "Buy"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{transaction.amount}</td>
                    <td className="px-6 py-4">{transaction.tokens}</td>
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default History;