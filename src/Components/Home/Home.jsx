import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper" id="HomeWrapper">
      <div className="home-content">
        <h1>
          Welcome to our splendid hotel, where your comfort is our top priority.
        </h1>
        <p>
          Experience the pinnacle of luxury and tranquility in our serene surroundings, meticulously designed to enhance your stay.
        </p>
        <button className="cta-button" onClick={()=>{return}}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
