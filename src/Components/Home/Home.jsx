import { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, options);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div
        className="home-wrapper hidden" 
        ref={(el) => (sectionRefs.current[0] = el)} // Store each section in the ref array
      >
        <div className="home-content">
          <h1>Welcome to our splendid hotel, where your comfort is our top priority.</h1>
          <p>
            Experience the pinnacle of luxury and tranquility in our serene surroundings, meticulously designed to enhance your stay.
          </p>
          <button className="cta-button" onClick={() => {}}>Get Started</button>
        </div>
      </div>
      <div
        className="home-wrapper hidden" 
        ref={(el) => (sectionRefs.current[1] = el)}
        style={{ background: '#fff' }}
      >
        <div className="home-content">
          <h1>Discover our exclusive offers and world-class amenities.</h1>
          <p>
            Indulge in a stay that promises to exceed all your expectations with premium services and attention to detail.
          </p>
          <button className="cta-button" onClick={() => {}}>Explore More</button>
        </div>
      </div>
    </>
  );
};

export default Home;
