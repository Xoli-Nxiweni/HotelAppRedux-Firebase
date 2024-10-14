import  { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Modal,
  IconButton,
  Card,
  CardMedia,
  CardActionArea
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Gallery.css';

const Gallery = () => {
  const galleryItems = [
    { 
      id: 1, 
      src: 'https://images.pexels.com/photos/9119735/pexels-photo-9119735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      alt: 'White Sunloungers Beside Pool' 
    },
    { 
      id: 2, 
      src: 'https://castrolighting.com/uploads/photos/blog/Luxury-Lighting-for-the-hotel-lobby/Luxury-Lighting-Hotel-Lobby-Jagdhof-Hotel-Aurea-Chandelier-Castro-Lighting-Banner.jpg', 
      alt: 'Elegant Hotel Lobby with Chandelier' 
    },
    { 
      id: 3, 
      src: 'https://images.squarespace-cdn.com/content/v1/62dfa656a2986f7b76f75c92/1658824442495-VQ2TUKVIBERFA152ZIWS/Screenshot+2022-05-04+at+17.59.16.png', 
      alt: 'Luxury Hotel Room Interior' 
    },
    { 
      id: 4, 
      src: 'https://www.tallboxdesign.com/wp-content/uploads/2024/09/NEW_SSSVVHJARRFQLMCDJBZCJ7YFW-1024x574.webp', 
      alt: 'Restaurant with Cozy Seating' 
    },
    { 
      id: 5, 
      src: 'https://m.media-amazon.com/images/I/61+C23kpfYL._AC_UF1000,1000_QL80_.jpg', 
      alt: 'Hotel Bed with Clean White Linens' 
    },
    { 
      id: 6, 
      src: 'https://cdn.mos.cms.futurecdn.net/ievf8Cy6TqFtRo7h22Jmvm-1200-80.jpg', 
      alt: 'Modern Bathroom with Marble Accents' 
    },
    { 
      id: 7, 
      src: 'https://st.hzcdn.com/simgs/pictures/patios/backyard-patio-lounge-degoey-designs-img~07f1e14f0afb1e6d_14-5884-1-911cb55.jpg', 
      alt: 'Outdoor Dining Area with Garden View' 
    },
    { 
      id: 8, 
      src: 'https://www.patioproductions.com/blog/wp-content/uploads/chaise_lounge_chairs_by_a_luxury_pool-1024x574.jpg.webp', 
      alt: 'Poolside with Blue Lounge Chairs' 
    },
    { 
      id: 9, 
      src: 'https://s32249.pcdn.co/wp-content/uploads/2017/10/gallery9-845x430.jpg', 
      alt: 'Spa Room with Relaxing Atmosphere' 
    },
    { 
      id: 10, 
      src: 'https://www.yanrefitness.com/wp-content/uploads/2020/09/hotel-gym-setup-banner.jpg', 
      alt: 'Hotel Gym with Modern Equipment' 
    },
    { 
      id: 11, 
      src: 'https://i.pinimg.com/736x/9f/02/9b/9f029bae8880da0c6baeb5ac6eb4babd.jpg', 
      alt: 'Balcony with Scenic City View' 
    },
    { 
      id: 12, 
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/536254999.jpg?k=2419bacb7837c9e032c3132da0006dc71d8a20548222d85c2a954836db618cf7&o=&hp=1', 
      alt: 'Luxurious Hotel Entrance at Night' 
    },
  ];
  

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ padding: '100px 40px 40px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {galleryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardActionArea onClick={() => handleImageClick(item.src)}>
                <CardMedia
                  component="img"
                  image={item.src}
                  alt={item.alt}
                  sx={{ height: 200, objectFit: 'cover', borderRadius: 2 }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={Boolean(selectedImage)}
        onClose={handleClosePopup}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '500px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 24,
          }}
        >
          <IconButton
            onClick={handleClosePopup}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              borderRadius: '8px',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Gallery;
