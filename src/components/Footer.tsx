import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Elite Realty</h3>
            <p className="footer-tagline">
              Your premier partner in finding the perfect property.
              Exceptional service, expert guidance, outstanding results.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/properties">Search Properties</Link></li>
              <li><Link to="/agents">Meet Our Agents</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@eliterealty.com</li>
              <li>Address: 123 Main Street, Suite 100</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elite Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
