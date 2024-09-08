import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  // Example gallery items, replace with your actual data
  const galleryItems = [
    { id: 1, src: 'pic2.jpg', alt: 'Image 1' },
    { id: 2, src: 'pic3.jpg', alt: 'Image 2' },
    { id: 3, src: 'pic4.jpg', alt: 'Image 3' },
    { id: 4, src: 'pic5.jpg', alt: 'Image 4' },
    { id: 5, src: 'pic6.jpg', alt: 'Image 5' },
    { id: 6, src: 'pic7.jpg', alt: 'Image 6' },
    { id: 7, src: 'pic8.jpg', alt: 'Image 7' },
    { id: 8, src: 'pic9.jpg', alt: 'Image 8' },
    { id: 9, src: 'pic10.jpg', alt: 'Image 9' },
    { id: 10, src: 'pic11.jpg', alt: 'Image 10' },
    { id: 11, src: 'pic6.jpg', alt: 'Image 11' },
    { id: 12, src: 'pic7.jpg', alt: 'Image 12' },
    { id: 13, src: 'pic5.jpg', alt: 'Image 13' },
    { id: 14, src: 'pic6.jpg', alt: 'Image 14' },
    { id: 15, src: 'pic7.jpg', alt: 'Image 15' },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className='myGallery'>
      <h1 className='galleryTitle'>Gallery</h1>
      <div className='galleryGrid'>
        {galleryItems.map((item) => (
          <div key={item.id} className='galleryItem' onClick={() => handleImageClick(item.src)}>
            <img src={item.src} alt={item.alt} className='galleryImage' />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="imagePopup">
          <div className="popupContent">
            <img src={selectedImage} alt="Selected" className="popupImage" />
            <button className="closeButton" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
