import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Property } from '../types';
import './PropertyDetail.css';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          agents (
            id,
            full_name,
            phone,
            email,
            photo_url,
            bio
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const { error } = await supabase.from('leads').insert({
        property_id: id,
        agent_id: property?.agent_id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        lead_type: 'property_inquiry',
        status: 'new'
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ full_name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitStatus('error');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="loading-page">Loading property details...</div>;
  }

  if (!property) {
    return (
      <div className="error-page">
        <h2>Property not found</h2>
        <button onClick={() => navigate('/properties')} className="btn-back">
          Back to Properties
        </button>
      </div>
    );
  }

  const images = property.images.length > 0
    ? property.images
    : ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'];

  return (
    <div className="property-detail-page">
      <div className="property-gallery">
        <div className="main-image">
          <img src={images[selectedImage]} alt={property.title} />
          <button className="back-button" onClick={() => navigate('/properties')}>
            ← Back to Properties
          </button>
        </div>
        {images.length > 1 && (
          <div className="image-thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`View ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        <div className="property-content">
          <div className="property-main-info">
            <div className="property-header">
              <div>
                <h1>{property.title}</h1>
                <p className="address">
                  {property.address}, {property.city}, {property.state} {property.zip_code}
                </p>
              </div>
              <div className="price-tag">{formatPrice(property.price)}</div>
            </div>

            <div className="property-stats">
              <div className="stat">
                <span className="stat-label">Bedrooms</span>
                <span className="stat-value">{property.bedrooms}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Bathrooms</span>
                <span className="stat-value">{property.bathrooms}</span>
              </div>
              {property.square_feet && (
                <div className="stat">
                  <span className="stat-label">Square Feet</span>
                  <span className="stat-value">{property.square_feet.toLocaleString()}</span>
                </div>
              )}
              {property.lot_size && (
                <div className="stat">
                  <span className="stat-label">Lot Size</span>
                  <span className="stat-value">{property.lot_size} acres</span>
                </div>
              )}
              {property.year_built && (
                <div className="stat">
                  <span className="stat-label">Year Built</span>
                  <span className="stat-value">{property.year_built}</span>
                </div>
              )}
              <div className="stat">
                <span className="stat-label">Type</span>
                <span className="stat-value">{property.property_type}</span>
              </div>
            </div>

            <div className="property-description">
              <h2>Description</h2>
              <p>{property.description || 'No description available.'}</p>
            </div>

            {property.features.length > 0 && (
              <div className="property-features">
                <h2>Features & Amenities</h2>
                <ul className="features-list">
                  {property.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="property-sidebar">
            {property.agents && (
              <div className="agent-card">
                <h3>Contact Agent</h3>
                <div className="agent-info">
                  {property.agents.photo_url && (
                    <img
                      src={property.agents.photo_url}
                      alt={property.agents.full_name}
                      className="agent-photo"
                    />
                  )}
                  <div>
                    <h4>{property.agents.full_name}</h4>
                    {property.agents.phone && <p>{property.agents.phone}</p>}
                    {property.agents.email && <p>{property.agents.email}</p>}
                  </div>
                </div>
                {property.agents.bio && (
                  <p className="agent-bio">{property.agents.bio}</p>
                )}
                <button
                  className="contact-button"
                  onClick={() => setShowContactForm(!showContactForm)}
                >
                  Request Information
                </button>
              </div>
            )}

            {showContactForm && (
              <div className="contact-form-card">
                <h3>Send a Message</h3>
                {submitStatus === 'success' ? (
                  <div className="success-message">
                    Thank you! Your message has been sent.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitLead}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={submitStatus === 'submitting'}
                    >
                      {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                    {submitStatus === 'error' && (
                      <div className="error-message">
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </form>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
