import { useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { FaAirbnb, FaAlgolia, FaAws, FaStripe, FaSlack, FaAtlassian, FaFigma, FaDropbox, FaSalesforce, FaShopify, FaJira, FaTrello } from 'react-icons/fa'; 

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
    <div className="home-container" style={{background: '#ff000045'}}>
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

      {/* Asymmetrical Section */}
      <section
        className="home-section home-section-split"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <div className="home-content-left">
          <h2>Our Trusted Partners</h2>
          <p>
            Partnering with leading brands to ensure your stay is exceptional. Explore our exclusive deals and offers brought to you by our partners.
          </p>
          <div className="sponsors-icons">
            <FaAirbnb size={30} title="Airbnb" />
            <FaAlgolia size={30} title="Algolia" />
            <FaAws size={30} title="AWS" />
            <FaStripe size={30} title="Stripe" />
            <FaSlack size={30} title="Slack" />
            <FaAtlassian size={30} title="Atlassian" />
            <FaFigma size={30} title="Figma" />
            <FaDropbox size={30} title="Dropbox" />
            <FaSalesforce size={30} title="Salesforce" />
            <FaShopify size={30} title="Shopify" />
            <FaJira size={30} title="Jira" />
            <FaTrello size={30} title="Trello" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
