import './Rooms.css';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setSearchQuery, setSelectedRoom, clearSelectedRoom, toggleFavorite } from '../../Features/slices/roomSlice';
import { setCanBook } from '../../Features/slices/authSlice';
import { auth } from '../../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../Loader/Loader';
import Auth from '../Auth/Auth';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const Rooms = () => {
  const [authOpen, setAuthOpen] = useState(false);
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
      if (user) {
        dispatch(setCanBook());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Handle search query input change
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Handle search button click
  const handleSearch = useCallback(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [dispatch, searchQuery]);

  const handlePopUp = (roomId) => {
    dispatch(setSelectedRoom(roomId));
  };

  const closePopUp = () => {
    dispatch(clearSelectedRoom());
  };

  const handleFavoriteClick = (roomId) => {
    dispatch(toggleFavorite(roomId));
  };

  // Handle 'Book Now' click
  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/booking'); // Navigate to the booking page route
    } else {
      setAuthOpen(true);
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
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      <div className="bottomPart">
        <div className="roomCard">
          {status === 'loading' && <Loader />}
          {status === 'failed' && <p>Error: {error || 'Something went wrong.'}</p>}
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div key={room.id} className="card">
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
                  <h3 onClick={() => handleFavoriteClick(room.id)}>
                    {!room.isFavorite ? <FaRegHeart /> : <FaHeart />}
                  </h3>
                </div>
                <div className="cardBottom">
                  <button onClick={() => handlePopUp(room.id)}>View Room</button>
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
              x
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
            {(!selectedRoom.isBooked && isAuthenticated) && 
              <button className="bookNowBtn" onClick={handleBookNow}>
                Book Now
              </button>
            }
          </div>
        </div>
      )}

      {authOpen && (
        <Auth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      )}
    </div>
  );
};

export default Rooms;
