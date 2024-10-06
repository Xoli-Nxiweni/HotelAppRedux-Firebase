import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Loader from './Components/Loader/Loader';
import { setUser } from './Features/slices/authSlice'; 
import './App.css';
import { FaAnglesUp } from 'react-icons/fa6';
import AboutUs from './Components/AboutUs/AboutUs';

const Home = lazy(() => import('./Components/Home/Home'));
// const AboutUs = lazy(() => import('./Components/AboutUs/AboutUs'));
const Rooms = lazy(() => import('./Components/Rooms/Rooms'));
const Gallery = lazy(() => import('./Components/Gallery/Gallery'));
const ContactUs = lazy(() => import('./Components/Contact/Contact'));
const Auth = lazy(() => import('./Components/Auth/Auth'));
const Booking = lazy(() => import('./Components/Booking/Booking'));

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoading = useSelector((state) => state.loading.isLoading);
  // const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<><Home />,  <AboutUs/></>} />
              {/* <Route path="/about" element={<AboutUs />} /> */}
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/signUp" element={<Auth />} />
              <Route path="/booking" element={<Booking />} />
              {/* Add more routes as needed */}
            </Routes>
          </Suspense>

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
