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
import './Gallery.css'; // You can keep your custom styles if needed.

const Gallery = () => {
  const galleryItems = [
    { 
      id: 1, 
      src: 'https://images.pexels.com/photos/261197/pexels-photo-261197.jpeg', 
      alt: 'White Sunloungers Beside Pool' 
    },
    { 
      id: 2, 
      src: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg', 
      alt: 'Elegant Hotel Lobby with Chandelier' 
    },
    { 
      id: 3, 
      src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', 
      alt: 'Luxury Hotel Room Interior' 
    },
    { 
      id: 4, 
      src: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg', 
      alt: 'Restaurant with Cozy Seating' 
    },
    { 
      id: 5, 
      src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', 
      alt: 'Hotel Bed with Clean White Linens' 
    },
    { 
      id: 6, 
      src: 'https://images.pexels.com/photos/258155/pexels-photo-258155.jpeg', 
      alt: 'Modern Bathroom with Marble Accents' 
    },
    { 
      id: 7, 
      src: 'https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg', 
      alt: 'Outdoor Dining Area with Garden View' 
    },
    { 
      id: 8, 
      src: 'https://images.pexels.com/photos/261393/pexels-photo-261393.jpeg', 
      alt: 'Poolside with Blue Lounge Chairs' 
    },
    { 
      id: 9, 
      src: 'https://images.pexels.com/photos/290120/pexels-photo-290120.jpeg', 
      alt: 'Spa Room with Relaxing Atmosphere' 
    },
    { 
      id: 10, 
      src: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg', 
      alt: 'Hotel Gym with Modern Equipment' 
    },
    { 
      id: 11, 
      src: 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg', 
      alt: 'Balcony with Scenic City View' 
    },
    { 
      id: 12, 
      src: 'https://images.pexels.com/photos/112831/pexels-photo-112831.jpeg', 
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
