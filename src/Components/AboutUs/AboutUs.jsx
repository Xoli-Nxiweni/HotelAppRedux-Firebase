import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-image-container">
        <img 
          src="pic4.jpg" 
          alt="Hotel" 
          className="about-image" 
        />
        <h1 className="hotel-name">Splendid Stay Hotel</h1>
      </div>
      <div className="about-content-container">
        <h2>About Us</h2>
        <p>
          Welcome to Splendid Stay Hotel, where luxury meets comfort. Our hotel is designed to offer you an unparalleled experience, combining elegance with the warmth of home. Nestled in the heart of the city, we provide a tranquil escape from the hustle and bustle while being conveniently located for all your needs.
        </p>
        <p>
          Our rooms are meticulously designed with your comfort in mind, featuring modern amenities and breathtaking views. Whether you are traveling for business or leisure, our dedicated staff is here to ensure your stay is as comfortable and memorable as possible.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
