import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B1221] text-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="text-[#00E5BE] text-2xl font-bold">$ROK</div>
        <div className="flex items-center gap-6">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={handleSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-[#00E5BE] text-6xl font-bold mb-6 leading-tight">
          Your Personal AI<br />Trading Command Center
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12">
          Join an exclusive community of 100,000 smart wallet holders leveraging
          institutional-grade AI arbitrage across 10 major cryptocurrencies
        </p>
        <Button 
          className="bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black font-semibold text-lg px-8 py-6 rounded-full"
        >
          Reserve Your Smart Wallet Now
        </Button>

        {/* Lightning Icon */}
        <div className="mt-32 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00E5BE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;