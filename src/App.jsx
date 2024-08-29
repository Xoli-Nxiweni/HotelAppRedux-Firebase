import './App.css';
import { useState, useEffect, useCallback } from "react";
// import Landing from './Components/LandingPage/Landing';
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';


function App() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="Wrapper">
      <nav className={`myNav ${scrolled ? 'scrolled' : ''}`}>
        <NavBar />
      </nav>
      <main>
        <Home />
        <AboutUs/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
