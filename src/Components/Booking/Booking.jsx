import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuBedDouble } from 'react-icons/lu';
import { GiBathtub } from 'react-icons/gi';
import { SiTicktick } from 'react-icons/si';
import { PiWarningCircleLight } from 'react-icons/pi';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { FaPerson } from 'react-icons/fa6';
import './Booking.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '../Payment/Payment';
import { bookRoom } from '../../Features/slices/bookingSlice';

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

  const stripePromise = loadStripe('pk_test_51Pw0PWH23g7ZtX12QkXjyxtCKNZsStiJUn2eJpykmWKLDR2dh9dCYooQCZhEgQjxRW08G0NXVDvOZ9QFuSIIoGwS00mSwX1Zhj');

  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(null);

  const dispatch = useDispatch();
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

  const handleCheckout = () => {
    setIsChecked(true);
  };

  const handlePaymentMethodChange = (paymentMethod) => {
    setPaymentMethodId(paymentMethod.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!paymentMethodId) {
      alert("Please complete payment details.");
      return;
    }

    const bookingData = {
      checkInDate: formState.checkInDate,
      checkOutDate: formState.checkOutDate,
      guestName: formState.guestName || user.displayName,
      contactInfo: formState.contactInfo,
      extras: formState.extras,
      specialRequests: formState.specialRequests,
      paymentMethodId: paymentMethodId,
      totalAmount: selectedRoom.discountedPrice,
      numRooms: formState.numRooms,
      numGuests: formState.numGuests,
      review: formState.review,
      userId: user.uid,
      selectedRoomId: selectedRoom.id
    };

    dispatch(bookRoom(bookingData));
    handleCheckout(); // Handle checkout logic
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
                  placeholder="Enter your review" 
                  value={formState.review} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className='addThings'>Submit</button>
            </form>
          </div>
        )}

        {/* Payment */}
        <div className="sectionHeader">
          <div className="num">4</div><h1>Payment</h1>
        </div>
        <div className="drawerContent">
          <Elements stripe={stripePromise}>
            <Payment onPaymentMethodChange={handlePaymentMethodChange} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Booking;
