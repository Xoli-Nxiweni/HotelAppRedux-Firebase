// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../Features/slices/authSlice';
// import loadingReducer from '../Features/slices/loadingSlice'; 
// import roomReducer from '../Features/slices/roomSlice'; 

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     loading: loadingReducer, 
//     rooms: roomReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore non-serializable values in the auth state
//         ignoredActions: ['auth/signInUser/fulfilled'],
//         ignoredActionPaths: ['payload'],
//         ignoredPaths: ['auth.user'],
//       },
//     }),
// });


import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/slices/authSlice';
import loadingReducer from '../Features/slices/loadingSlice'; 
import roomReducer from '../Features/slices/roomSlice'; 
// import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';
// import persistReducer from 'redux-persist/es/persistReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
// }


export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer, 
    rooms: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in the auth state
        ignoredActions: ['auth/signInUser/fulfilled', 'auth/signUpUser/fulfilled'],
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['auth.user'],
      },
    }).concat(),
});


// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../Features/slices/authSlice';
// import loadingReducer from '../Features/slices/loadingSlice';
// import roomReducer from '../Features/slices/roomSlice';
// import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';
// import persistReducer from 'redux-persist/es/persistReducer';

// // Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// // Root reducer with persistence
// const rootReducer = persistReducer(
//   persistConfig,
//   {
//     auth: authReducer,
//     loading: loadingReducer,
//     rooms: roomReducer,
//   }
// );

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['auth/signInUser/fulfilled', 'auth/signUpUser/fulfilled'],
//         ignoredActionPaths: ['payload'],
//         ignoredPaths: ['auth.user'],
//       },
//     }).concat(),
// });

// export const persistor = persistStore(store);
