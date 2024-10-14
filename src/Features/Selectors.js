// selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectRooms = (state) => state.rooms.rooms || [];
export const selectFilteredRooms = (state) => state.rooms.filteredRooms || [];
export const selectSearchQuery = (state) => state.rooms.searchQuery || "";
export const selectStatus = (state) => state.rooms.status || "idle";
export const selectError = (state) => state.rooms.error || null;
export const selectSelectedRoom = (state) => state.rooms.selectedRoom;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Memoized selector for filtered rooms based on search query
export const selectFilteredRoomsMemoized = createSelector(
  [selectRooms, selectSearchQuery],
  (rooms, searchQuery) => {
    if (!searchQuery) return rooms;
    return rooms.filter(room => room.heading.toLowerCase().includes(searchQuery.toLowerCase()));
  }
);
