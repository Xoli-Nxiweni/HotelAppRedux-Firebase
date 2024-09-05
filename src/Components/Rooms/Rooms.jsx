// import './Rooms.css';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { IoSearchSharp } from "react-icons/io5";
// import { IoIosStar } from "react-icons/io";
// import { db } from "../../Firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";
// // import { signInWithCredential } from 'firebase/auth';
// import { useSelector } from 'react-redux';


// const Rooms = () => {
//   const [selectedRoom, setSelectedRoom] = useState(null); // Popup state
//   const roomList = useSelector((state)=> state.rooms)
//   const [searchQuery, setSearchQuery] = useState(''); // Search query state
//   const [filteredRooms, setFilteredRooms] = useState(roomList); // Filtered room list state
//   const [rooms, setRooms] = useState([]);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const navigate = useNavigate();
  


//   useEffect(() => {
//     const fetchRooms = async () => {
//       const roomsCollection = collection(db, "hotelRooms");
//       const roomSnapshot = await getDocs(roomsCollection);
//       const fetchedRooms = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setRooms(fetchedRooms);
//       setFilteredRooms(fetchedRooms); // Initialize filteredRooms with fetched data
//     };
  
//     fetchRooms();
//   }, []);
  
//   // useEffect(() => {
//   //   const debounceTimeout = setTimeout(() => {
//   //     handleSearch();
//   //   }, 300); // Adjust the debounce time as needed
  
//   //   return () => clearTimeout(debounceTimeout);
//   // }, [searchQuery]);
  

//   // Function to handle the popup opening
//   const handlePopUp = (room) => {
//     setSelectedRoom(room);
//   };

//   // Function to close the popup
//   const closePopUp = () => {
//     setSelectedRoom(null);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSearch = () => {
//     const filtered = roomList.filter(room =>
//       room.heading.toLowerCase().includes(searchQuery) ||
//       room.location.toLowerCase().includes(searchQuery)
//     );
//     setFilteredRooms(filtered);
//   };

//   const handleBookNow = () => {
//     if (isAuthenticated) {
//       navigate('/booking');
//     } else {
//       navigate('/signUp');
      
//     }
//   };
  

//   return (
//     <div className='Rooms'>
//       <div className="topPart">
//         <div className="searchPart">
//           <IoSearchSharp />
//           <input
//             type="text"
//             placeholder='Where to sleep?'
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
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
//         <button className='searchBtn' onClick={handleSearch}>Search</button>
//       </div>

//       <div className="bottomPart">
//         <div className="roomCard">
//           {filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div key={room.id} className="card" onClick={() => handlePopUp(room)}>
//                 <img src={room.image} alt={room.heading} />
//                 <h4>{room.heading}</h4>
//                 <p>{room.location}</p>
//                 <div className="reviews">
//                   <b>{room.reviews} <IoIosStar /></b>
//                 </div>
//                 <div className="cardBottom">
//                   <p>{room.nights}, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No rooms found matching your search criteria.</p>
//           )}
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
//             <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rooms;

// import './Rooms.css';
// import { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IoSearchSharp } from "react-icons/io5";
// import { IoIosStar } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms, setSearchQuery } from '../../features/slices/roomSlice';

// const Rooms = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
//     rooms: state.rooms.rooms,
//     filteredRooms: state.rooms.filteredRooms,
//     searchQuery: state.rooms.searchQuery,
//     selectedRoom: state.rooms.selectedRoom,
//     status: state.rooms.status,
//     error: state.rooms.error,
//   }));

//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchRooms());
//     }
//   }, [dispatch, status]);

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     dispatch(setSearchQuery(query));
//   };

//   const handleSearch = useCallback(() => {
//     dispatch(setSearchQuery(searchQuery));
//   }, [dispatch, searchQuery]);

//   const handlePopUp = (room) => {
//     dispatch(setSelectedRoom(room));
//   };

//   const closePopUp = () => {
//     dispatch(clearSelectedRoom());
//   };

//   const handleBookNow = () => {
//     if (isAuthenticated) {
//       navigate('/booking');
//     } else {
//       navigate('/signUp');
//     }
//   };

//   return (
//     <div className='Rooms'>
//       <div className="topPart">
//         <div className="searchPart">
//           <IoSearchSharp />
//           <input
//             type="text"
//             placeholder='Where to sleep?'
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
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
//         <button className='searchBtn' onClick={handleSearch}>Search</button>
//       </div>

//       <div className="bottomPart">
//         <div className="roomCard">
//           {status === 'loading' && <p>Loading rooms...</p>}
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div key={room.id} className="card" onClick={() => handlePopUp(room)}>
//                 <img src={room.image} alt={room.heading} />
//                 <h4>{room.heading}</h4>
//                 <p>{room.location}</p>
//                 <div className="reviews">
//                   <b>{room.reviews} <IoIosStar /></b>
//                 </div>
//                 <div className="cardBottom">
//                   <p>{room.nights}, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No rooms found matching your search criteria.</p>
//           )}
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
//             <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rooms;


// import './Rooms.css';
// import { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IoSearchSharp } from "react-icons/io5";
// import { IoIosStar } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom } from '../../Features/slices/roomSlice';

// const Rooms = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
//     rooms: state.rooms.rooms,
//     filteredRooms: state.rooms.filteredRooms,
//     searchQuery: state.rooms.searchQuery,
//     selectedRoom: state.rooms.selectedRoom,
//     status: state.rooms.status,
//     error: state.rooms.error,
//   }));

//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchRooms());
//     }
//   }, [dispatch, status]);

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     dispatch(setSearchQuery(query));
//   };

//   const handleSearch = useCallback(() => {
//     dispatch(setSearchQuery(searchQuery));
//   }, [dispatch, searchQuery]);

//   const handlePopUp = (room) => {
//     dispatch(setSelectedRoom(room));
//   };

//   const closePopUp = () => {
//     dispatch(clearSelectedRoom());
//   };

//   const handleBookNow = () => {
//     if (isAuthenticated) {
//       navigate('/booking');
//     } else {
//       navigate('/signUp');
//     }
//   };

//   import firebase from 'firebase/app';
// import 'firebase/auth';

// const user = firebase.auth().currentUser;
// if (user) {
//   console.log('User is authenticated:', user.uid);
// } else {
//   console.log('User is not authenticated');
// }


//   return (
//     <div className='Rooms'>
//       <div className="topPart">
//         <div className="searchPart">
//           <IoSearchSharp />
//           <input
//             type="text"
//             placeholder='Where to sleep?'
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
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
//               {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>)}
//             </select>
//             <select id="rooms" className='roomsSelect'>
//               <option value="">Rooms</option>
//               {[1, 2, 3].map(num => <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>)}
//             </select>
//           </div>
//         </div>
//         <button className='searchBtn' onClick={handleSearch}>Search</button>
//       </div>

//       <div className="bottomPart">
//         <div className="roomCard">
//           {status === 'loading' && <p>Loading rooms...</p>}
//           {status === 'failed' && <p>Error: {error || 'Something went wrong.'}</p>}
//           {filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div key={room.id} className="card" onClick={() => handlePopUp(room)}>
//                 <img src={room.image} alt={room.heading} />
//                 <h4>{room.heading}</h4>
//                 <p>{room.location}</p>
//                 <div className="reviews">
//                   <b>{room.reviews} <IoIosStar /></b>
//                 </div>
//                 <div className="cardBottom">
//                   <p>{room.nights}, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No rooms found matching your search criteria.</p>
//           )}
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
//             <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rooms;

// import './Rooms.css';
// import { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IoSearchSharp } from "react-icons/io5";
// import { IoIosStar } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom } from '../../Features/slices/roomSlice';
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const Rooms = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
//     rooms: state.rooms.rooms,
//     filteredRooms: state.rooms.filteredRooms,
//     searchQuery: state.rooms.searchQuery,
//     selectedRoom: state.rooms.selectedRoom,
//     status: state.rooms.status,
//     error: state.rooms.error,
//   }));

//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchRooms());
//     }
//   }, [dispatch, status]);

//   useEffect(() => {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       console.log('User is authenticated:', user.uid);
//     } else {
//       console.log('User is not authenticated');
//     }
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     dispatch(setSearchQuery(query));
//   };

//   const handleSearch = useCallback(() => {
//     dispatch(setSearchQuery(searchQuery));
//   }, [dispatch, searchQuery]);

//   const handlePopUp = (room) => {
//     dispatch(setSelectedRoom(room));
//   };

//   const closePopUp = () => {
//     dispatch(clearSelectedRoom());
//   };

//   const handleBookNow = () => {
//     if (isAuthenticated) {
//       navigate('/booking');
//     } else {
//       navigate('/signUp');
//     }
//   };

//   return (
//     <div className='Rooms'>
//       <div className="topPart">
//         <div className="searchPart">
//           <IoSearchSharp />
//           <input
//             type="text"
//             placeholder='Where to sleep?'
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
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
//               {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>)}
//             </select>
//             <select id="rooms" className='roomsSelect'>
//               <option value="">Rooms</option>
//               {[1, 2, 3].map(num => <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>)}
//             </select>
//           </div>
//         </div>
//         <button className='searchBtn' onClick={handleSearch}>Search</button>
//       </div>

//       <div className="bottomPart">
//         <div className="roomCard">
//           {status === 'loading' && <p>Loading rooms...</p>}
//           {status === 'failed' && <p>Error: {error || 'Something went wrong.'}</p>}
//           {filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div key={room.id} className="card" onClick={() => handlePopUp(room)}>
//                 <img src={room.image} alt={room.heading} />
//                 <h4>{room.heading}</h4>
//                 <p>{room.location}</p>
//                 <div className="reviews">
//                   <b>{room.reviews} <IoIosStar /></b>
//                 </div>
//                 <div className="cardBottom">
//                   <p>{room.nights}, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No rooms found matching your search criteria.</p>
//           )}
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
//             <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rooms;

import './Rooms.css';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom } from '../../Features/slices/roomSlice';
import { auth } from '../../Firebase/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { uploadRoomsToFirestore } from '../../UploadRooms';


const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
    rooms: state.rooms.rooms,
    filteredRooms: state.rooms.filteredRooms,
    searchQuery: state.rooms.searchQuery,
    selectedRoom: state.rooms.selectedRoom,
    status: state.rooms.status,
    error: state.rooms.error,
  }));

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(()=>{
    uploadRoomsToFirestore()
  }, [])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is authenticated:', user.uid);
      } else {
        console.log('User is not authenticated');
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    dispatch(setSearchQuery(query));
  };

  const handleSearch = useCallback(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [dispatch, searchQuery]);

  const handlePopUp = (room) => {
    dispatch(setSelectedRoom(room));
  };

  const closePopUp = () => {
    dispatch(clearSelectedRoom());
  };

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/booking');
    } else {
      navigate('/booking');
    }
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
            onChange={handleSearchChange}
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
              {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>)}
            </select>
            <select id="rooms" className='roomsSelect'>
              <option value="">Rooms</option>
              {[1, 2, 3].map(num => <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>
        <button className='searchBtn' onClick={handleSearch}>Search</button>
      </div>

      <div className="bottomPart">
        <div className="roomCard">
          {status === 'loading' && <p>Loading rooms...</p>}
          {status === 'failed' && <p>Error: {error || 'Something went wrong.'}</p>}
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
            <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
