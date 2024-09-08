import './Rooms.css';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom, toggleFavorite } from '../../Features/slices/roomSlice';
import { setCanBook } from '../../Features/slices/authSlice';
import { auth } from '../../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../Loader/Loader';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

const Rooms = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure rooms, filteredRooms, etc. from Redux state
  const { rooms, filteredRooms, searchQuery, selectedRoom, status, error } = useSelector((state) => ({
    rooms: state.rooms.rooms || [],
    filteredRooms: state.rooms.filteredRooms || [],
    searchQuery: state.rooms.searchQuery || '',
    selectedRoom: state.rooms.selectedRoom || null,
    status: state.rooms.status || 'idle',
    error: state.rooms.error || null,
  }));
  rooms

  const isAuthenticated = useSelector((state) => state.auth.canBook);

  // Fetch rooms on component mount if status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  
  // Handle user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user ? `User is authenticated: ${user.uid}` : 'User is not authenticated');
      // Update the ability to book based on authentication status
      if (user) {
        dispatch(setCanBook());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Handle search query input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  // Handle search button click using the searchQuery from state
  const handleSearch = useCallback(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [dispatch, searchQuery]);

  // Open room pop-up by dispatching selected room ID
  const handlePopUp = (roomId) => {
    dispatch(setSelectedRoom(roomId));
    
  };

  // Close the room pop-up
  const closePopUp = () => {
    dispatch(clearSelectedRoom());
  };
  const handleFavoriteClick = (roomId) => {
    dispatch(toggleFavorite(roomId)); // Dispatch the action with room ID
  };

  // Handle 'Book Now' click, navigate based on authentication status
  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/booking');
      // closePopUp()
    } else {
      navigate('/signUp');
      // closePopUp()
    }
  };

  return (
    <div className="Rooms">
      <div className="topPart">
        <div className="searchPart">
          <IoSearchSharp />
          <input
            type="text"
            placeholder="Where to sleep?"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="checkIn">
          <label htmlFor="checkIn">Check in</label>
          <input type="date" id="checkIn" className="dateInput" />
        </div>
        <div className="checkOut">
          <label htmlFor="checkOut">Check out</label>
          <input type="date" id="checkOut" className="dateInput" />
        </div>
        <div className="guestsAndRooms">
          <label htmlFor="guests">Guests and rooms</label>
          <div className="dropDowns">
            <select id="guests" className="guestsSelect">
              <option value="">Guests</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <select id="rooms" className="roomsSelect">
              <option value="">Rooms</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num} Room{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="searchBtn" onClick={handleSearch}>Search</button>
      </div>

      <div className="bottomPart">
        <div className="roomCard">
          {status === 'loading' && <Loader/>}
          {status === 'failed' && <p>Error: {error || 'Something went wrong.'}</p>}
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => ( // Use index as a fallback key
              <div key={room.id || index} className="card">
                <img src={room.image} alt={room.heading || 'No image'} />
                <div className="cardHeading">
                  <h4>{room.heading || 'No title'}</h4>
                  <span className={room.isBooked ? 'booked' : 'notBooked'}>
                    {room.isBooked ? 'Booked' : 'Available'}
                  </span>
                </div>
                <p>{room.location || 'Johannesburg, South Africa'}</p>
                <div className="reviews">
                  <b>
                    {room.reviews || 0} <IoIosStar />
                  </b>
                  <h3 onClick={handleFavoriteClick}>
                    {!room.isFavorite ? <FaRegHeart/> : <FaHeart />}
                  </h3>
                </div>
                <div className="cardBottom">
                  <button onClick={() => handlePopUp(room.id)}>view room</button>
                  <p>
                    {room.nights || 0} nights, <s>{room.originalPrice || ''}</s>
                  </p>
                  <span>{room.discountedPrice || ''}</span>
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
            <button className="closeBtn" onClick={closePopUp}>
              Close
            </button>
            <div className="roomCard2">
              <img src={selectedRoom.image || 'default-image.jpg'} alt={selectedRoom.heading || 'No image'} />
              <div className="roomDetails2">
                <h3>{selectedRoom.heading || 'No title'}</h3>
                <p>{selectedRoom.description || 'No description'}</p>
                <p>{selectedRoom.location || 'No location'}</p>
                <ul>
                  <h3>Amenities:</h3>
                  {selectedRoom.amenities && selectedRoom.amenities.length > 0 ? (
                    selectedRoom.amenities.map((amenity, index) => (
                      <span key={index}>{`${amenity}, `}</span>
                    ))
                  ) : (
                    <li>No amenities</li>
                  )}
                </ul>
                <p>{selectedRoom.nights || 0} nights</p>
                <p>Rating: {selectedRoom.reviews || 0}</p>
                <p>
                  <s>{selectedRoom.originalPrice || ''}</s> <b>{selectedRoom.discountedPrice || ''}</b>
                </p>
              </div>
            </div>
            {!selectedRoom.isBooked && 
              <button className="bookNowBtn" onClick={()=>{
                // closePopUp();
                handleBookNow();
              }}>
                Book Now
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
