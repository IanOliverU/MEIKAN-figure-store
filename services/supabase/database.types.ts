export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string;
          username: string;
          avatar_url: string | null;
          bio: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string;
          username?: string;
          avatar_url?: string | null;
          bio?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          username?: string;
          avatar_url?: string | null;
          bio?: string;
          email?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      shopping_preferences: {
        Row: {
          user_id: string;
          preferred_currency: 'PHP' | 'JPY';
          preferred_shipping_method: 'standard' | 'express';
          preferred_scales: string[];
          shipping_region: 'Philippines' | 'Japan' | 'Singapore' | 'United States';
          updated_at: string;
        };
        Insert: {
          user_id: string;
          preferred_currency?: 'PHP' | 'JPY';
          preferred_shipping_method?: 'standard' | 'express';
          preferred_scales?: string[];
          shipping_region?: 'Philippines' | 'Japan' | 'Singapore' | 'United States';
          updated_at?: string;
        };
        Update: {
          preferred_currency?: 'PHP' | 'JPY';
          preferred_shipping_method?: 'standard' | 'express';
          preferred_scales?: string[];
          shipping_region?: 'Philippines' | 'Japan' | 'Singapore' | 'United States';
          updated_at?: string;
        };
        Relationships: [];
      };
      notification_preferences: {
        Row: {
          id: string;
          user_id: string;
          push_enabled: boolean;
          email_enabled: boolean;
          wishlist_restock: boolean;
          preorder_closing: boolean;
          flash_sales: boolean;
          order_updates: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          push_enabled?: boolean;
          email_enabled?: boolean;
          wishlist_restock?: boolean;
          preorder_closing?: boolean;
          flash_sales?: boolean;
          order_updates?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          push_enabled?: boolean;
          email_enabled?: boolean;
          wishlist_restock?: boolean;
          preorder_closing?: boolean;
          flash_sales?: boolean;
          order_updates?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      app_preferences: {
        Row: {
          user_id: string;
          preferred_language: 'en' | 'fil' | 'ja';
          theme: 'dark';
          cache_size: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          preferred_language?: 'en' | 'fil' | 'ja';
          theme?: 'dark';
          cache_size?: string;
          updated_at?: string;
        };
        Update: {
          preferred_language?: 'en' | 'fil' | 'ja';
          theme?: 'dark';
          cache_size?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
