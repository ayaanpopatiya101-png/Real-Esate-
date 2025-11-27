export interface Brokerage {
  id: string;
  name: string;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  brokerage_id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  license_number?: string;
  photo_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  brokerage_id: string;
  role_name?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface ContactSource {
  id: string;
  name: string;
  description?: string;
}

export interface Contact {
  id: string;
  user_id: string;
  brokerage_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  tags?: string[];
  source?: string;
  status: 'lead' | 'client' | 'past_client' | 'sphere_of_influence';
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  contact_id: string;
  user_id: string;
  brokerage_id: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  score: number;
  pipeline_stage: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  brokerage_id: string;
  property_address: string;
  buyer_name?: string;
  seller_name?: string;
  purchase_price: number;
  commission_rate: number;
  status: string;
  contract_date?: string;
  closing_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  lead_id?: string;
  transaction_id?: string;
  title: string;
  description?: string;
  due_date: string;
  completed: boolean;
  task_type: 'call' | 'email' | 'showing' | 'followup' | 'other';
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  contact_id?: string;
  lead_id?: string;
  transaction_id?: string;
  action: string;
  notes?: string;
  created_at: string;
}

export interface PropertyFilters {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
}
