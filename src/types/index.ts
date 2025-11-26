export interface Agent {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  bio?: string;
  photo_url?: string;
  license_number?: string;
  specialties: string[];
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  agent_id?: string;
  title: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet?: number;
  lot_size?: number;
  property_type: string;
  status: string;
  year_built?: number;
  images: string[];
  features: string[];
  created_at: string;
  updated_at: string;
  agents?: Agent;
}

export interface Lead {
  id: string;
  property_id?: string;
  agent_id?: string;
  full_name: string;
  email: string;
  phone?: string;
  message?: string;
  lead_type: string;
  status: string;
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
