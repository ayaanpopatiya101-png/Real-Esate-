import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    city: '',
    propertyType: '',
    priceRange: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.city) params.set('city', searchQuery.city);
    if (searchQuery.propertyType) params.set('propertyType', searchQuery.propertyType);
    if (searchQuery.priceRange) {
      const [min, max] = searchQuery.priceRange.split('-');
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">Find Your Dream Home</h1>
            <p className="hero-subtitle">
              Discover exceptional properties with expert guidance from our professional team
            </p>

            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-inputs">
                <input
                  type="text"
                  placeholder="City or Zip Code"
                  value={searchQuery.city}
                  onChange={(e) => setSearchQuery({ ...searchQuery, city: e.target.value })}
                  className="search-input"
                />
                <select
                  value={searchQuery.propertyType}
                  onChange={(e) => setSearchQuery({ ...searchQuery, propertyType: e.target.value })}
                  className="search-input"
                >
                  <option value="">Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                  <option value="luxury">Luxury</option>
                </select>
                <select
                  value={searchQuery.priceRange}
                  onChange={(e) => setSearchQuery({ ...searchQuery, priceRange: e.target.value })}
                  className="search-input"
                >
                  <option value="">Price Range</option>
                  <option value="0-250000">Under $250K</option>
                  <option value="250000-500000">$250K - $500K</option>
                  <option value="500000-750000">$500K - $750K</option>
                  <option value="750000-1000000">$750K - $1M</option>
                  <option value="1000000-">$1M+</option>
                </select>
                <button type="submit" className="search-button">Search Properties</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Elite Realty</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Expert Guidance</h3>
              <p>
                Our experienced agents provide personalized service and expert market insights
                to help you make informed decisions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">��</div>
              <h3>Extensive Listings</h3>
              <p>
                Access thousands of properties across multiple markets with our comprehensive
                database and advanced search tools.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Full Service</h3>
              <p>
                From initial search to closing, we handle every detail to ensure a smooth
                and successful transaction.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Market Intelligence</h3>
              <p>
                Stay ahead with real-time market data, trends analysis, and competitive
                pricing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Connect with one of our expert agents today and take the first step
              toward finding your perfect property.
            </p>
            <div className="cta-buttons">
              <button onClick={() => navigate('/properties')} className="btn-cta-primary">
                Browse Properties
              </button>
              <button onClick={() => navigate('/contact')} className="btn-cta-secondary">
                Contact an Agent
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
