import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogoWordpress } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signOutUser } from '../../Features/slices/authSlice';
import Auth from '../Auth/Auth';
import UserProfile from "../UserProfile/UserProfile";
import './NavBar.css';

const NavBar = ({ setActivePage }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update current page when the path changes
    setCurrentPage(window.location.pathname);
  }, [window.location.pathname]);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const handleSignInClick = () => setAuthOpen(true);
  const closeAuthPopup = () => setAuthOpen(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(page); // Navigate to the page
    setActivePage(page);
    setDrawerOpen(false);
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
    setShowProfile(false);
  };

  return (
    <div className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <a href="/"><IoLogoWordpress /></a>
      </div>
      <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
        <li>
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
            className={currentPage === '/' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
            className={currentPage === '/about' ? 'active' : ''}
          >
            About Us
          </a>
        </li>
        <li>
          <a 
            href="/rooms" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
            className={currentPage === '/rooms' ? 'active' : ''}
          >
            Rooms
          </a>
        </li>
        <li>
          <a 
            href="/contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
            className={currentPage === '/contact' ? 'active' : ''}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="userProfile">
        {isAuthenticated ? (
          <>
            <button className="user-icon-btn" onClick={() => setShowProfile(prev => !prev)}>
              <FaRegUserCircle />
            </button>
            {showProfile && <UserProfile user={user} onSignOut={handleSignOut} />}
          </>
        ) : (
          <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
        )}
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
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
              className={currentPage === '/' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/about" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
              className={currentPage === '/about' ? 'active' : ''}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="/rooms" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
              className={currentPage === '/rooms' ? 'active' : ''}
            >
              Rooms
            </a>
          </li>
          <li>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
              className={currentPage === '/contact' ? 'active' : ''}
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
