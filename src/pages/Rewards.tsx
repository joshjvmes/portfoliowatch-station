import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Copy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const rewardTiers = [
  {
    name: "Bronze",
    earnings: "0 - 1,000",
    commission: "10%",
    benefits: ["Basic Support", "Standard API Access"],
    color: "#CD7F32"
  },
  {
    name: "Silver",
    earnings: "1,000 - 5,000",
    commission: "15%",
    benefits: ["Priority Support", "Advanced API Access", "Monthly Webinars"],
    color: "#C0C0C0"
  },
  {
    name: "Gold",
    earnings: "5,000 - 20,000",
    commission: "20%",
    benefits: ["24/7 Support", "Premium API Access", "Weekly Webinars", "Custom Alerts"],
    color: "#FFD700"
  },
  {
    name: "Platinum",
    earnings: "20,000 - 50,000",
    commission: "25%",
    benefits: ["Dedicated Account Manager", "VIP Support", "Custom Solutions", "Priority Features"],
    color: "#E5E4E2"
  },
  {
    name: "Diamond",
    earnings: "50,000+",
    commission: "30%",
    benefits: ["Elite Support", "White-label Solutions", "Custom Development", "Direct Line Support", "Early Access"],
    color: "#B9F2FF"
  }
];

const Rewards = () => {
  const { toast } = useToast();
  const affiliateUrl = "https://trade.example.com/ref/USER123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateUrl);
    toast({
      title: "Copied to clipboard",
      description: "Your referral link has been copied!",
    });
  };

  return (
    <DashboardLayout>
      {/* Referral Stats Card */}
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Users className="h-6 w-6" />
            Your Referral Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-black/20">
              <p className="text-gray-400 text-sm">Total Referrals</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <div className="p-4 rounded-lg bg-black/20">
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-white">$1,234.56</p>
            </div>
            <div className="p-4 rounded-lg bg-black/20">
              <p className="text-gray-400 text-sm">Current Tier</p>
              <p className="text-2xl font-bold text-white">Silver</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white text-sm">Share your referral link</p>
            <div className="flex gap-2">
              <Input 
                value={affiliateUrl}
                readOnly
                className="bg-black/20 border-white/10 text-white"
              />
              <Button 
                onClick={copyToClipboard}
                variant="secondary"
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reward Tiers */}
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Reward Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {rewardTiers.map((tier, index) => (
              <div 
                key={tier.name}
                className="p-4 rounded-lg bg-black/20 border border-white/5"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: tier.color }}>
                      {tier.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      ${tier.earnings} referred user earnings
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{tier.commission}</p>
                    <p className="text-gray-400 text-sm">Commission Rate</p>
                  </div>
                </div>
                
                <Progress 
                  value={((index + 1) * 20)} 
                  className="h-2 mb-4"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '--progress-background': tier.color 
                  } as any}
                />

                <div className="grid grid-cols-2 gap-2">
                  {tier.benefits.map((benefit, i) => (
                    <div 
                      key={i}
                      className="text-sm text-gray-300 bg-black/30 rounded px-3 py-2"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Rewards;