import './Booking.css';
import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaPerson } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { PiWarningCircleLight } from "react-icons/pi";
import { LuBedDouble } from "react-icons/lu";
import { GiBathtub } from "react-icons/gi";

const Booking = () => {
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [extrasDetailsOpen, setExtrasDetailsOpen] = useState(false);
  const [reviewsDetailsOpen, setReviewsDetailsOpen] = useState(false);
  const [stayDetailsOpen, setStayDetailsOpen] = useState(false);

  return (
    <div className='bookingWrapper'>
      <div className="bookingLeftContainer">
        <div className="roomDetails">
          <div className="roomDetailsLeft">
            <img src="362619.jpg" alt="Room" />
          </div>
          <div className="roomDetailsRight">
            <h3>Special Room</h3>
            <p>2 Guests</p>
            <div className="info">
              <div className="sleeps">
                <FaPerson /> <p>Sleeps 2</p>
              </div>
              <div className="sleeps">
                <LuBedDouble /> <p>1 double bed</p>
              </div>
              <div className="sleeps">
                <GiBathtub /> <p>1 Bathroom</p>
              </div>
            </div>
            <div className="extraInfo">
              <p>22m²</p> <p> • City View</p> <p> • Non-smoking</p>
            </div>
            <p><SiTicktick /> Free Cancellation</p>
            <p><PiWarningCircleLight /> Pay Today</p>
            <div className="price">
              <h3>ZAR 810</h3>
            </div>
          </div>
        </div>

        <div className="UserDetails" onClick={() => setUserDetailsOpen(!userDetailsOpen)}>
          <div className="num">1</div><h1>Your Details</h1>
          {userDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {userDetailsOpen && <div className="drawerContent"> Your user details content here </div>}

        <div className="extrasDetails" onClick={() => setExtrasDetailsOpen(!extrasDetailsOpen)}>
          <div className="num">2</div><h1>Extras</h1>
          {extrasDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {extrasDetailsOpen && <div className="drawerContent"> Your extras content here </div>}

        <div className="reviewsDetails" onClick={() => setReviewsDetailsOpen(!reviewsDetailsOpen)}>
          <div className="num">3</div><h1>Reviews</h1>
          {reviewsDetailsOpen ? <RiArrowDropUpLine className='svg' /> : <RiArrowDropDownLine className='svg' />}
        </div>
        {reviewsDetailsOpen && <div className="drawerContent"> Your reviews content here </div>}
      </div>

      <div className="bookingRightContainer">
        <div className="bookingDetails">
          <p>Total </p><h4>ZAR 810</h4>
          <p>Date from - to and for how long</p>
          <p>1 room, 2 guests</p>
          <hr />
          <div className="stayDetails" onClick={() => setStayDetailsOpen(!stayDetailsOpen)}>
            <h4>Stay Details</h4>
            {stayDetailsOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </div>
          {stayDetailsOpen && <div className="drawerContent"> Your stay details content here </div>}
        </div>
      </div>
    </div>
  )
}

export default Booking;
