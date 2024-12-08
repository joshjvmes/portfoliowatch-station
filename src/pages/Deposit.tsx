import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, CreditCard, Building2 } from "lucide-react";
import { BalanceCards } from "@/components/deposit/BalanceCards";
import { CryptoDeposit } from "@/components/deposit/CryptoDeposit";
import { CardDeposit } from "@/components/deposit/CardDeposit";
import { WireDeposit } from "@/components/deposit/WireDeposit";
import { ACHDeposit } from "@/components/deposit/ACHDeposit";

const DepositContent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <BalanceCards />
      
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-[#00E5BE]">
            Deposit Funds
          </CardTitle>
          <CardDescription className="text-gray-400">
            Choose your preferred deposit method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crypto" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-[#1A2333]">
              <TabsTrigger value="crypto" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <Wallet className="mr-2 h-4 w-4" />
                Crypto
              </TabsTrigger>
              <TabsTrigger value="card" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </TabsTrigger>
              <TabsTrigger value="wire" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <Building2 className="mr-2 h-4 w-4" />
                Wire
              </TabsTrigger>
              <TabsTrigger value="ach" className="data-[state=active]:bg-[#00E5BE] data-[state=active]:text-black">
                <CreditCard className="mr-2 h-4 w-4" />
                ACH
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto">
              <CryptoDeposit />
            </TabsContent>

            <TabsContent value="card">
              <CardDeposit />
            </TabsContent>

            <TabsContent value="wire">
              <WireDeposit />
            </TabsContent>

            <TabsContent value="ach">
              <ACHDeposit />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const Deposit = () => {
  return (
    <DashboardLayout>
      <DepositContent />
    </DashboardLayout>
  );
};

export default Deposit;