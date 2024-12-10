import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOKENS } from "@/utils/tokens";

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  selectedToken: string;
  disabled?: boolean;
}

export const TokenInput = ({
  label,
  value,
  onChange,
  onTokenChange,
  selectedToken,
  disabled = false,
}: TokenInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm text-gray-400">{label}</label>
        <Select value={selectedToken} onValueChange={onTokenChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {TOKENS.map((token) => (
              <SelectItem key={token.mint} value={token.mint}>
                {token.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input
        type="number"
        placeholder="0.0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};