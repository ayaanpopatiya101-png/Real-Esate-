/*
  # Real Estate Platform Database Schema

  ## Overview
  Creates a comprehensive database schema for a real estate platform inspired by Keller Williams Command.

  ## New Tables

  ### 1. agents
  - `id` (uuid, primary key) - Unique agent identifier
  - `email` (text, unique) - Agent email address
  - `full_name` (text) - Agent full name
  - `phone` (text) - Contact phone number
  - `bio` (text) - Agent biography
  - `photo_url` (text) - Profile photo URL
  - `license_number` (text) - Real estate license number
  - `specialties` (text[]) - Agent specialties (buyer, seller, commercial, etc.)
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. properties
  - `id` (uuid, primary key) - Unique property identifier
  - `agent_id` (uuid, foreign key) - Associated agent
  - `title` (text) - Property title
  - `description` (text) - Property description
  - `address` (text) - Street address
  - `city` (text) - City name
  - `state` (text) - State/Province
  - `zip_code` (text) - Postal code
  - `price` (decimal) - Listing price
  - `bedrooms` (integer) - Number of bedrooms
  - `bathrooms` (decimal) - Number of bathrooms
  - `square_feet` (integer) - Property size
  - `lot_size` (decimal) - Lot size in acres
  - `property_type` (text) - Type (residential, commercial, land, etc.)
  - `status` (text) - Listing status (active, pending, sold)
  - `year_built` (integer) - Year of construction
  - `images` (text[]) - Array of image URLs
  - `features` (text[]) - Property features/amenities
  - `created_at` (timestamptz) - Listing creation date
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. leads
  - `id` (uuid, primary key) - Unique lead identifier
  - `property_id` (uuid, foreign key, nullable) - Related property
  - `agent_id` (uuid, foreign key, nullable) - Assigned agent
  - `full_name` (text) - Lead full name
  - `email` (text) - Lead email
  - `phone` (text) - Lead phone number
  - `message` (text) - Inquiry message
  - `lead_type` (text) - Type (property_inquiry, general_inquiry, valuation)
  - `status` (text) - Lead status (new, contacted, qualified, closed)
  - `created_at` (timestamptz) - Lead creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for active properties
  - Agents can manage their own properties
  - Leads are restricted to assigned agents
  - Agents can view and update their own profiles

  ## Indexes
  - Property search optimization (city, state, price, status)
  - Agent lookup optimization
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  bio text,
  photo_url text,
  license_number text,
  specialties text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  price decimal NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms decimal DEFAULT 0,
  square_feet integer,
  lot_size decimal,
  property_type text DEFAULT 'residential',
  status text DEFAULT 'active',
  year_built integer,
  images text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  lead_type text DEFAULT 'general_inquiry',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents table
CREATE POLICY "Anyone can view agent profiles"
  ON agents FOR SELECT
  USING (true);

CREATE POLICY "Agents can update own profile"
  ON agents FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for properties table
CREATE POLICY "Anyone can view active properties"
  ON properties FOR SELECT
  USING (status = 'active' OR status = 'pending');

CREATE POLICY "Agents can insert own properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = agent_id)
  WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (auth.uid() = agent_id);

-- RLS Policies for leads table
CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Agents can view assigned leads"
  ON leads FOR SELECT
  TO authenticated
  USING (auth.uid() = agent_id);

CREATE POLICY "Agents can update assigned leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (auth.uid() = agent_id)
  WITH CHECK (auth.uid() = agent_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_agent ON properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_leads_agent ON leads(agent_id);
CREATE INDEX IF NOT EXISTS idx_leads_property ON leads(property_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);