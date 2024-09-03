import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    searchQuery: '',
    rooms: [],
    filteredRooms: [],
    selectedRoom: null,
  },
  reducers: {
    fetchRooms: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
      state.filteredRooms = action.payload; // Initialize filteredRooms with all rooms
    },
    filterRooms: (state) => {
      state.filteredRooms = state.rooms.filter(room =>
        room.heading.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
  },
});

export const { setSearchQuery, setRooms, filterRooms, setSelectedRoom, clearSelectedRoom, fetchRooms } = roomSlice.actions;
export default roomSlice.reducer;
