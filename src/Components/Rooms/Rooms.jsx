import './Rooms.css'
import { IoSearchSharp } from "react-icons/io5";

const Rooms = () => {
  return (
    <div className='Rooms'>
      <div className="topPart">
        <div className="searchPart">
          <IoSearchSharp />
          <input type="text" placeholder='Where to sleep?' />
        </div>
        <div className="checkIn">
          Check in
          {/* Date input with custom styling */}
          <input type="date" className='dateInput' />
        </div>
        <div className="checkOut">
          Check out
          {/* Date input with custom styling */}
          <input type="date" className='dateInput' placeholder='__/__/__' />
        </div>
        <div className="guestsAndRooms">
          Guests and rooms
          {/* Custom select for guests and rooms */}
          <select className='guestsAndRoomsSelect'>
            <option value="">Select</option>
            {/* Add options for guests and rooms */}
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6">6 Guests</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button className='searchBtn'>Search</button>
      </div>
    </div>
  )
}

export default Rooms
