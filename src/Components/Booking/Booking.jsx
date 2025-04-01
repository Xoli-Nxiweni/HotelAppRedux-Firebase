import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LuBedDouble } from 'react-icons/lu';
import { GiBathtub } from 'react-icons/gi';
import { SiTicktick } from 'react-icons/si';
import { PiWarningCircleLight } from 'react-icons/pi';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { FaPerson } from 'react-icons/fa6';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './Booking.css';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import Payment from '../Payment/Payment';
import { bookRoom } from '../../Features/slices/bookingSlice'; // Adjust the import path based on your file structure
import axios from 'axios';
// import {  useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Pw0PWH23g7ZtX12QkXjyxtCKNZsStiJUn2eJpykmWKLDR2dh9dCYooQCZhEgQjxRW08G0NXVDvOZ9QFuSIIoGwS00mSwX1Zhj');
const Booking = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isSectionOpen, setIsSectionOpen] = useState({
    userDetails: false,
    extrasDetails: false,
    reviewsDetails: false,
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
    contactInfo: '',
});


  const [isChecked, setIsChecked] = useState(false);

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const user = useSelector((state) => state.auth.user);
  console.log('user',user);
  console.log('selected room', selectedRoom);
  

  if (!selectedRoom) {
    return <div className="noRoomSelected">No room selected. Please go back and select a room.</div>;
  }

  const toggleSection = (section) => {
    setIsSectionOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormState((prev) => {
      if (type === 'checkbox') {
        return {
          ...prev,
          extras: checked
            ? [...prev.extras, value]
            : prev.extras.filter((item) => item !== value),
        };
      }
      return { ...prev, [id]: value };
    });
  };

  const handleCheckout = () => {
    // Prepare booking details
    const bookingDetails = {
      uid: user.uid || '',
      name: user.displayName || user.name || '',
      email: user.email || '',
      room: selectedRoom.heading,
      selectedRoom: selectedRoom.heading,
      checkInDate: formState.checkInDate,
      checkOutDate: formState.checkOutDate,
      numRooms: formState.numRooms || 1,
      numGuests: selectedRoom.guests || 1,
      extras: formState.extras || [],
      specialRequests: formState.specialRequests || '',
      price: selectedRoom.discountedPrice * formState.numRooms,
      status: 'Pending',
      createdAt: new Date().toISOString(), // Convert to ISO string
    };
  
    // Log the booking details for debugging
    console.log("Booking Details:", bookingDetails);
  
    // Check for required fields and log missing ones
    const requiredFields = [
      'uid', 
      'name', 
      'email', 
      'checkInDate', 
      'checkOutDate',
      'selectedRoom'
    ];
  
    const missingFields = requiredFields.filter(field => !bookingDetails[field]);
  
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      alert("Please fill in all required fields: " + missingFields.join(', '));
      return;
    }
  
    // Validate check-in and check-out dates
    const checkInDate = new Date(bookingDetails.checkInDate);
    const checkOutDate = new Date(bookingDetails.checkOutDate);
  
    if (checkOutDate <= checkInDate) {
      console.log("Check-out date must be after check-in date.");
      alert("Check-out date must be after check-in date.");
      return;
    }
  
    // Dispatch the action to add booking details to Firestore via Redux
    dispatch(bookRoom(bookingDetails))
      .then(() => {
        alert('Booking submitted successfully.');
      })
      .catch((error) => {
        console.error('Error booking room:', error);
        alert('Failed to book room. Please try again.');
      });
  
    setIsChecked(true);
  
    // Send booking data to the server
    const submitBooking = async (bookingDetails) => {
      try {
        const response = await axios.post('https://hotelappredux-firebaseemailsender.onrender.com/bookings', bookingDetails);
        console.log(response.data); // Success response
      } catch (error) {
        console.error('Error booking room:', error); // Handle error
      }
    };
  
    // Submit the booking
    submitBooking(bookingDetails);
  };
  

  return (
    <div className="bookingWrapper">
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
            <p>
              <SiTicktick /> Free Cancellation
            </p>
            <p>
              <PiWarningCircleLight /> Pay Today
            </p>
            <div className="price">
              <h3>{selectedRoom.discountedPrice}</h3>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="sectionHeader" onClick={() => toggleSection('userDetails')}>
          <div className="num">1</div>
          <h1>Your Details</h1>
          {isSectionOpen.userDetails ? (
            <RiArrowDropUpLine className="svg" />
          ) : (
            <RiArrowDropDownLine className="svg" />
          )}
        </div>
        {isSectionOpen.userDetails && (
          <div className="drawerContent">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="guestName">Full Name</label>
                <input
                  type="text"
                  id="guestName"
                  placeholder="Enter your full name"
                  value={formState.guestName || user?.displayName || ''}
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
            </form>
          </div>
        )}

        {/* Extras Details */}
        <div className="sectionHeader" onClick={() => toggleSection('extrasDetails')}>
          <div className="num">2</div>
          <h1>Extras</h1>
          {isSectionOpen.extrasDetails ? (
            <RiArrowDropUpLine className="svg" />
          ) : (
            <RiArrowDropDownLine className="svg" />
          )}
        </div>
        {isSectionOpen.extrasDetails && (
          <div className="drawerContent">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="add-ons">Select Extras</label>
                <div id="add-ons">
                  <label>
                    <input
                      type="checkbox"
                      value="breakfast"
                      onChange={handleInputChange}
                      checked={formState.extras.includes('breakfast')}
                    />
                    Breakfast
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="parking"
                      onChange={handleInputChange}
                      checked={formState.extras.includes('parking')}
                    />
                    Parking
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="wifi"
                      onChange={handleInputChange}
                      checked={formState.extras.includes('wifi')}
                    />
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
            </form>
          </div>
        )}

        {/* Reviews Details */}
        <div className="sectionHeader" onClick={() => toggleSection('reviewsDetails')}>
          <div className="num">3</div>
          <h1>Reviews</h1>
          {isSectionOpen.reviewsDetails ? (
            <RiArrowDropUpLine className="svg" />
          ) : (
            <RiArrowDropDownLine className="svg" />
          )}
        </div>
        {isSectionOpen.reviewsDetails && (
          <div className="drawerContent">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="review">Leave a Review</label>
                <textarea
                  id="review"
                  rows="4"
                  placeholder="Share your feedback"
                  value={formState.review}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="bookingRightContainer">
        <form onSubmit={e => handleCheckout(e)} className="bookingForm">
          <div className="form-group">
            <label htmlFor="checkInDate">Check-In Date</label>
            <input
              type="date"
              id="checkInDate"
              value={formState.checkInDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">Check-Out Date</label>
            <input
              type="date"
              id="checkOutDate"
              value={formState.checkOutDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numRooms">Number of Rooms</label>
            <input
              type="number"
              id="numRooms"
              min="1"
              value={formState.numRooms}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numGuests">Number of Guests</label>
            <input
              type="number"
              id="numGuests"
              min="1"
              value={formState.numGuests}
              onChange={handleInputChange}
              required
            />
          </div>
          <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Booking Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" gutterBottom>
          <strong>Room:</strong> {selectedRoom.heading}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Check-In Date:</strong> {formState.checkInDate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Check-Out Date:</strong> {formState.checkOutDate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Number of Rooms:</strong> {formState.numRooms}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Number of Guests:</strong> {formState.numGuests}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Extras:</strong> {formState.extras.join(', ') || 'None'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Special Requests:</strong> {formState.specialRequests || 'None'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Review:</strong> {formState.review || 'No review'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Total Price: {selectedRoom.discountedPrice}
        </Typography>
      </CardContent>
    </Card>
    <br />
          <button type="submit" disabled={isChecked} onClick={(e)=>{
            handleCheckout(e);
            // navigate('/')
          }}>Confirm Booking</button>
        </form>
        <br />

        {isChecked && (
          <div className="paymentSection">
            <h2>Proceed to Payment</h2>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;