import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { toast } from "sonner";

interface BotCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

const BotCard = ({ id, title, icon: Icon, description, features }: BotCardProps) => {
  const handleCreateBot = (botId: string) => {
    toast.success(`Creating ${botId} bot...`);
  };

  return (
    <div className="bg-[#1A2333]/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4 hover:bg-[#242938] transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-[#00E5BE]" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-300 text-sm flex gap-2">
            <span className="text-[#00E5BE]">•</span>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        onClick={() => handleCreateBot(id)}
        className="w-full mt-4 border border-[#00E5BE] text-[#00E5BE] hover:bg-[#00E5BE] hover:text-black"
      >
        Create
      </Button>
    </div>
  );
};

export default BotCard;