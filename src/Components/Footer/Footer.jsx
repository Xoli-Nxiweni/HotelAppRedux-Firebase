import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.2002098656035!2d27.896870574723415!3d-26.222683464725616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a0c990fefdbf%3A0x84641bbf54b62bec!2sNdofaya%20Mall!5e0!3m2!1sen!2sza!4v1725346717376!5m2!1sen!2sza" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen="" 
            aria-hidden="false" 
            tabIndex="0">
          </iframe>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><strong>Address:</strong> 123 Hotel St, Luxury City, HC 45678</p>
          <p><strong>Phone:</strong> +1 (234) 567-8901</p>
          <p><strong>Email:</strong> info@hotel.com</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Rooms</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Serenity Suites. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
