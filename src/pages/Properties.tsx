import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Properties.css';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet?: number;
  property_type: string;
  status: string;
  images: string[];
  created_at: string;
}

export default function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    propertyType: searchParams.get('propertyType') || ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select(`
          *,
          agents (
            full_name,
            phone,
            email,
            photo_url
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters.state) {
        query = query.eq('state', filters.state);
      }
      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }
      if (filters.bedrooms) {
        query = query.gte('bedrooms', parseInt(filters.bedrooms));
      }
      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="properties-page">
      <div className="properties-header">
        <div className="container">
          <h1>Find Your Perfect Property</h1>
          <p>Browse our extensive collection of available properties</p>
        </div>
      </div>

      <div className="container">
        <div className="properties-layout">
          <aside className="filters-sidebar">
            <h2>Filter Properties</h2>
            <form onSubmit={handleSearch} className="filters-form">
              <div className="filter-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>State</label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Min Price</label>
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Max Price</label>
                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <button type="submit" className="filter-button">Apply Filters</button>
            </form>
          </aside>

          <main className="properties-main">
            {loading ? (
              <div className="loading">Loading properties...</div>
            ) : properties.length === 0 ? (
              <div className="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <>
                <div className="results-header">
                  <p>{properties.length} properties found</p>
                </div>
                <div className="properties-grid">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="property-card"
                      onClick={() => navigate(`/properties/${property.id}`)}
                    >
                      <div className="property-image">
                        <img
                          src={property.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={property.title}
                        />
                        <div className="property-status">{property.status}</div>
                      </div>
                      <div className="property-details">
                        <div className="property-price">{formatPrice(property.price)}</div>
                        <h3 className="property-title">{property.title}</h3>
                        <p className="property-address">
                          {property.address}, {property.city}, {property.state}
                        </p>
                        <div className="property-specs">
                          <span>{property.bedrooms} Beds</span>
                          <span>{property.bathrooms} Baths</span>
                          {property.square_feet && (
                            <span>{property.square_feet.toLocaleString()} sqft</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
