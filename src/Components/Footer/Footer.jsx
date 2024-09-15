import 'leaflet/dist/leaflet.css';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon if needed
const icon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section map">
          <MapContainer 
            center={[-26.222683464725616, 27.896870574723415]} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-26.222683464725616, 27.896870574723415]} icon={icon}>
              <Popup>
                RestQuest Headquarters
              </Popup>
            </Marker>
          </MapContainer>
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
            <li><a href="/about">About Us</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://Facebook.com" target='_Blank' aria-label="Facebook"><FaFacebook /></a>
            <a href="https://Twitter.com" target='_Blank' aria-label="Twitter"><FaTwitter /></a>
            <a href="https://Instagram.com" target='_Blank' aria-label="Instagram"><FaInstagram /></a>
            <a href="https://LinkedIn.com" target='_Blank' aria-label="LinkedIn"><FaLinkedin /></a>
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
