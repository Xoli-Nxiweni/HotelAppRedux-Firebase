import { useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

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
    <div className="home-container">
      <section
        className="home-section home-section-main"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <div className="home-content">
          <h1>Welcome to our splendid hotel, where your comfort is our top priority.</h1>
          <p>
            Experience the pinnacle of luxury and tranquility in our serene surroundings, meticulously designed to enhance your stay.
          </p>
          <button className="cta-button" onClick={() => navigate('/rooms')}>Get Started</button>
        </div>
      </section>
      <section
        className="home-section home-section-split"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <div className="home-content home-content-left">
          <h1>Discover our exclusive offers and world-class amenities.</h1>
          <p>
            Indulge in a stay that promises to exceed all your expectations with premium services and attention to detail.
          </p>
          <button className="cta-button" onClick={() => navigate('/about')}>Explore More</button>
        </div>
        <div className="home-image">
          <div className="image-overlay"></div>
          <img src="your-image-url.jpg" alt="Exclusive offers and amenities" />
        </div>
      </section>
    </div>
  );
};

export default Home;
