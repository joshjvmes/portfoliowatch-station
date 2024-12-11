import { Input } from "@/components/ui/input";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export const AmountInput = ({ value, onChange, label }: AmountInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.00"
        className="bg-[#1A2333] border-[#2A3441]"
      />
    </div>
  );
};