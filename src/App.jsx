
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Rooms from './Components/Rooms/Rooms';
import ContactUs from './Components/Contact/Contact';
import Gallery from './Components/Gallery/Gallery';
import Booking from './Components/Booking/Booking';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Loader from './Components/Loader/Loader';
import { setUser } from './Features/slices/authSlice'; 
import './App.css';
import { FaAnglesUp } from 'react-icons/fa6';
import Payment from './Components/Payment/Payment';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    // Track the scroll position
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="Wrapper">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signUp" element={<Auth />} />
            <Route path="/booking" element={<Booking />} />
            {/* Add more routes as needed */}
          </Routes>

          {/* Conditionally render the up arrow button */}
          {isScrolled && (
            <button
              className='upArrow'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <FaAnglesUp />
            </button>
          )}
        </main>
        <footer>
          <Footer />
        </footer>

        {isLoading && <Loader />}
      </div>
    </Router>
  );
}

export default App;
