import { db } from "../src/Firebase/firebase"; // Adjust the path based on your file structure
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// Define all your room objects here
const rooms = [
  {
    id: 1,
    image: 'https://example.com/image1.jpg',
    heading: 'Luxury Suite',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: '50',
    view: 'Ocean',
    nonSmoking: true,
    discountedPrice: 'R2,400',
    checkIn: '2024-10-01',
    checkOut: '2024-10-04',
    nights: 3
  },
  {
    id: 2,
    image: 'https://example.com/image2.jpg',
    heading: 'Deluxe Room',
    guests: 4,
    beds: 2,
    bathrooms: 1,
    size: '60',
    view: 'Mountain',
    nonSmoking: false,
    discountedPrice: 'R3,000',
    checkIn: '2024-10-05',
    checkOut: '2024-10-10',
    nights: 5
  },
  {
    id: 3,
    image: 'https://example.com/image3.jpg',
    heading: 'Standard Room',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: '35',
    view: 'City',
    nonSmoking: true,
    discountedPrice: 'R1,800',
    checkIn: '2024-10-10',
    checkOut: '2024-10-12',
    nights: 2
  },
  {
    id: 4,
    image: 'https://example.com/image4.jpg',
    heading: 'Executive Suite',
    guests: 3,
    beds: 2,
    bathrooms: 2,
    size: '80',
    view: 'Garden',
    nonSmoking: true,
    discountedPrice: 'R3,500',
    checkIn: '2024-10-12',
    checkOut: '2024-10-15',
    nights: 3
  },
  {
    id: 5,
    image: 'https://example.com/image5.jpg',
    heading: 'Penthouse Suite',
    guests: 4,
    beds: 2,
    bathrooms: 2,
    size: '100',
    view: 'Panoramic',
    nonSmoking: true,
    discountedPrice: 'R5,000',
    checkIn: '2024-10-15',
    checkOut: '2024-10-20',
    nights: 5
  },
  {
    id: 6,
    image: 'https://example.com/image6.jpg',
    heading: 'Family Room',
    guests: 5,
    beds: 3,
    bathrooms: 1,
    size: '70',
    view: 'Park',
    nonSmoking: false,
    discountedPrice: 'R4,000',
    checkIn: '2024-10-20',
    checkOut: '2024-10-25',
    nights: 5
  },
  {
    id: 7,
    image: 'https://example.com/image7.jpg',
    heading: 'Single Room',
    guests: 1,
    beds: 1,
    bathrooms: 1,
    size: '20',
    view: 'Street',
    nonSmoking: true,
    discountedPrice: 'R1,200',
    checkIn: '2024-10-25',
    checkOut: '2024-10-28',
    nights: 3
  },
  {
    id: 8,
    image: 'https://example.com/image8.jpg',
    heading: 'Double Room',
    guests: 2,
    beds: 2,
    bathrooms: 1,
    size: '30',
    view: 'Garden',
    nonSmoking: false,
    discountedPrice: 'R2,000',
    checkIn: '2024-10-28',
    checkOut: '2024-10-31',
    nights: 3
  },
  {
    id: 9,
    image: 'https://example.com/image9.jpg',
    heading: 'Suite Room',
    guests: 2,
    beds: 1,
    bathrooms: 2,
    size: '55',
    view: 'City',
    nonSmoking: true,
    discountedPrice: 'R2,800',
    checkIn: '2024-10-31',
    checkOut: '2024-11-03',
    nights: 3
  },
  {
    id: 10,
    image: 'https://example.com/image10.jpg',
    heading: 'Junior Suite',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: '45',
    view: 'Pool',
    nonSmoking: true,
    discountedPrice: 'R2,200',
    checkIn: '2024-11-03',
    checkOut: '2024-11-07',
    nights: 4
  },
  {
    id: 11,
    image: 'https://example.com/image11.jpg',
    heading: 'Executive Room',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: '40',
    view: 'City',
    nonSmoking: false,
    discountedPrice: 'R2,500',
    checkIn: '2024-11-07',
    checkOut: '2024-11-10',
    nights: 3
  },
  {
    id: 12,
    image: 'https://example.com/image12.jpg',
    heading: 'Business Suite',
    guests: 3,
    beds: 2,
    bathrooms: 2,
    size: '65',
    view: 'City',
    nonSmoking: true,
    discountedPrice: 'R3,200',
    checkIn: '2024-11-10',
    checkOut: '2024-11-15',
    nights: 5
  }
];

export const uploadRoomsToFirestore = async () => {
  try {
    const roomsCollectionRef = collection(db, "hotelRooms");

    for (const room of rooms) {
      const q = query(roomsCollectionRef, where("id", "==", room.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(roomsCollectionRef, room);
        console.log(`Room with ID ${room.id} uploaded.`);
      } else {
        console.log(`Room with ID ${room.id} already exists. Skipping upload.`);
      }
    }

    console.log("All rooms processed!");
  } catch (e) {
    console.error("Error uploading rooms: ", e);
  }
};

// Execute the upload function
uploadRoomsToFirestore();
