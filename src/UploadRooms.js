import { db } from "../src/Firebase/firebase"; // Adjust the path based on your file structure
import { collection, addDoc } from "firebase/firestore";


const rooms = [
    {
      id: 1,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg', 
      heading: 'Luxury Suite',
      location: 'Johannesburg, South Africa',
      reviews: '4.5',
      originalPrice: 'R2,800',
      discountedPrice: 'R2,400',
      nights: '3 nights'
    },
    {
      id: 2,
      image: 'https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',
      heading: 'Standard Room',
      location: 'Cape Town, South Africa',
      reviews: '4.1',
      originalPrice: 'R1,700',
      discountedPrice: 'R1,300',
      nights: '2 nights'
    },
    {
      id: 3,
      image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
      heading: 'Deluxe Room',
      location: 'Durban, South Africa',
      reviews: '4.3',
      originalPrice: 'R2,900',
      discountedPrice: 'R2,400',
      nights: '4 nights'
    },
    {
      id: 4,
      image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
      heading: 'Family Suite',
      location: 'Pretoria, South Africa',
      reviews: '4.7',
      originalPrice: 'R3,800',
      discountedPrice: 'R3,300',
      nights: '5 nights'
    },
    {
      id: 5,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Beachfront Room',
      location: 'Port Elizabeth, South Africa',
      reviews: '4.2',
      originalPrice: 'R2,300',
      discountedPrice: 'R1,900',
      nights: '3 nights'
    },
    {
      id: 6,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Penthouse Suite',
      location: 'Sandton, South Africa',
      reviews: '4.8',
      originalPrice: 'R5,900',
      discountedPrice: 'R5,200',
      nights: '2 nights'
    },
    {
      id: 7,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Corner Suite',
      location: 'Stellenbosch, South Africa',
      reviews: '4.6',
      originalPrice: 'R3,500',
      discountedPrice: 'R3,000',
      nights: '3 nights'
    },
    {
      id: 8,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'One-Bedroom Suite',
      location: 'Durban, South Africa',
      reviews: '4.4',
      originalPrice: 'R3,700',
      discountedPrice: 'R3,100',
      nights: '4 nights'
    },
    {
      id: 9,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Executive Suite',
      location: 'Cape Town, South Africa',
      reviews: '4.7',
      originalPrice: 'R4,400',
      discountedPrice: 'R3,700',
      nights: '3 nights'
    },
    {
      id: 10,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Garden View Room',
      location: 'Bloemfontein, South Africa',
      reviews: '4.0',
      originalPrice: 'R1,900',
      discountedPrice: 'R1,500',
      nights: '2 nights'
    },
    {
      id: 11,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Panorama Suite',
      location: 'Knysna, South Africa',
      reviews: '4.8',
      originalPrice: 'R5,300',
      discountedPrice: 'R4,600',
      nights: '5 nights'
    },
    {
      id: 12,
      image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
      heading: 'Grand Luxe Room',
      location: 'Franschhoek, South Africa',
      reviews: '4.7',
      originalPrice: 'R3,700',
      discountedPrice: 'R3,100',
      nights: '4 nights'
    }
  ];

export const uploadRoomsToFirestore = async () => {
  try {
    const roomsCollectionRef = collection(db, "hotelRooms");

    const promises = rooms.map(room => addDoc(roomsCollectionRef, room));
    await Promise.all(promises);

    console.log("All rooms have been uploaded!");
  } catch (e) {
    console.error("Error uploading rooms: ", e);
  }
};

// Execute the upload function
uploadRoomsToFirestore();

