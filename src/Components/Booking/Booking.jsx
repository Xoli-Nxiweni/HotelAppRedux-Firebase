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
  const [isSectionOpen, setIsSectionOpen] = useState({
    userDetails: false,
    extrasDetails: false,
    reviewsDetails: false
  });

  const [formState, setFormState] = useState({
    extras: [],
    specialRequests: '',
    review: '',
    checkInDate: '',
    checkOutDate: '',
    numRooms: 1,
    numGuests: 1,
    guestName: '',
    contactInfo: ''
  });
  const [isChecked, setIsChecked] = useState(false)

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const user = useSelector((state) => state.auth.user);

  if (!selectedRoom) {
    return <div className='noRoomSelected'>No room selected. Please go back and select a room.</div>;
  }

  const toggleSection = (section) => {
    setIsSectionOpen((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormState((prev) => ({
        ...prev,
        extras: checked
          ? [...prev.extras, value]
          : prev.extras.filter(item => item !== value)
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleCheckout = () =>{
    setIsChecked(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    alert('Booking details submitted.');
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
        <div className="sectionHeader" onClick={() => toggleSection('userDetails')}>
          <div className="num">1</div><h1>Your Details</h1>
          {isSectionOpen.userDetails ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {isSectionOpen.userDetails && (
          <div className="drawerContent">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="guestName">Full Name</label>
                <input 
                  type="text" 
                  id="guestName" 
                  placeholder="Enter your full name" 
                  value={formState.guestName || user.displayName}
                  onChange={handleInputChange} 
                  required 
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactInfo">Phone Number</label>
                <input 
                  type="tel" 
                  id="contactInfo" 
                  placeholder="Enter your phone number" 
                  value={formState.contactInfo}
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <button type="submit" className='addThings'>Submit</button>
            </form>
          </div>
        )}

        {/* Extras Details */}
        <div className="sectionHeader" onClick={() => toggleSection('extrasDetails')}>
          <div className="num">2</div><h1>Extras</h1>
          {isSectionOpen.extrasDetails ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {isSectionOpen.extrasDetails && (
          <div className="drawerContent">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="add-ons">Select Extras</label>
                <div id="add-ons">
                  <label>
                    <input type="checkbox" value="breakfast" onChange={handleInputChange} />
                    Breakfast
                  </label>
                  <label>
                    <input type="checkbox" value="parking" onChange={handleInputChange} />
                    Parking
                  </label>
                  <label>
                    <input type="checkbox" value="wifi" onChange={handleInputChange} />
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
                  value={formState.specialRequests} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className='addThings'>Submit</button>
            </form>
          </div>
        )}

        {/* Reviews Details */}
        <div className="sectionHeader" onClick={() => toggleSection('reviewsDetails')}>
          <div className="num">3</div><h1>Reviews</h1>
          {isSectionOpen.reviewsDetails ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {isSectionOpen.reviewsDetails && (
          <div className="drawerContent">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="review">Leave a Review</label>
                <textarea 
                  id="review" 
                  rows="4" 
                  placeholder="Write your review here" 
                  value={formState.review} 
                  onChange={handleInputChange}
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
          <p><strong>Phone Number:</strong> <span>{formState.contactInfo}</span></p>
          <p><strong>Room:</strong> {selectedRoom.heading}</p>
          <p><strong>Guests:</strong> {selectedRoom.guests}</p>
          <p><strong>Check-in Date:</strong> <span><input type="date" required /></span> </p>
          <p><strong>Check-out Date:</strong> <span><input type="date" required/></span></p>
          <p><strong>Number of Rooms:</strong> <span>{formState.numRooms}</span></p>
          <p><strong>Number of Guests:</strong> <span>{formState.numGuests}</span></p>
          <p><strong>Extras:</strong> {formState.extras.join(', ')}</p>
          <p><strong>Special Requests:</strong> {formState.specialRequests}</p>
          <p><strong>Review:</strong> {formState.review}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>

      {isChecked ? 
      <div className="payments">
          <div className="paymentsModal">
            <Payment />
          </div>
      </div>: <></>
      }
    </div>
  );
};

export default Booking;
