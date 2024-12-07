import React from "react";

const HeroStats = () => {
  return (
    <div className="space-y-4 flex-1">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Trading Bots
      </h1>
      <p className="text-gray-400 max-w-2xl">
        Deploy bots for seamless crypto trading automation. Discover and replicate
        top strategies on our platform.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
        <div className="bg-[#1A2333]/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <p className="text-gray-400">Active Strategies</p>
          <p className="text-3xl font-bold text-[#00E5BE]">137,054</p>
        </div>
        <div className="bg-[#1A2333]/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <p className="text-gray-400">Total Value</p>
          <p className="text-3xl font-bold text-[#00E5BE]">$7,516,117,350.16</p>
        </div>
      </div>
    </div>
  );
};

export default HeroStats;