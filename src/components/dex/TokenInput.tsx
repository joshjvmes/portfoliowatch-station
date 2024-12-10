interface TokenInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  selectedToken: string;
  disabled?: boolean;
}

export const TokenInput = () => null;