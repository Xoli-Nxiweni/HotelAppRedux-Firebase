import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/slices/authSlice';
import loadingReducer from '../Features/slices/loadingSlice'; 
import roomReducer from '../Features/slices/roomSlice'; 
import bookingReducer from '../Features/slices/bookingSlice';
import userProfileReducer from '../Features/slices/userProfileSlice';
import favoritesReducer from '../Features/slices/favoritesSlice'; // Import the favorites slice
import contactReducer from '../Features/slices/contactSlice';
import ratingsReducer from '../Features/slices/ratingsSlice';
// Configure store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer, 
    rooms: roomReducer,
    booking: bookingReducer,
    userProfile: userProfileReducer,
    favorites: favoritesReducer,
    contact: contactReducer,
    ratings: ratingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/signInUser/fulfilled',
          'auth/signUpUser/fulfilled',
          'favorites/toggleFavorite/fulfilled', // Add actions to ignore if necessary
        ],
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['auth.user'],
      },
    }),
});
