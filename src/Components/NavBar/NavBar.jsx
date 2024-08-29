import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLogoWordpress } from "react-icons/io";
import Auth from '../Auth/Auth';
import './NavBar.css';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false); // State to control auth popup

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignInClick = () => {
    setAuthOpen(true); // Open the auth popup
  };

  const closeAuthPopup = () => {
    setAuthOpen(false); // Close the auth popup
  };

  return (
    <div className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <a href="#"><IoLogoWordpress /></a>
      </div>
      <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
        <li><a href="#" onClick={() => console.log('Home clicked')} className="active">Home</a></li>
        <li><a href="#" onClick={() => console.log('About Us clicked')}>About Us</a></li>
        <li><a href="#" onClick={() => console.log('Rooms clicked')}>Rooms</a></li>
        <li><a href="#" onClick={() => console.log('Contact Us clicked')}>Contact Us</a></li>
      </ul>
      <div className="userProfile">
        <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
        <div className="hamburger" onClick={toggleDrawer}>
          <FaBars />
        </div>
      </div>

      {/* Drawer for mobile view */}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="closeDrawer" onClick={toggleDrawer}>
          <FaTimes />
        </div>
        <ul>
          <li><a href="#" onClick={() => console.log('Home clicked')} className="active">Home</a></li>
          <li><a href="#" onClick={() => console.log('About Us clicked')}>About Us</a></li>
          <li><a href="#" onClick={() => console.log('Rooms clicked')}>Rooms</a></li>
          <li><a href="#" onClick={() => console.log('Contact Us clicked')}>Contact Us</a></li>
        </ul>
      </div>

      {/* Auth Popup */}
      <Auth isOpen={authOpen} onClose={closeAuthPopup} />
    </div>
  );
};

export default NavBar;
