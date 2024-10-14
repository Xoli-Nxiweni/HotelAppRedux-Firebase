import 'leaflet/dist/leaflet.css';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d114503.14531647145!2d27.84616161585913!3d-26.254415517058423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sinnovation%20hub%20soweto!5e0!3m2!1sen!2sza!4v1728246224223!5m2!1sen!2sza" 
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><strong>Address:</strong> 123 RestQuest Blvd, Luxury City, RC 45678</p>
          <p><strong>Phone:</strong> +1 (234) 567-8901</p>
          <p><strong>Email:</strong> info@restquest.com</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target='_blank' rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" target='_blank' rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target='_blank' rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" target='_blank' rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RestQuest. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
