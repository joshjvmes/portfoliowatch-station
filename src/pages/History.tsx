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
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Trading History</h2>
            <p className="text-sm text-muted-foreground">View your recent trading activity</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 bg-[#1A2333]/50 border-white/10 text-white placeholder:text-muted-foreground w-full"
              />
            </div>
            <select className="bg-[#1A2333]/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm w-full sm:w-auto">
              <option value="all">All Types</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
        </div>

        <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl overflow-x-auto">
          <CardContent className="p-0">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Validator</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-muted-foreground">Price</TableHead>
                    <TableHead className="text-muted-foreground">Total</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="border-white/10 hover:bg-white/5"
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
                      <TableCell className="text-white font-medium">
                        {transaction.amount}
                      </TableCell>
                      <TableCell className="text-white">
                        {transaction.price}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {transaction.total}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.date}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;