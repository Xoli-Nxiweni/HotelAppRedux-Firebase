// import './Booking.css';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
// import { FaPerson } from "react-icons/fa6";
// import { SiTicktick } from "react-icons/si";
// import { PiWarningCircleLight } from "react-icons/pi";
// import { LuBedDouble } from "react-icons/lu";
// import { GiBathtub } from "react-icons/gi";
// import { useNavigate } from 'react-router-dom';

// const Booking = () => {
//   const [userDetailsOpen, setUserDetailsOpen] = useState(false);
//   const [extrasDetailsOpen, setExtrasDetailsOpen] = useState(false);
//   const [reviewsDetailsOpen, setReviewsDetailsOpen] = useState(false);
//   const [stayDetailsOpen, setStayDetailsOpen] = useState(false);

//   const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
//   const navigate = useNavigate();

//   if (!selectedRoom) {
//     return <div>No room selected. Please go back and select a room.</div>;
//   }

//   const handleCheckout = () => {
//     navigate('/checkout'); // You can redirect to a checkout page here
//   };

//   return (
//     <div className='bookingWrapper'>
//       <div className="bookingLeftContainer">
//   {/* Room Details Section */}
//   <div className="roomDetails">
//     <div className="roomDetailsLeft">
//       <img src={selectedRoom.image} alt="Room" />
//     </div>
//     <div className="roomDetailsRight">
//       <h3>{selectedRoom.heading}</h3>
//       <p>{selectedRoom.guests} Guests</p>
//       <div className="info">
//         <div className="sleeps">
//           <FaPerson /> <p>Sleeps {selectedRoom.guests}</p>
//         </div>
//         <div className="sleeps">
//           <LuBedDouble /> <p>{selectedRoom.beds} bed(s)</p>
//         </div>
//         <div className="sleeps">
//           <GiBathtub /> <p>{selectedRoom.bathrooms} Bathroom(s)</p>
//         </div>
//       </div>
//       <div className="extraInfo">
//         <p>{selectedRoom.size}m²</p> <p> • {selectedRoom.view}</p>
//         <p> • {selectedRoom.nonSmoking ? 'Non-smoking' : 'Smoking'}</p>
//       </div>
//       <p><SiTicktick /> Free Cancellation</p>
//       <p><PiWarningCircleLight /> Pay Today</p>
//       <div className="price">
//         <h3>{selectedRoom.discountedPrice}</h3>
//       </div>
//     </div>
//   </div>

//   {/* Your Details Section */}
//   <div className="UserDetails" onClick={() => setUserDetailsOpen(!userDetailsOpen)}>
//     <div className="num">1</div><h1>Your Details</h1>
//     {userDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
//   </div>
//   {userDetailsOpen && (
//     <div className="drawerContent">
//       <form>
//         <div className="form-group">
//           <label htmlFor="fullName">Full Name</label>
//           <input type="text" id="fullName" placeholder="Enter your full name" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" placeholder="Enter your email" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone">Phone Number</label>
//           <input type="tel" id="phone" placeholder="Enter your phone number" />
//         </div>
//       </form>
//     </div>
//   )}

//   {/* Extras Section */}
//   <div className="extrasDetails" onClick={() => setExtrasDetailsOpen(!extrasDetailsOpen)}>
//     <div className="num">2</div><h1>Extras</h1>
//     {extrasDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
//   </div>
//   {extrasDetailsOpen && (
//     <div className="drawerContent">
//       <form>
//         <div className="form-group">
//           <label htmlFor="add-ons">Select Extras</label>
//           <select id="add-ons">
//             <option value="breakfast">Breakfast</option>
//             <option value="parking">Parking</option>
//             <option value="wifi">WiFi Access</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="specialRequests">Special Requests</label>
//           <textarea id="specialRequests" rows="4" placeholder="Enter any special requests"></textarea>
//         </div>
//       </form>
//     </div>
//   )}

//   {/* Reviews Section */}
//   <div className="reviewsDetails" onClick={() => setReviewsDetailsOpen(!reviewsDetailsOpen)}>
//     <div className="num">3</div><h1>Reviews</h1>
//     {reviewsDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
//   </div>
//   {reviewsDetailsOpen && (
//     <div className="drawerContent">
//       <form>
//         <div className="form-group">
//           <label htmlFor="review">Leave a Review</label>
//           <textarea id="review" rows="4" placeholder="Write your review here"></textarea>
//         </div>
//       </form>
//       <div className="existing-reviews">
//         {/* Add logic to display existing reviews */}
//         <p>No reviews yet. Be the first to leave a review!</p>
//       </div>
//     </div>
//   )}
// </div>


//       <div className="bookingRightContainer">
//         <div className="bookingDetails">
//           <p>Total </p><h4>{selectedRoom.discountedPrice}</h4>
//           <p>Check-in: {selectedRoom.checkIn}</p>
//           <p>Check-out: {selectedRoom.checkOut}</p>
//           <p>{selectedRoom.nights} nights, {selectedRoom.guests} guests</p>
//           <hr />
//           <div className="stayDetails" onClick={() => setStayDetailsOpen(!stayDetailsOpen)}>
//             <h4>Stay Details</h4>
//             {stayDetailsOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
//           </div>
//           {stayDetailsOpen && <div className="drawerContent"> More stay details here </div>}
//           <button className='checkoutBtn' onClick={handleCheckout}>Proceed to Checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Booking;


// src/components/Booking.js

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuBedDouble } from 'react-icons/lu';
import { GiBathtub } from 'react-icons/gi';
import { SiTicktick } from 'react-icons/si';
import { PiWarningCircleLight } from 'react-icons/pi';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { FaPerson } from 'react-icons/fa6';

const Booking = () => {
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [extrasDetailsOpen, setExtrasDetailsOpen] = useState(false);
  const [reviewsDetailsOpen, setReviewsDetailsOpen] = useState(false);
  // const [stayDetailsOpen, setStayDetailsOpen] = useState(false);

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const navigate = useNavigate();

  if (!selectedRoom) {
    return <div>No room selected. Please go back and select a room.</div>;
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className='bookingWrapper'>
      <div className="bookingLeftContainer">
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
              <p>{selectedRoom.size}m²</p> <p> • {selectedRoom.view}</p>
              <p> • {selectedRoom.nonSmoking ? 'Non-smoking' : 'Smoking'}</p>
            </div>
            <p><SiTicktick /> Free Cancellation</p>
            <p><PiWarningCircleLight /> Pay Today</p>
            <div className="price">
              <h3>{selectedRoom.discountedPrice}</h3>
            </div>
          </div>
        </div>

        <div className="UserDetails" onClick={() => setUserDetailsOpen(!userDetailsOpen)}>
          <div className="num">1</div><h1>Your Details</h1>
          {userDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {userDetailsOpen && (
          <div className="drawerContent">
            <form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" />
              </div>
            </form>
          </div>
        )}

        <div className="extrasDetails" onClick={() => setExtrasDetailsOpen(!extrasDetailsOpen)}>
          <div className="num">2</div><h1>Extras</h1>
          {extrasDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {extrasDetailsOpen && (
          <div className="drawerContent">
            <form>
              <div className="form-group">
                <label htmlFor="add-ons">Select Extras</label>
                <select id="add-ons">
                  <option value="breakfast">Breakfast</option>
                  <option value="parking">Parking</option>
                  <option value="wifi">WiFi Access</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea id="specialRequests" rows="4" placeholder="Enter any special requests"></textarea>
              </div>
            </form>
          </div>
        )}

        <div className="reviewsDetails" onClick={() => setReviewsDetailsOpen(!reviewsDetailsOpen)}>
          <div className="num">3</div><h1>Reviews</h1>
          {reviewsDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {reviewsDetailsOpen && (
          <div className="drawerContent">
            <form>
              <div className="form-group">
                <label htmlFor="review">Leave a Review</label>
                <textarea id="review" rows="4" placeholder="Write your review here"></textarea>
              </div>
            </form>
            <div className="existing-reviews">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          </div>
        )}
      </div>

      <div className="bookingRightContainer">
        <div className="bookingDetails">
          <p>Total: </p>
          <h4>{selectedRoom.discountedPrice}</h4>
        </div>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Booking;
