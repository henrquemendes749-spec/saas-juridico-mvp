import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type User = {
  id: string;
  email: string;
  full_name: string;
  role: 'lawyer' | 'client';
  created_at: string;
  updated_at: string;
};

export type Client = {
  id: string;
  user_id?: string;
  lawyer_id: string;
  full_name: string;
  cpf_cnpj?: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
};

export type Process = {
  id: string;
  number: string;
  title: string;
  description?: string;
  status: 'active' | 'pending' | 'closed' | 'archived';
  client_id: string;
  lawyer_id: string;
  court?: string;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: string;
  process_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size?: number;
  summary?: string;
  uploaded_by: string;
  created_at: string;
};

export type Deadline = {
  id: string;
  process_id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'completed' | 'overdue';
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'deadline' | 'process' | 'document' | 'system';
  read: boolean;
  created_at: string;
};
