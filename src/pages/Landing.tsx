import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
              America's Premier<br />Crypto Trading Platform
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Buy Bitcoin, Ethereum, and 350+ cryptocurrencies
            </p>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-8 py-3 rounded-lg text-lg hover:from-[#1E40AF] hover:to-[#2563EB] transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>

          {/* App Preview */}
          <div className="max-w-md mx-auto mb-16">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
              alt="Trading Platform Interface"
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#1A2333] p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-[#00E5BE]">Secure Trading</h3>
              <p className="text-gray-400">Advanced security measures to protect your assets</p>
            </div>
            <div className="bg-[#1A2333] p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-[#00E5BE]">24/7 Support</h3>
              <p className="text-gray-400">Round-the-clock customer service and assistance</p>
            </div>
            <div className="bg-[#1A2333] p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-[#00E5BE]">Low Fees</h3>
              <p className="text-gray-400">Competitive trading fees and transparent pricing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;