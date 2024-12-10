import { TradingSettings } from './trading';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Articles: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          id: number
          paragraph: string | null
          subtitle: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          id?: number
          paragraph?: string | null
          subtitle?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          id?: number
          paragraph?: string | null
          subtitle?: string | null
          title?: string | null
          url?: string | null
        }
      }
      Contact: {
        Row: {
          created_at: string
          email: string | null
          id: number
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
      }
      trading_settings: {
        Row: TradingSettings
        Insert: Omit<TradingSettings, 'id' | 'created_at'>
        Update: Partial<Omit<TradingSettings, 'id' | 'created_at'>>
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          role: string | null
          user_type: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          role?: string | null
          user_type?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          role?: string | null
          user_type?: string
          username?: string | null
        }
      }
    }
  }
}