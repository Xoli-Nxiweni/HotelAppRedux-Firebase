import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

const ImageContainer = styled(Box)({
  position: 'relative',
  textAlign: 'center',
});

const AboutImage = styled('img')({
  width: '100%',
  // maxWidth: '520px',
  objectFit: 'cover',
  height: '400px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    // transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
});

const HotelName = styled(Typography)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '2.5rem',
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '10px 20px',
  borderRadius: '5px',
});

const AboutUs = () => {

  const navigate = useNavigate();


  return (
    <Container maxWidth="" className="about-container">
      <ImageContainer>
        <AboutImage 
          src="pic10.jpg" 
          alt="Hotel" 
        />
        <HotelName variant="h3" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
          RestQuest Room Finder
        </HotelName>
      </ImageContainer>

      <Box 
        className="about-content-container" 
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'left',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid #FF6F61', pb: 1, color: '#FF6F61' }}>
          About Us!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          At RestQuest, we’re here to help you discover the perfect room for your stay. We know that finding the right room is key to your comfort, whether you're looking for a cozy space with a view or a suite packed with amenities. RestQuest simplifies your search, giving you a tailored experience within the hotel of your choice.
        </Typography>
        <Typography variant="body1" gutterBottom>
          We take the guesswork out of booking by helping you compare rooms based on what matters to you—size, view, price, or extras like a hot tub or balcony. With RestQuest, you’ll always land the room that’s just right for your needs, and our friendly team is here to guide you every step of the way!
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          className="proceed-button"
          sx={{ mt: 3, bgcolor: '#FF6F61', '&:hover': { bgcolor: '#FF4C3B' } }}
          onClick={()=> navigate('/contact')}
          >
          Contact Us!
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;
