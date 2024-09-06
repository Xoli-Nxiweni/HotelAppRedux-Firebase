import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const navigate = useNavigate();

  if (!selectedRoom) {
    return <div className='noRoomSelected'>No room selected. Please go back and select a room.</div>;
  }

  const handleAddStuff = () => {
    console.log('Extras:', extras);
    console.log('Special Requests:', specialRequests);
    alert('Extras and special requests added to the booking.');
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
                <input type="text" id="fullName" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" required />
              </div>
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
                <textarea id="specialRequests" rows="4" placeholder="Enter any special requests" value={specialRequests} onChange={handleSpecialRequestsChange}></textarea>
              </div>
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
                <textarea id="review" rows="4" placeholder="Write your review here" value={review} onChange={handleReviewChange}></textarea>
              </div>
              <button type="submit">Submit Review</button>
            </form>
            <div className="existing-reviews">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          </div>
        )}
        <button className='addThings' onClick={handleAddStuff}>Add</button>
      </div>

      {/* Booking Right Container */}
      <div className="bookingRightContainer">
        <div className="bookingDetails">
          <h2>Booking Summary</h2>
          <p><strong>Room:</strong> {selectedRoom.heading}</p>
          <p><strong>Guests:</strong> {selectedRoom.guests}</p>
          <p><strong>Beds:</strong> {selectedRoom.beds}</p>
          <p><strong>Bathrooms:</strong> {selectedRoom.bathrooms}</p>
          <p><strong>Extras:</strong> {extras.length > 0 ? extras.join(', ') : 'None'}</p>
          <p><strong>Check-in Date:</strong> {/* Check-in Date */}</p>
          <p><strong>Check-out Date:</strong> {/* Check-out Date */}</p>
          <p><strong>Booking Reference:</strong> {/* Booking Reference */}</p>
          <p><strong>Guest Name:</strong> {/* Guest Name */}</p>
          <p><strong>Contact Information:</strong> {/* Contact Information */}</p>
          <div className="priceSummary">
            <p><strong>Total:</strong></p>
            <h4>{selectedRoom.discountedPrice}</h4>
          </div>
        </div>

        

       

        <Payment />
      </div>
    </div>
  );
};

export default Booking;
