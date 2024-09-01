import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
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
