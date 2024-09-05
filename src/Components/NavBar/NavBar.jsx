// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { FaRegUserCircle } from "react-icons/fa";
// import { IoLogoWordpress } from "react-icons/io";
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { signOutUser } from '../../Features/slices/authSlice';
// import Auth from '../Auth/Auth';
// import UserProfile from "../UserProfile/UserProfile";
// import './NavBar.css';

// // eslint-disable-next-line react/prop-types
// const NavBar = ({ setActivePage }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [currentPage, setCurrentPage] = useState(window.location.pathname);

//   const navigate = useNavigate(); // Initialize useNavigate
//   const dispatch = useDispatch();
//   // const user = useSelector(state => state.auth.user);
//   const user = useSelector(state => state.auth.user);
//   const isAuthenticated = !!user;

//   console.log('navbar user: ',  user);
  

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     // Update current page when the path changes
//     setCurrentPage(window.location.pathname);
//   }, [window.location.pathname]);

//   const toggleDrawer = () => setDrawerOpen(prev => !prev);
//   const handleSignInClick = () => setAuthOpen(true);
//   const closeAuthPopup = () => setAuthOpen(false);

//   const handleNavClick = (page) => {
//     setCurrentPage(page);
//     navigate(page); // Navigate to the page
//     setActivePage(page);
//     setDrawerOpen(false);
//   };

//   const handleSignOut = () => {
//     dispatch(signOutUser());
//     setShowProfile(false);
//   };

//   return (
//     <div className={`nav-container ${scrolled ? 'scrolled' : ''} ${currentPage === '/' ? 'home-active' : ''}`}>
//       <div className="logo">
//         <a href="/"><IoLogoWordpress /></a>
//       </div>
//       <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
//         <li>
//           <a 
//             href="/" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
//             className={currentPage === '/' ? 'active' : ''}
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/about" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
//             className={currentPage === '/about' ? 'active' : ''}
//           >
//             About Us
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/rooms" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
//             className={currentPage === '/rooms' ? 'active' : ''}
//           >
//             Rooms
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/gallery" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/gallery'); }} 
//             className={currentPage === '/gallery' ? 'active' : ''}
//           >
//             Gallery
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/contact" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
//             className={currentPage === '/contact' ? 'active' : ''}
//           >
//             Contact Us
//           </a>
//         </li>
//       </ul>
//       <div className="userProfile">
//         {isAuthenticated ? (
//           <>
//             <button className="user-icon-btn" onClick={() => setShowProfile(prev => !prev)}>
//               <img src={user.photoURL} alt="" />
//             </button>
//             {showProfile && <UserProfile user={user} onSignOut={handleSignOut} />}
//           </>
//         ) : (
//           <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
//         )}
//         <div className="hamburger" onClick={toggleDrawer}>
//           <FaBars />
//         </div>
//       </div>

//       <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
//         <div className="closeDrawer" onClick={toggleDrawer}>
//           <FaTimes />
//         </div>
//         <ul>
//             <li>
//             <a 
//               href="/" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/'); location.reload(); }} 
//               className={`${currentPage === '/' ? 'active' : ''}`}
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/about" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
//               className={currentPage === '/about' ? 'active' : ''}
//             >
//               About Us
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/rooms" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
//               className={currentPage === '/rooms' ? 'active' : ''}
//             >
//               Rooms
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/contact" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
//               className={currentPage === '/contact' ? 'active' : ''}
//             >
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </div>

//       <Auth isOpen={authOpen} onClose={closeAuthPopup} />
//     </div>
//   );
// };

// export default NavBar;


// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { IoLogoWordpress } from "react-icons/io";
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { signOutUser } from '../../Features/slices/authSlice';
// import Auth from '../Auth/Auth';
// import UserProfile from "../UserProfile/UserProfile";
// import './NavBar.css';

// // eslint-disable-next-line react/prop-types
// const NavBar = ({ setActivePage }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);
//   const isAuthenticated = !!user;

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setActivePage(location.pathname);
//   }, [location.pathname, setActivePage]);

//   const toggleDrawer = () => setDrawerOpen(prev => !prev);
//   const handleSignInClick = () => setAuthOpen(true);
//   const closeAuthPopup = () => setAuthOpen(false);

//   const handleNavClick = (page) => {
//     navigate(page);
//     setDrawerOpen(false);
//   };

//   const handleSignOut = () => {
//     dispatch(signOutUser());
//     setShowProfile(false);
//   };

//   return (
//     <div className={`nav-container ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'home-active' : ''}`}>
//       <div className="logo">
//         <a href="/"><IoLogoWordpress /></a>
//       </div>
//       <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
//         <li>
//           <a 
//             href="/" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
//             className={location.pathname === '/' ? 'active' : ''}
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/about" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
//             className={location.pathname === '/about' ? 'active' : ''}
//           >
//             About Us
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/rooms" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
//             className={location.pathname === '/rooms' ? 'active' : ''}
//           >
//             Rooms
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/gallery" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/gallery'); }} 
//             className={location.pathname === '/gallery' ? 'active' : ''}
//           >
//             Gallery
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/contact" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
//             className={location.pathname === '/contact' ? 'active' : ''}
//           >
//             Contact Us
//           </a>
//         </li>
//       </ul>
//       <div className="userProfile">
//         {isAuthenticated ? (
//           <>
//             <button className="user-icon-btn" onClick={() => setShowProfile(prev => !prev)}>
//               <img src={user.photoURL} alt="User Avatar" />
//             </button>
//             {showProfile && <UserProfile user={user} onSignOut={handleSignOut} />}
//           </>
//         ) : (
//           <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
//         )}
//         <div className="hamburger" onClick={toggleDrawer}>
//           <FaBars />
//         </div>
//       </div>

//       <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
//         <div className="closeDrawer" onClick={toggleDrawer}>
//           <FaTimes />
//         </div>
//         <ul>
//           <li>
//             <a 
//               href="/" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
//               className={location.pathname === '/' ? 'active' : ''}
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/about" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
//               className={location.pathname === '/about' ? 'active' : ''}
//             >
//               About Us
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/rooms" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
//               className={location.pathname === '/rooms' ? 'active' : ''}
//             >
//               Rooms
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/contact" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
//               className={location.pathname === '/contact' ? 'active' : ''}
//             >
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </div>

//       <Auth isOpen={authOpen} onClose={closeAuthPopup} />
//     </div>
//   );
// };

// export default NavBar;


// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { IoLogoWordpress } from "react-icons/io";
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { signOutUser } from '../../Features/slices/authSlice';
// import Auth from '../Auth/Auth';
// import UserProfile from "../UserProfile/UserProfile";
// import './NavBar.css';

// // eslint-disable-next-line react/prop-types
// const NavBar = ({ setActivePage }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);
//   const isAuthenticated = !!user;

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setActivePage(location.pathname);
//   }, [location.pathname, setActivePage]);

//   const toggleDrawer = () => setDrawerOpen(prev => !prev);
//   const handleSignInClick = () => setAuthOpen(true);
//   const closeAuthPopup = () => setAuthOpen(false);

//   const handleNavClick = (page) => {
//     navigate(page);
//     setDrawerOpen(false);
//   };

//   const handleSignOut = () => {
//     dispatch(signOutUser());
//     setShowProfile(false);
//   };

//   return (
//     <div className={`nav-container ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'home-active' : ''}`}>
//       <div className="logo">
//         <a href="/"><IoLogoWordpress /></a>
//       </div>
//       <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
//         {/* Nav Links */}
//       </ul>
//       <div className="userProfile">
//         {isAuthenticated ? (
//           <>
//             <button className="user-icon-btn" onClick={() => setShowProfile(prev => !prev)}>
//               <img src={user.photoURL || 'path/to/placeholder-image.png'} alt="User Avatar" />
//             </button>
//             {showProfile && <UserProfile user={user} onSignOut={handleSignOut} />}
//           </>
//         ) : (
//           <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
//         )}
//         <div className="hamburger" onClick={toggleDrawer}>
//           <FaBars />
//         </div>
//       </div>

//       <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
//         {/* Drawer Content */}
//       </div>

//       <Auth isOpen={authOpen} onClose={closeAuthPopup} />
//     </div>
//   );
// };

// export default NavBar;


// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { IoLogoWordpress } from "react-icons/io";
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { signOutUser } from '../../Features/slices/authSlice';
// import Auth from '../Auth/Auth';
// import UserProfile from "../UserProfile/UserProfile";
// import './NavBar.css';

// // eslint-disable-next-line react/prop-types
// const NavBar = ({ setActivePage }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);
//   const isAuthenticated = !!user;

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setActivePage(location.pathname);
//   }, [location.pathname, setActivePage]);

//   const toggleDrawer = () => setDrawerOpen(prev => !prev);
//   const handleSignInClick = () => setAuthOpen(true);
//   const closeAuthPopup = () => setAuthOpen(false);

//   const handleNavClick = (page) => {
//     navigate(page);
//     setDrawerOpen(false);
//   };

//   const handleSignOut = () => {
//     dispatch(signOutUser());
//     setShowProfile(false);
//   };

//   return (
//     <div className={`nav-container ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'home-active' : ''}`}>
//       <div className="logo">
//         <a href="/"><IoLogoWordpress /></a>
//       </div>
//       <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
//         <li>
//           <a 
//             href="/" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
//             className={location.pathname === '/' ? 'active' : ''}
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/about" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
//             className={location.pathname === '/about' ? 'active' : ''}
//           >
//             About Us
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/rooms" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
//             className={location.pathname === '/rooms' ? 'active' : ''}
//           >
//             Rooms
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/gallery" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/gallery'); }} 
//             className={location.pathname === '/gallery' ? 'active' : ''}
//           >
//             Gallery
//           </a>
//         </li>
//         <li>
//           <a 
//             href="/contact" 
//             onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
//             className={location.pathname === '/contact' ? 'active' : ''}
//           >
//             Contact Us
//           </a>
//         </li>
//       </ul>
//       <div className="userProfile">
        
//         <div className="hamburger" onClick={toggleDrawer}>
//           <FaBars />
//         </div>
//       </div>

//       <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
//         <div className="closeDrawer" onClick={toggleDrawer}>
//           <FaTimes />
//         </div>
//         <ul>
//           <li>
//             <a 
//               href="/" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
//               className={location.pathname === '/' ? 'active' : ''}
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/about" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
//               className={location.pathname === '/about' ? 'active' : ''}
//             >
//               About Us
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/rooms" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
//               className={location.pathname === '/rooms' ? 'active' : ''}
//             >
//               Rooms
//             </a>
//           </li>
//           <li>
//             <a 
//               href="/contact" 
//               onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
//               className={location.pathname === '/contact' ? 'active' : ''}
//             >
//               Contact Us
//             </a>
//           </li>
//           {isAuthenticated ? (
//           <>
//             <button className="user-icon-btn" onClick={() => setShowProfile(prev => !prev)}>
//               <img src={user.photoURL || 'path/to/placeholder-image.png'} alt="User Avatar" />
//             </button>
//             {showProfile && <UserProfile user={user} onSignOut={handleSignOut} />}
//           </>
//         ) : (
//           <button className="authBtn" onClick={handleSignInClick}>Sign In</button>
//         )}
//         </ul>
//       </div>

//       <Auth isOpen={authOpen} onClose={closeAuthPopup} />
//     </div>
//   );
// };

// export default NavBar;


import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLogoWordpress } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase'; // Import Firebase auth
import { setUser } from '../../Features/slices/authSlice'; // Import Redux action
import Auth from '../Auth/Auth'; // Import Auth for the Auth component'
import UserProfile from "../UserProfile/UserProfile";
import { FaAnglesUp } from "react-icons/fa6";
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
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (setActivePage) {
      setActivePage(location.pathname);
    }
  }, [location.pathname, setActivePage]);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const handleSignInClick = () => setAuthOpen(true);
  const closeAuthPopup = () => setAuthOpen(false);

  const handleNavClick = (page) => {
    navigate(page);
    setDrawerOpen(false);
  };

  const handleSignOut = async ()  => {
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
        <a href="/"><IoLogoWordpress /></a>
      </div>
      <ul className={`nav-links ${drawerOpen ? 'open' : ''}`}>
        <li>
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About Us
          </a>
        </li>
        <li>
          <a 
            href="/rooms" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
            className={location.pathname === '/rooms' ? 'active' : ''}
          >
            Rooms
          </a>
        </li>
        <li>
          <a 
            href="/gallery" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/gallery'); }} 
            className={location.pathname === '/gallery' ? 'active' : ''}
          >
            Gallery
          </a>
        </li>
        <li>
          <a 
            href="/contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="userProfile">
        {isAuthenticated ? (
          <>
            <button className="user-icon-btn" onClick={() => setShowProfile(prev => !prev)}>
              <img src={user.photoURL || 'path/to/placeholder-image.png'} alt="User Avatar" />
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
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/about" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }} 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="/rooms" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/rooms'); }} 
              className={location.pathname === '/rooms' ? 'active' : ''}
            >
              Rooms
            </a>
          </li>
          <li>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }} 
              className={location.pathname === '/contact' ? 'active' : ''}
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
