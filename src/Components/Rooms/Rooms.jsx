// import './Rooms.css';
// import { IoSearchSharp } from "react-icons/io5";
// import { IoIosStar } from "react-icons/io";

// const roomList = [
//   {
//     id: 1,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg', 
//     heading: 'Luxury Suite',
//     location: 'Johannesburg, South Africa',
//     reviews: '4.5/5',
//     originalPrice: 'R2,560',
//     discountedPrice: 'R2,000',
//     nights: '2 nights'
//   },
//   {
//     id: 2,
//     image: 'https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',
//     heading: 'Standard Room',
//     location: 'Cape Town, South Africa',
//     reviews: '4/5',
//     originalPrice: 'R1,800',
//     discountedPrice: 'R1,400',
//     nights: '3 nights'
//   },
//   {
//     id: 3,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg', 
//     heading: 'Luxury Suite',
//     location: 'Johannesburg, South Africa',
//     reviews: '4.5/5',
//     originalPrice: 'R2,560',
//     discountedPrice: 'R2,000',
//     nights: '2 nights'
//   },
//   {
//     id: 4,
//     image: 'https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',
//     heading: 'Standard Room',
//     location: 'Cape Town, South Africa',
//     reviews: '4/5',
//     originalPrice: 'R1,800',
//     discountedPrice: 'R1,400',
//     nights: '3 nights'
//   },
// ];

// const Rooms = () => {

//     const handlePopUp = ()=>{
        
//     }
//   return (
//     <div className='Rooms'>
//       <div className="topPart">
//         <div className="searchPart">
//           <IoSearchSharp />
//           <input type="text" placeholder='Where to sleep?' />
//         </div>
//         <div className="checkIn">
//           <label htmlFor="checkIn">Check in</label>
//           <input type="date" id="checkIn" className='dateInput' />
//         </div>
//         <div className="checkOut">
//           <label htmlFor="checkOut">Check out</label>
//           <input type="date" id="checkOut" className='dateInput' />
//         </div>
//         <div className="guestsAndRooms">
//           <label htmlFor="guests">Guests and rooms</label>
//           <div className="dropDowns">
//             <select id="guests" className='guestsSelect'>
//               <option value="">Guests</option>
//               <option value="1">1 Guest</option>
//               <option value="2">2 Guests</option>
//               <option value="3">3 Guests</option>
//               <option value="4">4 Guests</option>
//               <option value="5">5 Guests</option>
//               <option value="6">6 Guests</option>
//             </select>
//             <select id="rooms" className='roomsSelect'>
//               <option value="">Rooms</option>
//               <option value="1">1 Room</option>
//               <option value="2">2 Rooms</option>
//               <option value="3">3 Rooms</option>
//             </select>
//           </div>
//         </div>
//         <button className='searchBtn'>Search</button>
//       </div>

//       <div className="bottomPart">
//         <div className="terms">
//         <h2>Our available rooms for the week and weekends</h2>
//         <p>Save on stays with us</p>
//         </div>
//         <div className="roomCard">
//           {roomList.map(room => (
//             <div key={room.id} className="card" onClick={handlePopUp}>
//               <img src={room.image} alt={room.heading} />
//               <h4>{room.heading}</h4>
//               <p>{room.location}</p>
//               <div className="reviews">
//               <b>{room.reviews} <IoIosStar/> </b>
//               </div>
//               <div className="cardBottom">
//                 <p>{room.nights}, <s>{room.originalPrice}</s>  </p><span>{room.discountedPrice}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Rooms;

// import './Rooms.css';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { IoSearchSharp } from "react-icons/io5";
// import { IoIosStar } from "react-icons/io";

// const roomList = [
//   {
//     id: 1,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg', 
//     heading: 'Luxury Suite',
//     location: 'Johannesburg, South Africa',
//     reviews: '4.5/5',
//     originalPrice: 'R2,800',
//     discountedPrice: 'R2,400',
//     nights: '3 nights'
//   },
//   {
//     id: 2,
//     image: 'https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',
//     heading: 'Standard Room',
//     location: 'Cape Town, South Africa',
//     reviews: '4.1/5',
//     originalPrice: 'R1,700',
//     discountedPrice: 'R1,300',
//     nights: '2 nights'
//   },
//   {
//     id: 3,
//     image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
//     heading: 'Deluxe Room',
//     location: 'Durban, South Africa',
//     reviews: '4.3/5',
//     originalPrice: 'R2,900',
//     discountedPrice: 'R2,400',
//     nights: '4 nights'
//   },
//   {
//     id: 4,
//     image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
//     heading: 'Family Suite',
//     location: 'Pretoria, South Africa',
//     reviews: '4.7/5',
//     originalPrice: 'R3,800',
//     discountedPrice: 'R3,300',
//     nights: '5 nights'
//   },
//   {
//     id: 5,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Beachfront Room',
//     location: 'Port Elizabeth, South Africa',
//     reviews: '4.2/5',
//     originalPrice: 'R2,300',
//     discountedPrice: 'R1,900',
//     nights: '3 nights'
//   },
//   {
//     id: 6,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Penthouse Suite',
//     location: 'Sandton, South Africa',
//     reviews: '4.9/5',
//     originalPrice: 'R5,900',
//     discountedPrice: 'R5,200',
//     nights: '2 nights'
//   },
//   {
//     id: 7,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Corner Suite',
//     location: 'Stellenbosch, South Africa',
//     reviews: '4.6/5',
//     originalPrice: 'R3,500',
//     discountedPrice: 'R3,000',
//     nights: '3 nights'
//   },
//   {
//     id: 8,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'One-Bedroom Suite',
//     location: 'Durban, South Africa',
//     reviews: '4.4/5',
//     originalPrice: 'R3,700',
//     discountedPrice: 'R3,100',
//     nights: '4 nights'
//   },
//   {
//     id: 9,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Executive Suite',
//     location: 'Cape Town, South Africa',
//     reviews: '4.7/5',
//     originalPrice: 'R4,400',
//     discountedPrice: 'R3,700',
//     nights: '3 nights'
//   },
//   {
//     id: 10,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Garden View Room',
//     location: 'Bloemfontein, South Africa',
//     reviews: '4.0/5',
//     originalPrice: 'R1,900',
//     discountedPrice: 'R1,500',
//     nights: '2 nights'
//   },
//   {
//     id: 11,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Panorama Suite',
//     location: 'Knysna, South Africa',
//     reviews: '4.8/5',
//     originalPrice: 'R5,300',
//     discountedPrice: 'R4,600',
//     nights: '5 nights'
//   },
//   {
//     id: 12,
//     image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
//     heading: 'Grand Luxe Room',
//     location: 'Franschhoek, South Africa',
//     reviews: '4.7/5',
//     originalPrice: 'R3,700',
//     discountedPrice: 'R3,100',
//     nights: '4 nights'
//   }
// ];



// const Rooms = () => {
//   // State for managing the popup visibility and selected room details
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   // Function to handle opening the popup with room details
//   const handlePopUp = (room) => {
//     setSelectedRoom(room);
//   };

//   // Function to close the popup
//   const closePopUp = () => {
//     setSelectedRoom(null);
//   };

//   return (
//     <div className='Rooms'>
//       <div className="topPart">
//         <div className="searchPart">
//           <IoSearchSharp />
//           <input type="text" placeholder='Where to sleep?' />
//         </div>
//         <div className="checkIn">
//           <label htmlFor="checkIn">Check in</label>
//           <input type="date" id="checkIn" className='dateInput' />
//         </div>
//         <div className="checkOut">
//           <label htmlFor="checkOut">Check out</label>
//           <input type="date" id="checkOut" className='dateInput' />
//         </div>
//         <div className="guestsAndRooms">
//           <label htmlFor="guests">Guests and rooms</label>
//           <div className="dropDowns">
//             <select id="guests" className='guestsSelect'>
//               <option value="">Guests</option>
//               <option value="1">1 Guest</option>
//               <option value="2">2 Guests</option>
//               <option value="3">3 Guests</option>
//               <option value="4">4 Guests</option>
//               <option value="5">5 Guests</option>
//               <option value="6">6 Guests</option>
//             </select>
//             <select id="rooms" className='roomsSelect'>
//               <option value="">Rooms</option>
//               <option value="1">1 Room</option>
//               <option value="2">2 Rooms</option>
//               <option value="3">3 Rooms</option>
//             </select>
//           </div>
//         </div>
//         <button className='searchBtn'>Search</button>
//       </div>

//       <div className="bottomPart">
//         <div className="terms">
//           <h2>Our available rooms for the week and weekends</h2>
//           <p>Save on stays with us</p>
//         </div>
//         <div className="roomCard">
//           {roomList.map(room => (
//             <div key={room.id} className="card" onClick={() => handlePopUp(room)}>
//               <img src={room.image} alt={room.heading} />
//               <h4>{room.heading}</h4>
//               <p>{room.location}</p>
//               <div className="reviews">
//                 <b>{room.reviews} <IoIosStar/></b>
//               </div>
//               <div className="cardBottom">
//                 <p>{room.nights}, <s>{room.originalPrice}</s>  </p><span>{room.discountedPrice}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Popup component */}
//       {selectedRoom && (
//         <div className="popupOverlay" onClick={closePopUp}>
//           <div className="popupContent" onClick={(e) => e.stopPropagation()}>
//             <button className="closeBtn" onClick={closePopUp}>X</button>
//             <img src={selectedRoom.image} alt={selectedRoom.heading} />
//             <h3>{selectedRoom.heading}</h3>
//             <p>{selectedRoom.location}</p>
//             <p>{selectedRoom.nights}</p>
//             <p>{selectedRoom.reviews}</p>
//             <p><s>{selectedRoom.originalPrice}</s> <b>{selectedRoom.discountedPrice}</b></p>
//             <Link to='/booking'>
//             <button className="bookNowBtn" >Book Now</button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Rooms;

import './Rooms.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

const roomList = [
  {
    id: 1,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg', 
    heading: 'Luxury Suite',
    location: 'Johannesburg, South Africa',
    reviews: '4.5/5',
    originalPrice: 'R2,800',
    discountedPrice: 'R2,400',
    nights: '3 nights'
  },
  {
    id: 2,
    image: 'https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',
    heading: 'Standard Room',
    location: 'Cape Town, South Africa',
    reviews: '4.1/5',
    originalPrice: 'R1,700',
    discountedPrice: 'R1,300',
    nights: '2 nights'
  },
  {
    id: 3,
    image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
    heading: 'Deluxe Room',
    location: 'Durban, South Africa',
    reviews: '4.3/5',
    originalPrice: 'R2,900',
    discountedPrice: 'R2,400',
    nights: '4 nights'
  },
  {
    id: 4,
    image: 'https://media.timeout.com/images/105211701/750/422/image.jpg',
    heading: 'Family Suite',
    location: 'Pretoria, South Africa',
    reviews: '4.7/5',
    originalPrice: 'R3,800',
    discountedPrice: 'R3,300',
    nights: '5 nights'
  },
  {
    id: 5,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Beachfront Room',
    location: 'Port Elizabeth, South Africa',
    reviews: '4.2/5',
    originalPrice: 'R2,300',
    discountedPrice: 'R1,900',
    nights: '3 nights'
  },
  {
    id: 6,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Penthouse Suite',
    location: 'Sandton, South Africa',
    reviews: '4.9/5',
    originalPrice: 'R5,900',
    discountedPrice: 'R5,200',
    nights: '2 nights'
  },
  {
    id: 7,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Corner Suite',
    location: 'Stellenbosch, South Africa',
    reviews: '4.6/5',
    originalPrice: 'R3,500',
    discountedPrice: 'R3,000',
    nights: '3 nights'
  },
  {
    id: 8,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'One-Bedroom Suite',
    location: 'Durban, South Africa',
    reviews: '4.4/5',
    originalPrice: 'R3,700',
    discountedPrice: 'R3,100',
    nights: '4 nights'
  },
  {
    id: 9,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Executive Suite',
    location: 'Cape Town, South Africa',
    reviews: '4.7/5',
    originalPrice: 'R4,400',
    discountedPrice: 'R3,700',
    nights: '3 nights'
  },
  {
    id: 10,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Garden View Room',
    location: 'Bloemfontein, South Africa',
    reviews: '4.0/5',
    originalPrice: 'R1,900',
    discountedPrice: 'R1,500',
    nights: '2 nights'
  },
  {
    id: 11,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Panorama Suite',
    location: 'Knysna, South Africa',
    reviews: '4.8/5',
    originalPrice: 'R5,300',
    discountedPrice: 'R4,600',
    nights: '5 nights'
  },
  {
    id: 12,
    image: 'https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg',
    heading: 'Grand Luxe Room',
    location: 'Franschhoek, South Africa',
    reviews: '4.7/5',
    originalPrice: 'R3,700',
    discountedPrice: 'R3,100',
    nights: '4 nights'
  }
];

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null); // Popup state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [filteredRooms, setFilteredRooms] = useState(roomList); // Filtered room list state

  // Function to handle the popup opening
  const handlePopUp = (room) => {
    setSelectedRoom(room);
  };

  // Function to close the popup
  const closePopUp = () => {
    setSelectedRoom(null);
  };

  // Function to handle the search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = roomList.filter(room =>
      room.heading.toLowerCase().includes(query) ||
      room.location.toLowerCase().includes(query)
    );
    setFilteredRooms(filtered);
  };

  return (
    <div className='Rooms'>
      <div className="topPart">
        <div className="searchPart">
          <IoSearchSharp />
          <input
            type="text"
            placeholder='Where to sleep?'
            value={searchQuery}
            onChange={handleSearchChange} // Attach the search handler here
          />
        </div>
        <div className="checkIn">
          <label htmlFor="checkIn">Check in</label>
          <input type="date" id="checkIn" className='dateInput' />
        </div>
        <div className="checkOut">
          <label htmlFor="checkOut">Check out</label>
          <input type="date" id="checkOut" className='dateInput' />
        </div>
        <div className="guestsAndRooms">
          <label htmlFor="guests">Guests and rooms</label>
          <div className="dropDowns">
            <select id="guests" className='guestsSelect'>
              <option value="">Guests</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
            </select>
            <select id="rooms" className='roomsSelect'>
              <option value="">Rooms</option>
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
            </select>
          </div>
        </div>
        <button className='searchBtn'>Search</button>
      </div>

      <div className="bottomPart">
        <div className="terms">
          <h2>Our available rooms for the week and weekends</h2>
          <p>Save on stays with us</p>
        </div>
        <div className="roomCard">
          {filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <div key={room.id} className="card" onClick={() => handlePopUp(room)}>
                <img src={room.image} alt={room.heading} />
                <h4>{room.heading}</h4>
                <p>{room.location}</p>
                <div className="reviews">
                  <b>{room.reviews} <IoIosStar /></b>
                </div>
                <div className="cardBottom">
                  <p>{room.nights}, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No rooms found matching your search criteria.</p>
          )}
        </div>
      </div>

      {/* Popup component */}
      {selectedRoom && (
        <div className="popupOverlay" onClick={closePopUp}>
          <div className="popupContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeBtn" onClick={closePopUp}>X</button>
            <img src={selectedRoom.image} alt={selectedRoom.heading} />
            <h3>{selectedRoom.heading}</h3>
            <p>{selectedRoom.location}</p>
            <p>{selectedRoom.nights}</p>
            <p>{selectedRoom.reviews}</p>
            <p><s>{selectedRoom.originalPrice}</s> <b>{selectedRoom.discountedPrice}</b></p>
            <Link to='/booking'>
              <button className="bookNowBtn">Book Now</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
