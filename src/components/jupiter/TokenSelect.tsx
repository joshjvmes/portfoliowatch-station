import { TOKENS } from '@/utils/tokens';

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export const TokenSelect = ({ value, onChange, label }: TokenSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-[#1A2333] border border-[#2A3441] rounded text-white"
      >
        {TOKENS.map((token) => (
          <option key={token.mint} value={token.mint}>
            {token.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};