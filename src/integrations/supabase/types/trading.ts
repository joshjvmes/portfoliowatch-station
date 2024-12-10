export interface TradingSettings {
  id: string;
  user_id: string;
  created_at: string;
  dex_name: string;
  slippage_tolerance: number;
  default_token_in?: string;
  default_token_out?: string;
}