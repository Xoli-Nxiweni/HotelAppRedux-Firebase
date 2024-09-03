// import { useSelector, useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NavBar from "./Components/NavBar/NavBar";
// import Home from './Components/Home/Home';
// import AboutUs from './Components/AboutUs/AboutUs';
// import Rooms from './Components/Rooms/Rooms';
// import ContactUs from './Components/Contact/Contact';
// import Gallery from './Components/Gallery/Gallery';
// import Footer from './Components/Footer/Footer';
// import Auth from './Components/Auth/Auth';
// import Loader from './Components/Loader/Loader';
// import Booking from './Components/Booking/Booking';
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from './Firebase/firebase';
// import { signInUser, signOutUser } from '../src/Features/slices/authSlice';
// import { toggleAuthOpen } from '../src/Features/slices/authSlice'; // Import the toggleAuthOpen action

// function App() {
//   const [scrolled, setScrolled] = useState(false);
//   const authOpen = useSelector((state) => state.auth.authOpen);
//   const isLoading = useSelector(state => state.loading.isLoading);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch(signInUser(user)); // Removed .fulfilled
//       } else {
//         dispatch(signOutUser());
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return (
//     <Router>
//       <div className="Wrapper">
//         <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
//           <NavBar />
//         </nav>
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/rooms" element={<Rooms />} />
//             <Route path="/gallery" element={<Gallery />} />
//             <Route path="/contact" element={<ContactUs />} />
//             <Route path="/booking" element={<Booking />} />
//             {/* Conditional Auth rendering handled by state */}
//           </Routes>
//         </main>
//         <footer>
//           <Footer />
//         </footer>

//         {isLoading && <Loader />}
//         {authOpen && <Auth onClose={() => dispatch(toggleAuthOpen(false))} />}
//       </div>
//     </Router>
//   );
// }

// export default App;

// App.jsx
import { useState } from 'react';
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
import { useSelector } from 'react-redux';
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('/');
  const isLoading = useSelector(state => state.loading.isLoading);

  return (
    <Router>
      <div className="Wrapper">
        <NavBar setActivePage={setActivePage} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            {/* You might need to handle other routes here */}
          </Routes>
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
