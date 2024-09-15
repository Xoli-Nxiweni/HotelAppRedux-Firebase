import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { setUser } from '../../Features/slices/authSlice';
import Auth from '../Auth/Auth';
import UserProfile from '../UserProfile/UserProfile';
import { setLoader } from '../../Features/slices/loadingSlice';
import './NavBar.css';

// eslint-disable-next-line react/prop-types
const NavBar = ({ setActivePage }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const loader = useSelector((state) => state.loading.isLoading);

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set Active Page based on location
  useEffect(() => {
    if (setActivePage) {
      setActivePage(location.pathname);
    }
  }, [location.pathname, setActivePage]);

  // Toggle Drawer Open/Close
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Handle Sign In Button Click
  const handleSignInClick = () => {
    dispatch(setLoader(true)); // Start loading
    setTimeout(() => {
      setAuthOpen(true);
      dispatch(setLoader(false)); // Stop loading
    }, 2000);
  };

  // Close Auth Popup
  const closeAuthPopup = () => setAuthOpen(false);

  // Close UserProfile Popup
  const closeProfilePopup = () => setShowProfile(false);

  // Handle Navigation Links Click
  const handleNavClick = (page) => {
    navigate(page);
    setDrawerOpen(false);
  };

  // Handle Sign Out Action
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className={`nav-container ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'home-active' : ''}`}>
      <div className="logo">
        <a href="/">
          <h1>Rest<span>Q</span>uest</h1>
        </a>
      </div>
      <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
        <li>
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} className={location.pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li>
          <a href="/about" onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} className={location.pathname === '/about' ? 'active' : ''}>
            About Us
          </a>
        </li>
        <li>
          <a href="/rooms" onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} className={location.pathname === '/rooms' ? 'active' : ''}>
            Rooms
          </a>
        </li>
        <li>
          <a href="/gallery" onClick={(e) => { e.preventDefault(); handleNavClick('/gallery'); }} className={location.pathname === '/gallery' ? 'active' : ''}>
            Gallery
          </a>
        </li>
        <li>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} className={location.pathname === '/contact' ? 'active' : ''}>
            Contact Us
          </a>
        </li>
      </ul>
      <div className="userProfile">
        {isAuthenticated ? (
          <>
            <button className="user-icon-btn" onClick={() => setShowProfile((prev) => !prev)}>
              <img src={user.photoURL || 'public/vecteezy_user-icon-on-transparent-background_19879186.png'} alt="User Avatar" />
            </button>
            {showProfile && <UserProfile user={user} onSignOut={handleSignOut} onClose={closeProfilePopup} />}
          </>
        ) : (
          <button className="authBtn" onClick={handleSignInClick}>
            {loader ? 'Loading...' : 'Sign In'}
          </button>
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
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} className={location.pathname === '/' ? 'active' : ''}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} className={location.pathname === '/about' ? 'active' : ''}>
              About Us
            </a>
          </li>
          <li>
            <a href="/rooms" onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} className={location.pathname === '/rooms' ? 'active' : ''}>
              Rooms
            </a>
          </li>
          <li>
          <a href="/gallery" onClick={(e) => { e.preventDefault(); handleNavClick('/gallery'); }} className={location.pathname === '/gallery' ? 'active' : ''}>
            Gallery
          </a>
        </li>
          <li>
            <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} className={location.pathname === '/contact' ? 'active' : ''}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* Auth Component Conditional Rendering */}
      {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />}
    </div>
  );
};

export default NavBar;
