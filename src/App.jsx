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


import './App.css';
import { useState, useEffect, useCallback } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Rooms from './Components/Rooms/Rooms'; // Assuming you have a Rooms component
import ContactUs from './Components/Contact/Contact'; // Assuming you have a ContactUs component
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth'; // Ensure you have an Auth component

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState('home'); // State to track the active page
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const [authOpen, setAuthOpen] = useState(false); // State for auth popup

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mock function to simulate authentication status
  const checkAuthStatus = () => {
    // Replace this with actual auth check logic
    // For example, check a token in localStorage or use Firebase auth
    const user = localStorage.getItem('user'); // Simulate checking authentication
    setIsAuthenticated(!!user);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleSignIn = () => {
    setAuthOpen(true); // Open the auth popup
  };

  const closeAuthPopup = () => {
    setAuthOpen(false); // Close the auth popup
    checkAuthStatus(); // Check auth status after closing the popup
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      return <Home />; // Show Home page or a login prompt if not authenticated
    }

    switch (activePage) {
      case 'about':
        return <AboutUs />;
      case 'rooms':
        return <Rooms />;
      case 'contact':
        return <ContactUs />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="Wrapper">
      <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
        <NavBar setActivePage={setActivePage} handleSignIn={handleSignIn} /> {/* Pass the handleSignIn function */}
      </nav>
      <main>
        {renderPage()} {/* Render page based on activePage and auth status */}
      </main>
      <footer>
        <Footer/>
      </footer>

      {/* Auth Popup */}
      {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />} {/* Conditionally render the auth popup */}
    </div>
  );
}

export default App;
