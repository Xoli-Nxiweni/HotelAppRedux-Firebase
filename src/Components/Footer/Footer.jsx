import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footerContainer">
        <div className="footerSection">
          <h3>About Us</h3>
          <p>
            Welcome to our hotel, where luxury meets comfort. We are dedicated to providing you with a memorable experience and exceptional service.
          </p>
        </div>
        <div className="footerSection">
          <h3>Contact Us</h3>
          <p>
            <strong>Address:</strong> 123 Hotel St, Luxury City, HC 45678
          </p>
          <p>
            <strong>Phone:</strong> +1 (234) 567-8901
          </p>
          <p>
            <strong>Email:</strong> info@hotel.com
          </p>
        </div>
        <div className="footerSection">
          <h3>Quick Links</h3>
          <ul className="footerLinks">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Rooms</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footerSection">
          <h3>Follow Us</h3>
          <div className="socialIcons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>&copy; 2024 Serenity Suites. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
