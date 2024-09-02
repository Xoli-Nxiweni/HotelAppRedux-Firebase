import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/slices/authSlice';
import loadingReducer from '../Features/slices/loadingSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in the auth state
        ignoredActions: ['auth/signInUser/fulfilled'],
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['auth.user'],
      },
    }),
});
