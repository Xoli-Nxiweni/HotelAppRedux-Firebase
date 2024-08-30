import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLogoWordpress } from "react-icons/io";
import Auth from '../Auth/Auth';
import './NavBar.css';

// eslint-disable-next-line react/prop-types
const NavBar = ({ setActivePage }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Track the active page

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
    setAuthOpen(true);
  };

  const closeAuthPopup = () => {
    setAuthOpen(false);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setActivePage(page);
    setDrawerOpen(false); // Close the drawer after selecting a page
  };

  return (
    <div className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <a href="#"><IoLogoWordpress /></a>
      </div>
      <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick('home')} 
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick('about')} 
            className={currentPage === 'about' ? 'active' : ''}
          >
            About Us
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick('rooms')} 
            className={currentPage === 'rooms' ? 'active' : ''}
          >
            Rooms
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick('contact')} 
            className={currentPage === 'contact' ? 'active' : ''}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="userProfile">
        <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
        <div className="hamburger" onClick={toggleDrawer}>
          <FaBars />
        </div>
      </div>

      <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="closeDrawer" onClick={toggleDrawer}>
          <FaTimes />
        </div>
        <ul>
          <li>
            <a 
              href="#" 
              onClick={() => handleNavClick('home')} 
              className={currentPage === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={() => handleNavClick('about')} 
              className={currentPage === 'about' ? 'active' : ''}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={() => handleNavClick('rooms')} 
              className={currentPage === 'rooms' ? 'active' : ''}
            >
              Rooms
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={() => handleNavClick('contact')} 
              className={currentPage === 'contact' ? 'active' : ''}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      <Auth isOpen={authOpen} onClose={closeAuthPopup} />
    </div>
  );
};

export default NavBar;
