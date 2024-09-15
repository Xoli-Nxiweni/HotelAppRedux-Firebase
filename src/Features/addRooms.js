// import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
// import serviceAccount from './path/to/your-service-account-file.json';

// initializeApp({
//   credential: _credential.cert(serviceAccount),
//   databaseURL: '  '
// });

// const db = firestore();

// const rooms = [
// //   {
// //     id: 1,
// //     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg', 
// //     heading: 'Luxury Suite',
// //     location: 'Johannesburg, South Africa',
// //     reviews: '4.5',
// //     originalPrice: 'R2,800',
// //     discountedPrice: 'R2,400',
// //     nights: '3 nights'
// //   },
//   {
//     id: 2,
//     image: 'https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',
//     heading: 'Standard Room',
//     location: 'Cape Town, South Africa',
//     reviews: '4.1',
//     originalPrice: 'R1,700',
//     discountedPrice: 'R1,300',
//     nights: '2 nights'
//   },
//   {
//     id: 3,
//     image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
//     heading: 'Deluxe Room',
//     location: 'Durban, South Africa',
//     reviews: '4.3',
//     originalPrice: 'R2,900',
//     discountedPrice: 'R2,400',
//     nights: '4 nights'
//   },
//   {
//     id: 4,
//     image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
//     heading: 'Family Suite',
//     location: 'Pretoria, South Africa',
//     reviews: '4.7',
//     originalPrice: 'R3,800',
//     discountedPrice: 'R3,300',
//     nights: '5 nights'
//   },
//   {
//     id: 5,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Beachfront Room',
//     location: 'Port Elizabeth, South Africa',
//     reviews: '4.2',
//     originalPrice: 'R2,300',
//     discountedPrice: 'R1,900',
//     nights: '3 nights'
//   },
//   {
//     id: 6,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Penthouse Suite',
//     location: 'Sandton, South Africa',
//     reviews: '4.8',
//     originalPrice: 'R5,900',
//     discountedPrice: 'R5,200',
//     nights: '2 nights'
//   },
//   {
//     id: 7,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Corner Suite',
//     location: 'Stellenbosch, South Africa',
//     reviews: '4.6',
//     originalPrice: 'R3,500',
//     discountedPrice: 'R3,000',
//     nights: '3 nights'
//   },
//   {
//     id: 8,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'One-Bedroom Suite',
//     location: 'Durban, South Africa',
//     reviews: '4.4',
//     originalPrice: 'R3,700',
//     discountedPrice: 'R3,100',
//     nights: '4 nights'
//   },
//   {
//     id: 9,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Executive Suite',
//     location: 'Cape Town, South Africa',
//     reviews: '4.7',
//     originalPrice: 'R4,400',
//     discountedPrice: 'R3,700',
//     nights: '3 nights'
//   },
//   {
//     id: 10,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Garden View Room',
//     location: 'Bloemfontein, South Africa',
//     reviews: '4.0',
//     originalPrice: 'R1,900',
//     discountedPrice: 'R1,500',
//     nights: '2 nights'
//   },
//   {
//     id: 11,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Panorama Suite',
//     location: 'Knysna, South Africa',
//     reviews: '4.8',
//     originalPrice: 'R5,300',
//     discountedPrice: 'R4,600',
//     nights: '5 nights'
//   },
//   {
//     id: 12,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Grand Luxe Room',
//     location: 'Franschhoek, South Africa',
//     reviews: '4.7',
//     originalPrice: 'R3,700',
//     discountedPrice: 'R3,100',
//     nights: '4 nights'
//   }
// ];

// rooms.forEach(async (room) => {
//   await db.collection('rooms').doc(room.id.toString()).set(room);
// });

// console.log('Rooms added to Firestore');

// [
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": ,
    //   "view": "",
    //   "checkIn": "2024-10-05",
    //   "checkOut": "2024-10-10",
    //   "nights": ,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": true,
    //   "nonSmoking": false,
    //   "reviews": ,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": ,
    //   "view": "",
    //   "checkIn": "2024-10-31",
    //   "checkOut": "2024-11-03",
    //   "nights": ,
    //   "discountedPrice": "",
    //   "isBooked": true,
    //   "isFavorite": false,
    //   "nonSmoking": true,
    //   "reviews": ,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": ,
    //   "view": "",
    //   "checkIn": "2024-10-15",
    //   "checkOut": "2024-10-20",
    //   "nights": ,
    //   "discountedPrice": "",
    //   "isBooked": true,
    //   "isFavorite": false,
    //   "nonSmoking": true,
    //   "reviews": ,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": ,
    //   "view": "",
    //   "checkIn": "2024-10-25",
    //   "checkOut": "2024-10-28",
    //   "nights": ,
    //   "discountedPrice": "",
    //   "isBooked": true,
    //   "isFavorite": false,
    //   "nonSmoking": true,
    //   "reviews": ,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": ,
    //   "view": "",
    //   "checkIn": "2024-11-03",
    //   "checkOut": "2024-11-07",
    //   "nights": ,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": false,
    //   "nonSmoking": true,
    //   "reviews": ,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": 3,
    //   "bathrooms": 1,
    //   "guests": 5,
    //   "view": ",
    //   "checkIn": "2024-10-20",
    //   "checkOut": "2024-10-25",
    //   "nights": 5,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": false,
    //   "nonSmoking": false,
    //   "reviews": 4.5,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": 2,
    //   "bathrooms": 1,
    //   "guests": 2,
    //   "view": "",
    //   "checkIn": "2024-10-28",
    //   "checkOut": "2024-10-31",
    //   "nights": ,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": false,
    //   "nonSmoking": false,
    //   "reviews": 4.1,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": ,
    //   "view": "Ocean",
    //   "checkIn": "",
    //   "checkOut": "",
    //   "nights": 3,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": false,
    //   "nonSmoking": true,
    //   "reviews": 4.8,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "",
    //   "beds": ,
    //   "bathrooms": ,
    //   "guests": 4,
    //   "view": "",
    //   "checkIn": "2024-11-01",
    //   "checkOut": "2024-11-07",
    //   "nights": 6,
    //   "discountedPrice": "",
    //   "isBooked": true,
    //   "isFavorite": true,
    //   "nonSmoking": true,
    //   "reviews": 5.0,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "40",
    //   "beds": 1,
    //   "bathrooms": 1,
    //   "guests": 2,
    //   "view": "Park",
    //   "checkIn": "2024-11-10",
    //   "checkOut": "2024-11-13",
    //   "nights": 3,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": true,
    //   "nonSmoking": false,
    //   "reviews": 4.0,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
    // {
    //   "heading": "",
    //   "description": "",
    //   "image": "",
    //   "size": "25",
    //   "beds": 1,
    //   "bathrooms": 1,
    //   "guests": 1,
    //   "view": "City",
    //   "checkIn": "2024-10-15",
    //   "checkOut": "2024-10-18",
    //   "nights": 3,
    //   "discountedPrice": "",
    //   "isBooked": false,
    //   "isFavorite": false,
    //   "nonSmoking": false,
    //   "reviews": 3.5,
    //   "amenities": [
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ]
    // },
//     {
//       "heading": "",
//       "description": "",
//       "image": "https://cdn5.civitatis.com/usa/miami/extra/39360_1421428130.jpg",
//       "size": "150",
//       "beds": 3,
//       "bathrooms": 3,
//       "guests": 6,
//       "view": "Private",
//       "checkIn": "2024-11-20",
//       "checkOut": "2024-11-30",
//       "nights": 10,
//       "discountedPrice": "",
//       "isBooked": true,
//       "isFavorite": true,
//       "nonSmoking": true,
//       "reviews": 4.9,
//       "amenities": [
//         "",
//         "",
//         "",
//         "",
//         "",
//         "",
//         "",
//         "",
//         "",
//         ""
//       ]
//     },
//     {
//       "heading": "Oceanview Room",
//       "description": "Bright room with ocean views, perfect for relaxation. Features 1 bed, 1 bathroom, and a non-smoking environment. Ideal for a peaceful stay.",
//       "image": "https://i.imgur.com/T8rJSo3.jpg",
//       "size": "35",
//       "beds": 1,
//       "bathrooms": 1,
//       "guests": 2,
//       "view": "Ocean",
//       "checkIn": "2024-11-05",
//       "checkOut": "2024-11-10",
//       "nights": 5,
//       "discountedPrice": "R2,200",
//       "isBooked": false,
//       "isFavorite": true,
//       "nonSmoking": true,
//       "reviews": 4.3,
//       "amenities": [
//         "Ocean view",
//         "King-size bed",
//         "Air conditioning",
//         "Wi-Fi",
//         "Flat-screen TV",
//         "Mini fridge",
//         "Complimentary toiletries"
//       ]
//     }
//   ]
  