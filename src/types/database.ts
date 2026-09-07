/**
 * Tipos de la base de datos de Supabase, escritos a mano para coincidir con
 * supabase/migrations/20260907000000_init.sql.
 *
 * Cuando el proyecto de Supabase este creado, regenerar con:
 *   npm run db:types
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type QuoteStatus =
  | "new"
  | "reviewing"
  | "quoted"
  | "won"
  | "lost"
  | "archived";

export type AppRole = "staff" | "admin";

export type QuoteRequestRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: QuoteStatus;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  pickup_city: string;
  pickup_state: string;
  delivery_city: string;
  delivery_state: string;
  pickup_date: string;
  freight_type: string;
  pallets: number | null;
  weight_lbs: number | null;
  notes: string | null;
  source: string;
  internal_notes: string | null;
};

export type QuoteRequestInsert = Omit<
  QuoteRequestRow,
  "id" | "created_at" | "updated_at" | "status" | "source" | "internal_notes"
> & {
  id?: string;
  status?: QuoteStatus;
  source?: string;
};

export type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      quote_requests: {
        Row: QuoteRequestRow;
        Insert: QuoteRequestInsert;
        Update: Partial<QuoteRequestRow>;
        Relationships: [];
      };
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "created_at"> & { created_at?: string };
        Update: Partial<Pick<ProfileRow, "full_name">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_staff: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      quote_status: QuoteStatus;
      app_role: AppRole;
    };
    CompositeTypes: Record<string, never>;
  };
};
