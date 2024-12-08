import { Shield, ArrowRight } from "lucide-react";

interface SecurityInfoProps {
  title: string;
  items: string[];
}

export const SecurityInfo = ({ title, items }: SecurityInfoProps) => {
  return (
    <div className="bg-[#1A2333]/50 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 text-[#00E5BE]">
        <Shield className="h-5 w-5" />
        <h3 className="font-medium">{title}</h3>
      </div>
      <ul className="mt-2 space-y-1 text-sm text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#00E5BE]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};