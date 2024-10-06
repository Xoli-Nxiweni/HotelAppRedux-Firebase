import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import ScrollReveal from 'scrollreveal';
import { useEffect } from 'react';

// Background image for the hero section
const StyledHeroSection = styled(Box)(({ theme }) => ({
  background: `#000000dd`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(10px)',
  backgroundPosition: 'center',
  padding: theme.spacing(5, 4),
  color: '#fff',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'auto',
}));

// Section after the hero
const StyledInfoSection = styled(Box)(({ theme }) => ({
  backgroundColor: 'whitesmoke',
  padding: theme.spacing(0, 0, 0, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Container for text and button content
const ContentWrapper = styled(Container)(({ theme }) => ({
  maxWidth: '900px',
  textAlign: 'center',
}));

const defaultTheme = createTheme();

const AboutUs = () => {
  useEffect(() => {
    // Initialize ScrollReveal
    ScrollReveal().reveal('.content', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: false, // Set to true if you want the animations to repeat on scroll
      easing: 'ease-out',
      delay: 200,
    });
  }, []);

  return (
    <>
      {/* Info Section */}
      <StyledInfoSection>
        <div
          className="content"
          style={{
            display: 'flex',
            padding: '50px 5%',
            background: '#fff',
            alignItems: 'center',
          }}
        >
          <ContentWrapper>
            <Typography variant="h4" component="h2" gutterBottom>
              Who We Are
            </Typography>
            <Typography variant="body1" paragraph>
              RestQuest was born from a simple idea: that everyone deserves a place where comfort and adventure meet. Our mission is to offer a seamless and personalized hotel booking experience, ensuring that whether you’re on a business trip, a romantic getaway, or a family vacation, you’ll find your perfect room.
            </Typography>
            <Typography variant="body1" paragraph>
              Our team is driven by a passion for hospitality and technology. We’ve carefully crafted RestQuest to combine the ease of online booking with the warmth of true hospitality.
            </Typography>
          </ContentWrapper>
          <ContentWrapper>
            <Typography variant="body1" paragraph>
              <img
                src="pic7.jpg"
                alt="Luxurious Hotel"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '15px',
                }}
              />
            </Typography>
          </ContentWrapper>
        </div>
      </StyledInfoSection>
    </>
  );
};

export default AboutUs;
