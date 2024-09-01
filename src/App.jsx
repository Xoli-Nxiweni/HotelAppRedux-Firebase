// import './App.css';
// import { useState, useEffect, useCallback } from "react";
// import NavBar from "./Components/NavBar/NavBar";
// import Home from './Components/Home/Home';
// import AboutUs from './Components/AboutUs/AboutUs';
// // import Rooms from './Components/Rooms/Rooms'; // Assuming you have a Rooms component
// // import ContactUs from './Components/ContactUs/ContactUs'; // Assuming you have a ContactUs component
// import Footer from './Components/Footer/Footer';

// function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const [activePage, setActivePage] = useState('home'); // State to track the active page

//   const handleScroll = useCallback(() => {
//     setScrolled(window.scrollY > 0);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const renderPage = () => {
//     switch (activePage) {
//       case 'about':
//         return <AboutUs />;
//       // case 'rooms':
//       //   return <Rooms />;
//       // case 'contact':
//       //   return <ContactUs />;
//       case 'home':
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="Wrapper">
//       <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
//         <NavBar setActivePage={setActivePage} /> {/* Passing the setActivePage function to NavBar */}
//       </nav>
//       <main>
//         {renderPage()} {/* Rendering the page based on activePage state */}
//       </main>
//       <footer>
//         <Footer/>
//       </footer>
//     </div>
//   );
// }

// export default App;


// import './App.css';
// import { useState, useEffect, useCallback } from "react";
// import NavBar from "./Components/NavBar/NavBar";
// import Home from './Components/Home/Home';
// import AboutUs from './Components/AboutUs/AboutUs';
// import Rooms from './Components/Rooms/Rooms'; // Assuming you have a Rooms component
// import ContactUs from './Components/Contact/Contact'; // Assuming you have a ContactUs component
// import Footer from './Components/Footer/Footer';
// import Auth from './Components/Auth/Auth'; // Ensure you have an Auth component

// function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const [activePage, setActivePage] = useState('home'); // State to track the active page
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
//   const [authOpen, setAuthOpen] = useState(false); // State for auth popup

//   const handleScroll = useCallback(() => {
//     setScrolled(window.scrollY > 0);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // Mock function to simulate authentication status
//   const checkAuthStatus = () => {
//     // Replace this with actual auth check logic
//     // For example, check a token in localStorage or use Firebase auth
//     const user = localStorage.getItem('user'); // Simulate checking authentication
//     setIsAuthenticated(!!user);
//   };

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const handleSignIn = () => {
//     setAuthOpen(true); // Open the auth popup
//   };

//   const closeAuthPopup = () => {
//     setAuthOpen(false); // Close the auth popup
//     checkAuthStatus(); // Check auth status after closing the popup
//   };

//   const renderPage = () => {
//     if (!isAuthenticated) {
//       return <Home />; 
//     }

//     switch (activePage) {
//       case 'about':
//         return <AboutUs />;
//       case 'rooms':
//         return <Rooms />;
//       case 'contact':
//         return <ContactUs />;
//       case 'home':
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="Wrapper">
//       <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
//         <NavBar setActivePage={setActivePage} handleSignIn={handleSignIn} /> 
//       </nav>
//       <main>
//         {renderPage()} 
//       </main>
//       <footer>
//         <Footer/>
//       </footer>

//       {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />} 
//     </div>
//   );
// }

// export default App;


// import './App.css';
// import { useState, useEffect, useCallback } from "react";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import NavBar from "./Components/NavBar/NavBar";
// import Home from './Components/Home/Home';
// import AboutUs from './Components/AboutUs/AboutUs';
// import Rooms from './Components/Rooms/Rooms';
// import ContactUs from './Components/Contact/Contact';
// import Footer from './Components/Footer/Footer';
// import Auth from './Components/Auth/Auth';

// function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const [activePage, setActivePage] = useState('home');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);

//   const handleScroll = useCallback(() => {
//     setScrolled(window.scrollY > 0);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const checkAuthStatus = () => {
//     const user = localStorage.getItem('user');
//     setIsAuthenticated(!!user);
//   };

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const handleSignIn = () => {
//     setAuthOpen(true);
//   };

//   const closeAuthPopup = () => {
//     setAuthOpen(false);
//     checkAuthStatus();
//   };

//   const renderPage = () => {
//     if (!isAuthenticated) {
//       return <Home />;
//     }

//     switch (activePage) {
//       case 'about':
//         return <AboutUs />;
//       case 'rooms':
//         return <Rooms />;
//       case 'contact':
//         return <ContactUs />;
//       case 'home':
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="Wrapper">
//       <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
//         <NavBar setActivePage={setActivePage} handleSignIn={handleSignIn} />
//       </nav>
//       <main>
//         <TransitionGroup>
//           <CSSTransition
//             key={activePage}
//             timeout={300}
//             classNames="page"
//           >
//             {renderPage()}
//           </CSSTransition>
//         </TransitionGroup>
//       </main>
//       <footer>
//         <Footer />
//       </footer>

//       {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />}
//     </div>
//   );
// }

// export default App;

// import './App.css';
// import { useState, useEffect, useCallback } from "react";
// import NavBar from "./Components/NavBar/NavBar";
// import Home from './Components/Home/Home';
// import AboutUs from './Components/AboutUs/AboutUs';
// import Rooms from './Components/Rooms/Rooms'; 
// import ContactUs from './Components/Contact/Contact';
// import Footer from './Components/Footer/Footer';
// import Auth from './Components/Auth/Auth';
// import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import the transition components

// function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const [activePage, setActivePage] = useState('home'); 
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);

//   const handleScroll = useCallback(() => {
//     setScrolled(window.scrollY > 0);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const checkAuthStatus = () => {
//     const user = localStorage.getItem('user'); 
//     setIsAuthenticated(!!user);
//   };

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const handleSignIn = () => {
//     setAuthOpen(true); 
//   };

//   const closeAuthPopup = () => {
//     setAuthOpen(false); 
//     checkAuthStatus(); 
//   };

//   const renderPage = () => {
//     switch (activePage) {
//       case 'about':
//         return <AboutUs />;
//       case 'rooms':
//         return <Rooms />;
//       case 'contact':
//         return <ContactUs />;
//       case 'home':
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="Wrapper">
//       <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
//         <NavBar setActivePage={setActivePage} handleSignIn={handleSignIn} /> 
//       </nav>
//       <main>
//         <TransitionGroup>
//           <CSSTransition
//             key={activePage} // Ensure each page transition is uniquely keyed
//             timeout={500} // Set the duration for the transition
//             classNames="page" // Reference the CSS classes defined in App.css
//             unmountOnExit
//           >
//             {renderPage()}
//           </CSSTransition>
//         </TransitionGroup>
//       </main>
//       <footer>
//         <Footer/>
//       </footer>

//       {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />} 
//     </div>
//   );
// }

// export default App;


// import './App.css';
// import { useState, useEffect, useCallback } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NavBar from "./Components/NavBar/NavBar";
// import Home from './Components/Home/Home';
// import AboutUs from './Components/AboutUs/AboutUs';
// import Rooms from './Components/Rooms/Rooms'; 
// import ContactUs from './Components/Contact/Contact';
// import Footer from './Components/Footer/Footer';
// import Auth from './Components/Auth/Auth';
// import { useSelector, useDispatch } from "react-redux";
// import { signUpUser, signInUser, signOutUser, clearError } from './Features/slices/authSlice';


// function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);
  
//   const authState = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   const handleScroll = useCallback(() => {
//     setScrolled(window.scrollY > 0);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const handleSignIn = () => {
//     setAuthOpen(true); 
//   };

//   const closeAuthPopup = () => {
//     setAuthOpen(false); 
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <Router>
//       <div className="Wrapper">
//         <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
//           <NavBar handleSignIn={handleSignIn} handleLogout={handleLogout} isAuthenticated={authState.user !== null} /> 
//         </nav>
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/rooms" element={<Rooms />} />
//             <Route path="/contact" element={<ContactUs />} />
//           </Routes>
//         </main>
//         <footer>
//           <Footer />
//         </footer>
//         {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />} 
//       </div>
//     </Router>
//   );
// }

// export default App;

import './App.css';
import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Rooms from './Components/Rooms/Rooms'; 
import ContactUs from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from './Features/slices/authSlice';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSignIn = () => setAuthOpen(true); 
  const closeAuthPopup = () => setAuthOpen(false); 
  const handleLogout = () => dispatch(signOutUser()); 

  return (
    <Router>
      <div className="Wrapper">
        <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
          <NavBar setActivePage={() => {}} /> 
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
        {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />} 
      </div>
    </Router>
  );
}

export default App;
