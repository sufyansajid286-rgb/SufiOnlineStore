import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand footer-logo">
            <span className="brand-mark">S</span>
            <span>
              SUFI<span className="brand-light"> STORE</span>
              <small>ONLINE SHOPPING</small>
            </span>
          </Link>

          <p>
            Discover quality products, amazing deals and a better
            shopping experience, all in one place.
          </p>
          <div className="social-links">
  <a href="https://facebook.com" aria-label="Facebook">
    <FaFacebookF />
  </a>

  <a href="https://instagram.com" aria-label="Instagram">
    <FaInstagram />
  </a>

  <a href="https://x.com" aria-label="X">
    <FaXTwitter />
  </a>
</div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Customer Service</h3>
          <Link to="/faqs">FAQs</Link>
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/returns">Returns & Refunds</Link>
          <Link to="/privacy">Privacy Policy</Link>
        
        </div>

        <div className="footer-column footer-contact">
          <h3>Get in Touch</h3>
          <p><Mail /> support@sufistore.com</p>
          <p><Phone /> +92 300 0000000</p>
          <p><MapPin /> Pakistan</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Sufi Online Store. All rights reserved.</p>
          <p>Designed with care.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;