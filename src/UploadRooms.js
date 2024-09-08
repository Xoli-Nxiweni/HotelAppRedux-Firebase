import { db } from "../src/Firebase/firebase"; // Adjust the path based on your file structure
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";

const rooms = [
  {
    id: 1,
    image: 'pic2.jpg',
    heading: 'Luxury Suite',
    description: 'A lavish suite with breathtaking ocean views. Perfect for a romantic getaway, featuring 1 bed, 1 bathroom, and a non-smoking environment.',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    isFavorite: false,
    size: '50',
    view: 'Ocean',
    nonSmoking: true,
    discountedPrice: 'R2,400',
    checkIn: '2024-10-01',
    checkOut: '2024-10-04',
    nights: 3,
    reviews: 4.8,
    isBooked: false,
    amenities: [
      'Ocean view',
      'King-size bed',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Minibar',
      'In-room safe',
      'Luxurious bathrobes',
      'Complimentary toiletries'
    ]
  },
  {
    id: 2,
    image: 'pic2.jpg',
    heading: 'Deluxe Room',
    description: 'Spacious room with stunning mountain views, ideal for families or groups. Includes 2 beds, 1 bathroom, and offers a non-smoking atmosphere.',
    guests: 4,
    beds: 2,
    bathrooms: 1,
    size: '60',
    view: 'Mountain',
    isFavorite: false,
    nonSmoking: false,
    discountedPrice: 'R3,000',
    checkIn: '2024-10-05',
    checkOut: '2024-10-10',
    reviews: 3.8,
    isBooked: false,
    nights: 5,
    amenities: [
      'Mountain view',
      'Two queen-size beds',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Coffee maker',
      'Complimentary toiletries'
    ]
  },
  {
    id: 3,
    image: 'pic2.jpg',
    heading: 'Standard Room',
    description: 'Cozy and comfortable with city views. Includes 1 bed, 1 bathroom, and is perfect for solo travelers or couples. Non-smoking and budget-friendly.',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: '35',
    view: 'City',
    nonSmoking: true,
    discountedPrice: 'R1,800',
    isFavorite: false,
    checkIn: '2024-10-10',
    checkOut: '2024-10-12',
    reviews: 4.4,
    isBooked: false,
    nights: 2,
    amenities: [
      'City view',
      'Queen-size bed',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Coffee maker',
      'Complimentary toiletries'
    ]
  },
  {
    id: 4,
    image: 'pic2.jpg',
    heading: 'Executive Suite',
    description: 'Elegant suite with a garden view, featuring 2 beds, 2 bathrooms, and ample space for business or leisure stays. Non-smoking and luxurious.',
    guests: 3,
    beds: 2,
    isFavorite: false,
    bathrooms: 2,
    size: '80',
    view: 'Garden',
    nonSmoking: true,
    discountedPrice: 'R3,500',
    checkIn: '2024-10-12',
    checkOut: '2024-10-15',
    reviews: 4.4,
    isBooked: false,
    nights: 3,
    amenities: [
      'Garden view',
      'Two king-size beds',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Coffee maker',
      'In-room safe',
      'Luxurious bathrobes',
      'Complimentary toiletries'
    ]
  },
  {
    id: 5,
    image: 'pic2.jpg',
    heading: 'Penthouse Suite',
    description: 'The pinnacle of luxury with panoramic views. Includes 2 beds, 2 bathrooms, and is perfect for guests seeking top-tier comfort. Non-smoking and expansive.',
    guests: 4,
    beds: 2,
    bathrooms: 2,
    size: '100',
    view: 'Panoramic',
    nonSmoking: true,
    isFavorite: false,
    discountedPrice: 'R5,000',
    checkIn: '2024-10-15',
    checkOut: '2024-10-20',
    reviews: 4.8,
    isBooked: true,
    nights: 5,
    amenities: [
      'Panoramic view',
      'Two king-size beds',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini bar',
      'Private terrace',
      'Jacuzzi',
      'Luxurious bathrobes',
      'Complimentary toiletries'
    ]
  },
  {
    id: 6,
    image: 'pic2.jpg',
    heading: 'Family Room',
    description: 'Ideal for larger groups or families, featuring 3 beds, 1 bathroom, and a park view. Non-smoking and offers flexible pricing for extended stays.',
    guests: 5,
    beds: 3,
    bathrooms: 1,
    size: '70',
    view: 'Park',
    nonSmoking: false,
    discountedPrice: 'R4,000',
    checkIn: '2024-10-20',
    checkOut: '2024-10-25',
    reviews: 4.5,
    isFavorite: false,
    isBooked: false,
    nights: 5,
    amenities: [
      'Park view',
      'Three queen-size beds',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Coffee maker',
      'Complimentary toiletries'
    ]
  },
  {
    id: 7,
    image: 'pic2.jpg',
    heading: 'Single Room',
    description: 'Compact room for solo travelers with city views. Includes 1 bed, 1 bathroom, and a non-smoking environment. Ideal for a budget stay.',
    guests: 1,
    beds: 1,
    bathrooms: 1,
    size: '20',
    view: 'Street',
    nonSmoking: true,
    discountedPrice: 'R1,200',
    checkIn: '2024-10-25',
    checkOut: '2024-10-28',
    isFavorite: false,
    reviews: 3.9,
    isBooked: true,
    nights: 3,
    amenities: [
      'Street view',
      'Single bed',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Complimentary toiletries'
    ]
  },
  {
    id: 8,
    image: 'pic2.jpg',
    heading: 'Double Room',
    description: 'Perfect for couples or friends, featuring 2 beds, 1 bathroom, and a garden view. Offers a non-smoking environment and comfortable stay.',
    guests: 2,
    beds: 2,
    bathrooms: 1,
    size: '30',
    view: 'Garden',
    nonSmoking: false,
    discountedPrice: 'R2,000',
    checkIn: '2024-10-28',

    checkOut: '2024-10-31',
    reviews: 4.1,
    isBooked: false,
    isFavorite: false,
    nights: 3,
    amenities: [
      'Garden view',
      'Two single beds',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Complimentary toiletries'
    ]
  },
  {
    id: 9,
    image: 'pic2.jpg',
    heading: 'Suite Room',
    description: 'Well-appointed suite with city views, featuring 1 bed and 2 bathrooms. Designed for a comfortable stay for 2 guests. Non-smoking and elegant.',
    guests: 2,
    beds: 1,
    bathrooms: 2,
    size: '55',
    view: 'City',
    nonSmoking: true,
    discountedPrice: 'R2,800',
    checkIn: '2024-10-31',
    checkOut: '2024-11-03',
    reviews: 4.2,
    isFavorite: false,
    isBooked: true,
    nights: 3,
    amenities: [
      'City view',
      'King-size bed',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Coffee maker',
      'In-room safe',
      'Luxurious bathrobes',
      'Complimentary toiletries'
    ]
  },
  {
    id: 10,
    image: 'pic2.jpg',
    heading: 'Junior Suite',
    description: 'Stylish suite with pool views, featuring 1 bed and 1 bathroom. Ideal for a short stay, offering comfort and non-smoking amenities.',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: '45',
    isFavorite: false,
    view: 'Pool',
    nonSmoking: true,
    discountedPrice: 'R2,200',
    checkIn: '2024-11-03',
    checkOut: '2024-11-07',
    reviews: 3.5,
    isBooked: false,
    nights: 4,
    amenities: [
      'Pool view',
      'King-size bed',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Complimentary toiletries'
    ]
  },
  {
    id: 11,
    image: 'pic2.jpg',
    heading: 'Executive Room',
    description: 'Luxurious room with city views, featuring 1 bed, 1 bathroom, and a modern design. Perfect for business or leisure stays.',
    guests: 2,
    beds: 1,
    bathrooms: 1,
    isFavorite: false,
    size: '50',
    view: 'City',
    nonSmoking: true,
    discountedPrice: 'R3,000',
    checkIn: '2024-11-07',
    checkOut: '2024-11-10',
    reviews: 4.1,
    isBooked: false,
    nights: 3,
    amenities: [
      'City view',
      'King-size bed',
      'Air conditioning',
      'Wi-Fi',
      'Flat-screen TV',
      'Mini fridge',
      'Coffee maker',
      'Complimentary toiletries'
    ]
  }
];

const deleteAllRooms = async () => {
  try {
    const roomsCollectionRef = collection(db, "hotelRooms");
    const querySnapshot = await getDocs(roomsCollectionRef);

    if (querySnapshot.empty) {
      console.log("No rooms found to delete.");
      return;
    }

    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, "hotelRooms", document.id));
      console.log(`Room with ID ${document.id} deleted.`);
    }
    
    console.log("All rooms deleted!");
  } catch (e) {
    console.error("Error deleting rooms: ", e);
  }
};

export const uploadRoomsToFirestore = async () => {
  try {
    await deleteAllRooms(); // Ensure all existing rooms are deleted

    const roomsCollectionRef = collection(db, "hotelRooms");

    // Wait for deletion to complete before proceeding
    console.log("Waiting for deletion to complete...");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds

    for (const room of rooms) {
      // Check if room with the same ID already exists
      const q = query(roomsCollectionRef, where("id", "==", room.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add new room if not found
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