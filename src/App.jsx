import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Rooms from './Components/Rooms/Rooms';
import ContactUs from './Components/Contact/Contact';
import Gallery from './Components/Gallery/Gallery';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Loader from './Components/Loader/Loader';
import Booking from './Components/Booking/Booking';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase/firebase';
import { signInUser, signOutUser } from '../src/Features/slices/authSlice'; // Import the signOutUser action

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check auth state when the app mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, dispatch the thunk action with user data
        dispatch(signInUser.fulfilled(user));  // Directly dispatch the fulfilled action with the user info
      } else {
        // User is signed out, dispatch signOutUser action
        dispatch(signOutUser()); 
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const closeAuthPopup = () => {
    setAuthOpen(false);
  };

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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>

        {isLoading && <Loader />}
        {authOpen && <Auth isOpen={authOpen} onClose={closeAuthPopup} />}
      </div>
    </Router>
  );
}

export default App;
