// import './Rooms.css';
// import { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IoSearchSharp } from 'react-icons/io5';
// import { IoIosStar } from 'react-icons/io';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom } from '../../Features/slices/roomSlice';
// import { auth } from '../../Firebase/firebase'; 
// import { onAuthStateChanged } from 'firebase/auth';

// const Rooms = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
//     rooms: state.rooms.rooms || [],
//     filteredRooms: state.rooms.filteredRooms || [],
//     searchQuery: state.rooms.searchQuery || '',
//     selectedRoom: state.rooms.selectedRoom || null,
//     status: state.rooms.status || 'idle',
//     error: state.rooms.error || null,
//   }));

//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     // Fetch rooms if not already fetching
//     if (status === 'idle') {
//       dispatch(fetchRooms());
//     }
//   }, [dispatch, status]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       console.log(user ? `User is authenticated: ${user.uid}` : 'User is not authenticated');
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     dispatch(setSearchQuery(query));
//   };

//   const handleSearch = useCallback(() => {
//     dispatch(setSearchQuery(searchQuery));
//   }, [dispatch, searchQuery]);

//   const handlePopUp = (room) => {
//     console.log('Selected room:', room);
//     dispatch(setSelectedRoom(room));
//   };

//   const closePopUp = () => {
//     dispatch(clearSelectedRoom());
//   };

//   const handleBookNow = () => {
//     if (isAuthenticated) {
//       navigate('/booking');
//     } else {
//       navigate('/login');
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
//               {[1, 2, 3, 4, 5, 6].map(num => (
//                 <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//               ))}
//             </select>
//             <select id="rooms" className='roomsSelect'>
//               <option value="">Rooms</option>
//               {[1, 2, 3].map(num => (
//                 <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
//               ))}
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
//                   <p>{room.nights} nights, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No rooms found matching your search criteria.</p>
//           )}
//         </div>
//       </div>

//       {selectedRoom && (
//         <div className="popupOverlay" onClick={closePopUp}>
//           <div className="popupContent" onClick={(e) => e.stopPropagation()}>
//             <button className="closeBtn" onClick={closePopUp}>×</button>
//             <img src={selectedRoom.image} alt={selectedRoom.heading} />
//             <h3>{selectedRoom.heading}</h3>
//             <p>{selectedRoom.location}</p>
//             <p>{selectedRoom.nights} nights</p>
//             <p>{selectedRoom.reviews} reviews</p>
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
// import { useEffect, useCallback, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IoSearchSharp } from 'react-icons/io5';
// import { IoIosStar } from 'react-icons/io';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom } from '../../Features/slices/roomSlice';
// import { auth } from '../../Firebase/firebase'; 
// import { onAuthStateChanged } from 'firebase/auth';

// const Rooms = () => {
//   const [popUp, setPopUp] = useState(false)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
//     rooms: state.rooms.rooms || [],
//     filteredRooms: state.rooms.filteredRooms || [],
//     searchQuery: state.rooms.searchQuery || '',
//     selectedRoom: state.rooms.selectedRoom || null,
//     status: state.rooms.status || 'idle',
//     error: state.rooms.error || null,
//   }));

//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const roomOpened = useSelector((state)=> state.rooms.roomOpened)

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchRooms());
//     }
//   }, [dispatch, status]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       console.log(user ? `User is authenticated: ${user.uid}` : 'User is not authenticated');
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     dispatch(setSearchQuery(query));
//   };

//   const handleSearch = useCallback(() => {
//     dispatch(setSearchQuery(searchQuery));
//   }, [dispatch, searchQuery]);

//   const handlePopUp = (room) => {
//     console.log('Selected room:', room);
//     dispatch(setSelectedRoom(room));
//   };

//   const closePopUp = () => {
//     dispatch(clearSelectedRoom());
//   };

//   const handleBookNow = () => {
//     if (isAuthenticated) {
//       navigate('/booking');
//     } else {
//       navigate('/login');
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
//               {[1, 2, 3, 4, 5, 6].map(num => (
//                 <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//               ))}
//             </select>
//             <select id="rooms" className='roomsSelect'>
//               <option value="">Rooms</option>
//               {[1, 2, 3].map(num => (
//                 <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
//               ))}
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
//                   <p>{room.nights} nights, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No rooms found matching your search criteria.</p>
//           )}
//         </div>
//       </div>

//       {selectedRoom && (
//         <div className="popupOverlay" onClick={closePopUp}>
//           <div className="popupContent" onClick={(e) => e.stopPropagation()}>
//             <button className="closeBtn" onClick={closePopUp}>×</button>
//             <img src={selectedRoom.image} alt={selectedRoom.heading} />
//             <h3>{selectedRoom.heading}</h3>
//             <p>{selectedRoom.location}</p>
//             <p>{selectedRoom.nights} nights</p>
//             <p>{selectedRoom.reviews} reviews</p>
//             <p><s>{selectedRoom.originalPrice}</s> <b>{selectedRoom.discountedPrice}</b></p>
//             <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
//           </div>
//         </div>
//       )}
//       {roomOpened && (
//         <div onClick={()=> console.log('we are rolling')
//         } style={{
//           position: 'fixed',
//           left: 0,
//           right: 0,
//           margin: 'auto',
//           zIndex: 5,
//           width: '100%',
//           height: '100vh',
//           background: 'red'
//         }}><h1>something inside</h1></div>
//       ) }
//     </div>
//   );
// };

// export default Rooms;


import './Rooms.css';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom } from '../../Features/slices/roomSlice';
import { auth } from '../../Firebase/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Payment from '../Payment/Payment';

const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
    rooms: state.rooms.rooms || [],
    filteredRooms: state.rooms.filteredRooms || [],
    searchQuery: state.rooms.searchQuery || '',
    selectedRoom: state.rooms.selectedRoom || null,
    status: state.rooms.status || 'idle',
    error: state.rooms.error || null,
  }));

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user ? `User is authenticated: ${user.uid}` : 'User is not authenticated');
    });

    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    dispatch(setSearchQuery(query));
  };

  const handleSearch = useCallback(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [dispatch, searchQuery]);

  const handlePopUp = (roomId) => {
    dispatch(setSelectedRoom(roomId));
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
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
            <select id="rooms" className='roomsSelect'>
              <option value="">Rooms</option>
              {[1, 2, 3].map(num => (
                <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
              ))}
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
              <div key={room.id} className="card" onClick={() => handlePopUp(room.id)}>
                <img src={room.image} alt={room.heading} />
                <h4>{room.heading}</h4>
                <p>{room.location}</p>
                <div className="reviews">
                  <b>{room.reviews} <IoIosStar /></b>
                </div>
                <div className="cardBottom">
                  <p>{room.nights} nights, <s>{room.originalPrice}</s></p><span>{room.discountedPrice}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No rooms found matching your search criteria.</p>
          )}
        </div>
      </div>

      {selectedRoom && (
        <div className="popupOverlay" onClick={closePopUp}>
          <div className="popupContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeBtn" onClick={closePopUp}>×</button>
            <img src={selectedRoom.image} alt={selectedRoom.heading} />
            <h3>{selectedRoom.heading}</h3>
            <p>{selectedRoom.location}</p>
            <p>{selectedRoom.nights} nights</p>
            <p>{selectedRoom.reviews} reviews</p>
            <p><s>{selectedRoom.originalPrice}</s> <b>{selectedRoom.discountedPrice}</b></p>
            <button className="bookNowBtn" onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
