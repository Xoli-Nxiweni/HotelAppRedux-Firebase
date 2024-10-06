import { useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, observerOptions);

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
    <div className="home-container" >
      {/* Main Section */}
      <section
        className="home-section home-section-main"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <div className="home-content">
          <h1>Welcome to RestQuest</h1>
          <p>
            Experience unmatched comfort and luxury with our top-rated accommodations. Your next adventure starts here, where tranquility meets elegance.
          </p>
          <button className="cta-button" onClick={() => navigate('/rooms')}>
            Explore Rooms
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
