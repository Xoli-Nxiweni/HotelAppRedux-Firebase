import "./Rooms.css";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { addRating } from "../../Features/slices/ratingsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  setSearchQuery,
  setSelectedRoom,
  clearSelectedRoom,
} from "../../Features/slices/roomSlice";
import { setCanBook } from "../../Features/slices/authSlice";
import { auth } from "../../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../Loader/Loader";
import Auth from "../Auth/Auth";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { toggleFavorite } from "../../Features/slices/favoritesSlice";
import Rating from "@mui/material/Rating";
import { IoMdCloseCircle } from "react-icons/io";
import scrollreveal from "scrollreveal";

const Rooms = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    rooms,
    filteredRooms,
    searchQuery,
    status,
    error,
    selectedRoom,
    isAuthenticated,
  } = useSelector((state) => ({
    rooms: state.rooms.rooms || [],
    filteredRooms: state.rooms.filteredRooms || [],
    searchQuery: state.rooms.searchQuery || "",
    status: state.rooms.status || "idle",
    error: state.rooms.error || null,
    selectedRoom: state.rooms.selectedRoom,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  // Fetch rooms on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCanBook());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Initialize ScrollReveal
  useEffect(() => {
    const ScrollReveal = scrollreveal();
    ScrollReveal.reveal(".card", {
      duration: 1000,
      distance: "50px",
      origin: "bottom",
      reset: true,
    });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Trigger search on enter key press
  const handleSearch = useCallback(
    (e) => {
      if (e.key === "Enter") {
        dispatch(setSearchQuery(searchQuery));
      }
    },
    [dispatch, searchQuery]
  );

  const handlePopUp = (roomId) => {
    dispatch(setSelectedRoom(roomId));
  };

  const closePopUp = () => {
    dispatch(clearSelectedRoom());
  };

  // Handle favorite click
  const handleFavoriteClick = (roomId, isFavorite) => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (userId) {
      const newFavoriteStatus = !isFavorite; // Toggle favorite status
      dispatch(
        toggleFavorite({ roomId, userId, isFavorite: newFavoriteStatus })
      );
    } else {
      setAuthOpen(true); // Open authentication modal if user is not logged in
    }
  };

  // Handle 'Book Now' click
  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate("/booking");
    } else {
      setAuthOpen(true);
    }
  };

  const userId = useSelector((state) => state.auth);

  const handleRatingChange = (roomId) => (event, newValue) => {
    console.log("New Rating Value:", newValue); // Log the new rating value
    console.log("User ID:", userId.user.uid); // Log the user ID to check its value
    if (newValue !== null && userId) {
      console.log("User rated:", newValue);
      const ratingDetails = {
        roomId: roomId,
        userId: userId.user.uid,
        rating: newValue,
        timestamp: new Date().toISOString(), // Convert to ISO string for serialization
      };
      dispatch(addRating(ratingDetails)); // Pass ratingDetails directly
    } else {
      console.log("No rating selected or user not authenticated");
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
            onKeyPress={handleSearch}
            aria-label="Search for rooms"
          />
        </div>
      </div>

      <div className="bottomPart">
        <div className="roomCard">
          {status === "loading" && <Loader message="Fetching rooms..." />}
          {status === "failed" && (
            <p className="error-message">
              Error: {error || "Something went wrong."}
            </p>
          )}
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => {
              const isFavorite = room.isFavorite || false; // Ensure `isFavorite` is initialized
              return (
                <div key={room.id} className="card">
                  <img src={room.image} alt={room.heading || "No image"} />
                  <div className="cardHeading">
                    <h4>{room.heading || "No title"}</h4>
                    <span className={room.isBooked ? "booked" : "notBooked"}>
                      {room.isBooked ? "Booked" : "Available"}
                    </span>
                  </div>
                  <p>{room.location || "Johannesburg, South Africa"}</p>
                  <div className="reviews">
                    <div className="starRating">
                      <Rating
                        name={`room-rating-${room.id}`}
                        defaultValue={room.rating || 0}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          console.log("New Rating Value:", newValue); // Log the new value
                          handleRatingChange(room.id)(event, newValue); // Call your handler
                        }}
                        IconContainerComponent={(props) => (
                          <span style={{ fontSize: "1.5em", color: "orange" }}>
                            {/* eslint-disable-next-line react/prop-types */}
                            {props.children}
                          </span>
                        )}
                      />
                    </div>

                    <h3
                      onClick={() => handleFavoriteClick(room.id, isFavorite)}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </h3>
                  </div>
                  <div className="cardBottom">
                    <button onClick={() => handlePopUp(room.id)}>
                      View Room
                    </button>
                    <p>
                      {room.nights || 0} nights,{" "}
                      <s>{room.originalPrice || ""}</s>
                    </p>
                    <span>{`R ${room.discountedPrice}`}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No rooms found matching your search criteria.</p>
          )}
        </div>
      </div>

      {selectedRoom && (
        <div className="popupOverlay2" onClick={closePopUp}>
          <div className="popupContent2" onClick={(e) => e.stopPropagation()}>
            <button
              className="closeBtn2"
              onClick={closePopUp}
              aria-label="Close room details"
            >
              <IoMdCloseCircle />
            </button>
            <div className="roomCard2">
              <img
                src={selectedRoom.image || "default-image.jpg"}
                alt={selectedRoom.heading || "No image"}
              />
              <div className="roomDetails2">
                <h3>{selectedRoom.heading || "No title"}</h3>
                <>{selectedRoom.description || "No description"}</>
                <br />
                <br />
                <h5>{selectedRoom.location || "Johannesburg, South Africa"}</h5>
                <ul>
                  <br />
                  <h3>Amenities:</h3>
                  {selectedRoom.amenities &&
                  selectedRoom.amenities.length > 0 ? (
                    selectedRoom.amenities.map((amenity, index) => (
                      <span key={index}>
                        {`${amenity}${
                          index < selectedRoom.amenities.length - 1 ? ", " : ""
                        }`}
                      </span>
                    ))
                  ) : (
                    <li>No amenities</li>
                  )}
                </ul>
                <br />
                <p>{selectedRoom.nights || 0} nights</p>
                <p>Rating: {selectedRoom.reviews || 0}</p>
                <p>
                  <b>{`R ${selectedRoom.discountedPrice}`}</b>
                </p>
                <br />
                <b className="review">
                  {selectedRoom.reviews || 0} <IoIosStar />
                </b>
                <br />
                {!selectedRoom.isBooked && isAuthenticated ? (
              <button className="bookNowBtn" onClick={handleBookNow} aria-label="Book now">
                Book Now
              </button> 
            ) : isAuthenticated ? "Room Already Booked" : <p onClick={()=>{
            closePopUp()}}>Not Authorized to book! Try signing in!</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {authOpen && <Auth setAuthOpen={setAuthOpen} />}
    </div>
  );
};

export default Rooms;
