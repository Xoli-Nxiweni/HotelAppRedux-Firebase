import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="AboutContainer">
      <div className="leftAboutContainer">
        <img 
          src="your-image-url-here.jpg" 
          alt="Hotel Image" 
          className="aboutImage" 
        />
        <h1 className="hotelName">Splendid Stay Hotel</h1>
        <button>Click here to proceed</button>
      </div>
      <div className="rightAboutContainer">
        <h2>About Us</h2>
        <p>
          Welcome to Splendid Stay Hotel, where luxury meets comfort. Our hotel is designed to offer you an unparalleled experience, combining elegance with the warmth of home. Nestled in the heart of the city, we provide a tranquil escape from the hustle and bustle while being conveniently located for all your needs.
        </p>
        <p>
          Our rooms are meticulously designed with your comfort in mind, featuring modern amenities and breathtaking views. Whether you are traveling for business or leisure, our dedicated staff is here to ensure your stay is as comfortable and memorable as possible.
        </p>
        {/* <p>
          At Splendid Stay Hotel, we believe that every guest deserves to be treated with the utmost care and respect. From the moment you step through our doors, you will be greeted with a warm smile and a commitment to exceptional service. We take pride in offering a wide range of services to cater to all your needs, from fine dining to state-of-the-art fitness facilities.
        </p>
        <p>
          Choose Splendid Stay Hotel for your next stay, and discover a world of luxury, comfort, and impeccable service.
        </p> */}
      </div>
    </div>
  );
};

export default AboutUs;
