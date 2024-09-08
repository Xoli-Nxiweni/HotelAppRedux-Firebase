import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LuBedDouble } from 'react-icons/lu';
import { GiBathtub } from 'react-icons/gi';
import { SiTicktick } from 'react-icons/si';
import { PiWarningCircleLight } from 'react-icons/pi';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { FaPerson } from 'react-icons/fa6';
import './Booking.css';
import Payment from '../Payment/Payment';

const Booking = () => {
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [extrasDetailsOpen, setExtrasDetailsOpen] = useState(false);
  const [reviewsDetailsOpen, setReviewsDetailsOpen] = useState(false);
  const [extras, setExtras] = useState([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [review, setReview] = useState('');
  const [checkInDate] = useState('');
  const [checkOutDate] = useState('');
  const [numRooms] = useState(1);
  const [numGuests] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  // const navigate = useNavigate();

  if (!selectedRoom) {
    return <div className='noRoomSelected'>No room selected. Please go back and select a room.</div>;
  }

  const handleAddStuff = () => {
    console.log('Extras:', extras);
    console.log('Special Requests:', specialRequests);
    console.log('Check-in Date:', checkInDate);
    console.log('Check-out Date:', checkOutDate);
    console.log('Number of Rooms:', numRooms);
    console.log('Number of Guests:', numGuests);
    console.log('Guest Name:', guestName);
    console.log('Contact Information:', contactInfo);
    alert('Booking details submitted.');
  };

  const handleExtrasChange = (e) => {
    const value = e.target.value;
    setExtras(prevExtras =>
      e.target.checked
        ? [...prevExtras, value]
        : prevExtras.filter(item => item !== value)
    );
  };

  const handleSpecialRequestsChange = (e) => setSpecialRequests(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', review);
    alert('Review submitted successfully.');
  };

  return (
    <div className='bookingWrapper'>
      <div className="bookingLeftContainer">
        {/* Room Details */}
        <div className="roomDetails">
          <div className="roomDetailsLeft">
            <img src={selectedRoom.image} alt="Room" />
          </div>
          <div className="roomDetailsRight">
            <h3>{selectedRoom.heading}</h3>
            <p>{selectedRoom.guests} Guests</p>
            <div className="info">
              <div className="sleeps">
                <FaPerson /> <p>Sleeps {selectedRoom.guests}</p>
              </div>
              <div className="sleeps">
                <LuBedDouble /> <p>{selectedRoom.beds} bed(s)</p>
              </div>
              <div className="sleeps">
                <GiBathtub /> <p>{selectedRoom.bathrooms} Bathroom(s)</p>
              </div>
            </div>
            <div className="extraInfo">
              <p>{selectedRoom.size}m²</p> <p>• {selectedRoom.view}</p>
              <p>• {selectedRoom.nonSmoking ? 'Non-smoking' : 'Smoking'}</p>
            </div>
            <p><SiTicktick /> Free Cancellation</p>
            <p><PiWarningCircleLight /> Pay Today</p>
            <div className="price">
              <h3>{selectedRoom.discountedPrice}</h3>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="sectionHeader" onClick={() => setUserDetailsOpen(prev => !prev)}>
          <div className="num">1</div><h1>Your Details</h1>
          {userDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {userDetailsOpen && (
          <div className="drawerContent">
            <form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="Enter your full name" 
                  value={user.displayName}
                  onChange={(e) => setGuestName(e.target.value)} 
                  required 
                  readOnly
                  />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  value={user.email}
                  required 
                  readOnly
                  />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)} 
                  required 
                />
              </div>
              <button type="button" className='addThings' onClick={handleAddStuff}>Submit</button>
            </form>
          </div>
        )}

        {/* Extras Details */}
        <div className="sectionHeader" onClick={() => setExtrasDetailsOpen(prev => !prev)}>
          <div className="num">2</div><h1>Extras</h1>
          {extrasDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {extrasDetailsOpen && (
          <div className="drawerContent">
            <form>
              <div className="form-group">
                <label htmlFor="add-ons">Select Extras</label>
                <div id="add-ons">
                  <label>
                    <input type="checkbox" value="breakfast" onChange={handleExtrasChange} />
                    Breakfast
                  </label>
                  <label>
                    <input type="checkbox" value="parking" onChange={handleExtrasChange} />
                    Parking
                  </label>
                  <label>
                    <input type="checkbox" value="wifi" onChange={handleExtrasChange} />
                    WiFi Access
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea 
                  id="specialRequests" 
                  rows="4" 
                  placeholder="Enter any special requests" 
                  value={specialRequests} 
                  onChange={handleSpecialRequestsChange}
                ></textarea>
              </div>
              <button type="button" className='addThings' onClick={handleAddStuff}>Submit</button>
            </form>
          </div>
        )}

        {/* Reviews Details */}
        <div className="sectionHeader" onClick={() => setReviewsDetailsOpen(prev => !prev)}>
          <div className="num">3</div><h1>Reviews</h1>
          {reviewsDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {reviewsDetailsOpen && (
          <div className="drawerContent">
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label htmlFor="review">Leave a Review</label>
                <textarea 
                  id="review" 
                  rows="4" 
                  placeholder="Write your review here" 
                  value={review} 
                  onChange={handleReviewChange}
                ></textarea>
              </div>
              <button type="submit">Submit Review</button>
            </form>
            <div className="existing-reviews">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          </div>
        )}
      </div>

      {/* Booking Right Container */}
      <div className="bookingRightContainer">
        <div className="bookingDetails">
          <h2>Booking Summary</h2>
          <p><strong>Name:</strong> <span>{user.displayName}</span></p>
          <p><strong>Email:</strong> <span>{user.email}</span></p>
          <p><strong>Phone Number:</strong> <span>{contactInfo}</span></p>
          <p><strong>Room:</strong> {selectedRoom.heading}</p>
          <p><strong>Guests:</strong> {selectedRoom.guests}</p>
          <p><strong>Check-in Date:</strong> <span><input type="date" /></span> </p>
          <p><strong>Check-out Date:</strong> <span><input type="date" /></span></p>
          <p><strong>Number of Rooms:</strong> <span><input type="number" /></span></p>
          <p><strong>Number of Guests:</strong> <span><input type="number" /></span></p>
          <p><strong>Extras:</strong> {extras.join(', ') || 'None'}</p>
          <p><strong>Special Requests:</strong> {specialRequests || 'None'}</p>
          <div className="totalPrice">
            <h3>Total Price: {selectedRoom.discountedPrice}</h3>
          </div>
          <Payment />
        </div>
      </div>
    </div>
  );
};

export default Booking;
