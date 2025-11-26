import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: '',
    lead_type: 'general_inquiry'
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const { error } = await supabase.from('leads').insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        lead_type: formData.lead_type,
        status: 'new'
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        message: '',
        lead_type: 'general_inquiry'
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We're here to help you find your perfect property</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="contact-intro">
              Whether you're buying, selling, or just have questions about the market,
              our team of experienced professionals is ready to assist you.
            </p>

            <div className="info-section">
              <h3>Office Location</h3>
              <p>123 Main Street, Suite 100</p>
              <p>Your City, ST 12345</p>
            </div>

            <div className="info-section">
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="info-section">
              <h3>Email</h3>
              <p>info@eliterealty.com</p>
              <p>We typically respond within 24 hours</p>
            </div>

            <div className="info-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send Us a Message</h2>

            {submitStatus === 'success' ? (
              <div className="success-card">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>
                  We've received your message and will get back to you as soon as possible.
                  One of our agents will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="full_name">Full Name *</label>
                    <input
                      type="text"
                      id="full_name"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lead_type">How can we help? *</label>
                    <select
                      id="lead_type"
                      required
                      value={formData.lead_type}
                      onChange={(e) => setFormData({ ...formData, lead_type: e.target.value })}
                    >
                      <option value="general_inquiry">General Inquiry</option>
                      <option value="property_inquiry">Property Inquiry</option>
                      <option value="valuation">Property Valuation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitStatus === 'submitting'}
                >
                  {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'error' && (
                  <div className="error-message">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
