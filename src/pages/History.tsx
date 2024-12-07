import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    validator: "Nocturnal Labs",
    type: "Buy",
    amount: "1,508,053.1181 DYDX",
    price: "$2.38",
    total: "$3,589,166.42",
    date: "2024-03-15",
    status: "Completed",
  },
  {
    id: 2,
    validator: "Frens Trading",
    type: "Sell",
    amount: "1,138,982.9548 DYDX",
    price: "$2.35",
    total: "$2,676,609.94",
    date: "2024-03-14",
    status: "Completed",
  },
  {
    id: 3,
    validator: "Alpha Capital",
    type: "Buy",
    amount: "2,508,053.1181 DYDX",
    price: "$2.41",
    total: "$6,044,408.01",
    date: "2024-03-13",
    status: "Completed",
  },
];

const History = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Trading History</h2>
            <p className="text-gray-400">View your recent trading activity</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 bg-[#1A2333] border-[#2A3441] text-white"
              />
            </div>
            <select className="bg-[#1A2333] border border-[#2A3441] rounded-md px-4 py-2 text-white text-sm">
              <option value="all">All Types</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <Card className="bg-[#0B1221]/50 border-[#2A3441] backdrop-blur-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-[#1A2333]">
                <TableRow className="border-b border-[#2A3441] hover:bg-transparent">
                  <TableHead className="text-gray-400">Validator</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Total</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b border-[#2A3441] hover:bg-[#1A2333]/50"
                  >
                    <TableCell className="font-medium text-white">
                      {transaction.validator}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {transaction.type === "Buy" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-400" />
                        )}
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            transaction.type === "Buy"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white">{transaction.amount}</TableCell>
                    <TableCell className="text-white">{transaction.price}</TableCell>
                    <TableCell className="text-white">{transaction.total}</TableCell>
                    <TableCell className="text-gray-400">{transaction.date}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;