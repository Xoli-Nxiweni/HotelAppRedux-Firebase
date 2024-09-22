// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// // import { db } from '../../Firebase/firebase';

// // // Async action to add booking to Firestore
// // export const addBooking = createAsyncThunk('bookings/addBooking', async (bookingDetails, { rejectWithValue }) => {
// //   try {
// //     const bookingsRef = collection(db, 'bookings');
// //     await addDoc(bookingsRef, bookingDetails);
// //     return bookingDetails;
// //   } catch (error) {
// //     console.error('Error adding booking:', error);
// //     return rejectWithValue(error.message);
// //   }
// // });

// // // Thunk to book a room and store booking details in Firestore
// // export const bookRoom = createAsyncThunk(
// //   'booking/bookRoom',
// //   async (bookingDetails, { rejectWithValue }) => {
// //     try {
// //       console.log('Attempting to add booking:', bookingDetails);

// //       const {
// //         userId,
// //         selectedRoomId,
// //         checkInDate,
// //         checkOutDate,
// //         guestName,
// //         contactInfo,
// //         extras,
// //         specialRequests,
// //         review,
// //         paymentMethodId,
// //         totalAmount,
// //         numRooms,
// //         numGuests
// //       } = bookingDetails;

// //       // Validate required booking details
// //       if (!userId || !selectedRoomId || !checkInDate || !checkOutDate || !guestName || !contactInfo) {
// //         throw new Error('Missing required booking details');
// //       }

// //       // Validate userId exists in Firestore
// //       const usersRef = collection(db, 'users');
// //       const userQuery = query(usersRef, where('uid', '==', userId));
// //       const userSnapshot = await getDocs(userQuery);

// //       if (userSnapshot.empty) {
// //         throw new Error('User does not exist');
// //       }

// //       // Add booking details to Firestore
// //       const bookingsCollectionRef = collection(db, 'bookings');
// //       const docRef = await addDoc(bookingsCollectionRef, {
// //         userId,
// //         selectedRoomId,
// //         checkInDate,
// //         checkOutDate,
// //         guestName,
// //         contactInfo,
// //         extras,
// //         specialRequests,
// //         review,
// //         paymentMethodId,
// //         totalAmount,
// //         numRooms,
// //         numGuests,
// //         createdAt: new Date(),
// //       });

// //       console.log('Booking added with ID:', docRef.id);

// //       return { id: docRef.id, ...bookingDetails };
// //     } catch (error) {
// //       console.error('Error adding booking:', error.message);
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // const bookingSlice = createSlice({
// //   name: 'booking',
// //   initialState: {
// //     rooms: [],
// //     selectedRoom: null,
// //     bookingDetails: {
// //       checkInDate: '',
// //       checkOutDate: '',
// //       guestName: '',
// //       contactInfo: '',
// //       extras: [],
// //       specialRequests: '',
// //       review: '',
// //       paymentMethodId: '',
// //       totalAmount: 0,
// //       userId: '',
// //       selectedRoomId: '',
// //       numRooms: 1,
// //       numGuests: 1
// //     },
// //     status: 'idle',
// //     error: null,
// //     bookingStatus: 'idle',
// //   },
// //   reducers: {
// //     selectRoom: (state, action) => {
// //       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
// //     },
// //     clearSelectedRoom: (state) => {
// //       state.selectedRoom = null;
// //     },
// //     updateBookingDetails: (state, action) => {
// //       state.bookingDetails = { ...state.bookingDetails, ...action.payload };
// //     },
// //     resetBookingDetails: (state) => {
// //       state.bookingDetails = {
// //         checkInDate: '',
// //         checkOutDate: '',
// //         guestName: '',
// //         contactInfo: '',
// //         extras: [],
// //         specialRequests: '',
// //         review: '',
// //         paymentMethodId: '',
// //         totalAmount: 0,
// //         userId: '',
// //         selectedRoomId: '',
// //         numRooms: 1,
// //         numGuests: 1
// //       };
// //     },
// //     toggleFavorite: (state, action) => {
// //       const roomId = action.payload;
// //       const room = state.rooms.find(room => room.id === roomId);
// //       if (room) {
// //         room.isFavorite = !room.isFavorite;
// //       }
// //     },
// //     setBookings: (state, action) => {
// //       state.bookingStatus = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(bookRoom.pending, (state) => {
// //         state.bookingStatus = 'loading';
// //       })
// //       .addCase(bookRoom.fulfilled, (state, action) => {
// //         state.bookingStatus = 'succeeded';
// //         console.log('Booking success:', action.payload);
// //         state.bookingDetails = {
// //           checkInDate: '',
// //           checkOutDate: '',
// //           guestName: '',
// //           contactInfo: '',
// //           extras: [],
// //           specialRequests: '',
// //           review: '',
// //           paymentMethodId: '',
// //           totalAmount: 0,
// //           userId: '',
// //           selectedRoomId: '',
// //           numRooms: 1,
// //           numGuests: 1
// //         };
// //       })
// //       .addCase(bookRoom.rejected, (state, action) => {
// //         state.bookingStatus = 'failed';
// //         console.error('Booking error:', action.payload);
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { selectRoom, clearSelectedRoom, updateBookingDetails, resetBookingDetails, toggleFavorite, setBookings } = bookingSlice.actions;

// // export default bookingSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // Thunk to fetch bookings from Firestore
// export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (_, { rejectWithValue }) => {
//   try {
//     const bookingsRef = collection(db, 'bookings');
//     const snapshot = await getDocs(bookingsRef);
//     const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return bookings;
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     return rejectWithValue(error.message);
//   }
// });

// export const addBooking = createAsyncThunk('bookings/addBooking', async (bookingDetails, { rejectWithValue }) => {
//   try {
//     const bookingsRef = collection(db, 'bookings');
//     await addDoc(bookingsRef, bookingDetails);
//     return bookingDetails;
//   } catch (error) {
//     console.error('Error adding booking:', error);
//     return rejectWithValue(error.message);
//   }
// });

// // Thunk to book a room and store booking details in Firestore
// export const bookRoom = createAsyncThunk(
//   'bookings/bookRoom',
//   async (bookingDetails, { rejectWithValue }) => {
//     try {
//       const {
//         userId,
//         selectedRoomId,
//         checkInDate,
//         checkOutDate,
//         guestName,
//         contactInfo,
//         extras,
//         specialRequests,
//         review,
//         paymentMethodId,
//         totalAmount,
//         numRooms,
//         numGuests
//       } = bookingDetails;

//       // Validate required booking details
//       if (!userId || !selectedRoomId || !checkInDate || !checkOutDate || !guestName || !contactInfo) {
//         throw new Error('Missing required booking details');
//       }

//       // Check if user exists in Firestore
//       const usersRef = collection(db, 'users');
//       const userQuery = query(usersRef, where('uid', '==', userId));
//       const userSnapshot = await getDocs(userQuery);

//       if (userSnapshot.empty) {
//         throw new Error('User does not exist');
//       }

//       // Add booking details to Firestore
//       const bookingsCollectionRef = collection(db, 'bookings');
//       const docRef = await addDoc(bookingsCollectionRef, {
//         userId,
//         selectedRoomId,
//         checkInDate,
//         checkOutDate,
//         guestName,
//         contactInfo,
//         extras,
//         specialRequests,
//         review,
//         paymentMethodId,
//         totalAmount,
//         numRooms,
//         numGuests,
//         createdAt: new Date(),
//       });

//       console.log('Booking added with ID:', docRef.id);

//       return { id: docRef.id, ...bookingDetails };
//     } catch (error) {
//       console.error('Error adding booking:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Initial state
// const initialState = {
//   bookings: [], // Store bookings
//   loading: false, // Track loading status
//   error: null,
//   bookingDetails: {
//     checkInDate: '',
//     checkOutDate: '',
//     guestName: '',
//     contactInfo: '',
//     extras: [],
//     specialRequests: '',
//     review: '',
//     paymentMethodId: '',
//     totalAmount: 0,
//     userId: '',
//     selectedRoomId: '',
//     numRooms: 1,
//     numGuests: 1,
//   },
// };

// // Slice
// // export const bookingSlice = createSlice({
// //   name: 'bookings',
// //   initialState: [],
// //   reducers: {
// //     setBookings: (state, action) => {
// //       state.bookings = action.payload;
// //     },
// //     setLoadingBookings: (state, action) => {
// //       state.loading = action.payload;
// //     },
// //     updateBookingDetails: (state, action) => {
// //       state.bookingDetails = { ...state.bookingDetails, ...action.payload };
// //     },
// //     resetBookingDetails: (state) => {
// //       state.bookingDetails = {
// //         checkInDate: '',
// //         checkOutDate: '',
// //         guestName: '',
// //         contactInfo: '',
// //         extras: [],
// //         specialRequests: '',
// //         review: '',
// //         paymentMethodId: '',
// //         totalAmount: 0,
// //         userId: '',
// //         selectedRoomId: '',
// //         numRooms: 1,
// //         numGuests: 1,
// //       };
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchBookings.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchBookings.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.bookings = action.payload;
// //       })
// //       .addCase(fetchBookings.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(bookRoom.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(bookRoom.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.bookings.push(action.payload);
// //         state.bookingDetails = initialState.bookingDetails; // Reset after successful booking
// //       })
// //       .addCase(bookRoom.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // Slice
// export const bookingSlice = createSlice({
//   name: 'bookings',
//   initialState, // Use the initial state object defined earlier
//   reducers: {
//     setBookings: (state, action) => {
//       state.booking = action.payload;
//     },
//     setLoadingBookings: (state, action) => {
//       state.loading = action.payload;
//     },
//     updateBookingDetails: (state, action) => {
//       state.bookingDetails = { ...state.bookingDetails, ...action.payload };
//     },
//     resetBookingDetails: (state) => {
//       state.bookingDetails = initialState.bookingDetails;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookings.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBookings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.booking = action.payload;
//       })
//       .addCase(fetchBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(bookRoom.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(bookRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         state.booking.push(action.payload);
//         state.bookingDetails = initialState.bookingDetails; // Reset after successful booking
//       })
//       .addCase(bookRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });


// export const { setBookings, setLoadingBookings, updateBookingDetails, resetBookingDetails } = bookingSlice.actions;

// export default bookingSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // Thunk to fetch bookings from Firestore
// export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (_, { rejectWithValue }) => {
//   try {
//     const bookingsRef = collection(db, 'bookings');
//     const snapshot = await getDocs(bookingsRef);
//     const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return bookings;
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     return rejectWithValue(error.message);
//   }
// });

// // Thunk to add booking to Firestore
// export const addBooking = createAsyncThunk('bookings/addBooking', async (bookingDetails, { rejectWithValue }) => {
//   try {
//     const bookingsRef = collection(db, 'bookings');
//     const docRef = await addDoc(bookingsRef, bookingDetails);
//     return { id: docRef.id, ...bookingDetails };
//   } catch (error) {
//     console.error('Error adding booking:', error);
//     return rejectWithValue(error.message);
//   }
// });

// // Thunk to confirm a booking
// export const confirmBooking = createAsyncThunk('bookings/confirmBooking', async (bookingId, { rejectWithValue }) => {
//   try {
//     const bookingRef = doc(db, 'bookings', bookingId);
//     await updateDoc(bookingRef, { isBooked: true });
//     return bookingId; // Return the ID for updating state
//   } catch (error) {
//     console.error('Error confirming booking:', error);
//     return rejectWithValue(error.message);
//   }
// });

// // Thunk to reject a booking
// export const rejectBooking = createAsyncThunk('bookings/rejectBooking', async (bookingId, { rejectWithValue }) => {
//   try {
//     const bookingRef = doc(db, 'bookings', bookingId);
//     await updateDoc(bookingRef, { isBooked: false }); // You might want to delete instead
//     return bookingId; // Return the ID for updating state
//   } catch (error) {
//     console.error('Error rejecting booking:', error);
//     return rejectWithValue(error.message);
//   }
// });

// // Initial state
// const initialState = {
//   bookings: [],
//   loading: false,
//   error: null,
//   bookingDetails: {
//     checkInDate: '',
//     checkOutDate: '',
//     guestName: '',
//     contactInfo: '',
//     extras: [],
//     specialRequests: '',
//     review: '',
//     paymentMethodId: '',
//     totalAmount: 0,
//     userId: '',
//     selectedRoomId: '',
//     numRooms: 1,
//     numGuests: 1,
//   },
// };

// // Slice
// const bookingSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {
//     setBookings: (state, action) => {
//       state.bookings = action.payload;
//     },
//     resetBookingDetails: (state) => {
//       state.bookingDetails = initialState.bookingDetails;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookings.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBookings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = action.payload;
//       })
//       .addCase(fetchBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addBooking.fulfilled, (state, action) => {
//         state.bookings.push(action.payload);
//         state.bookingDetails = initialState.bookingDetails; // Reset after successful booking
//       })
//       .addCase(confirmBooking.fulfilled, (state, action) => {
//         const index = state.bookings.findIndex(booking => booking.id === action.payload);
//         if (index !== -1) {
//           state.bookings[index].isBooked = true; // Update state to reflect confirmation
//         }
//       })
//       .addCase(rejectBooking.fulfilled, (state, action) => {
//         const index = state.bookings.findIndex(booking => booking.id === action.payload);
//         if (index !== -1) {
//           state.bookings[index].isBooked = false; // Update state to reflect rejection
//         }
//       });
//   },
// });

// export const { setBookings, resetBookingDetails } = bookingSlice.actions;

// export default bookingSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk to fetch bookings from Firestore
export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (_, { rejectWithValue }) => {
  try {
    const bookingsRef = collection(db, 'bookings');
    const snapshot = await getDocs(bookingsRef);
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return rejectWithValue(error.message);
  }
});

// Thunk to add booking to Firestore
export const addBooking = createAsyncThunk('bookings/addBooking', async (bookingDetails, { rejectWithValue }) => {
  try {
    const bookingsRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsRef, bookingDetails);
    return { id: docRef.id, ...bookingDetails };
  } catch (error) {
    console.error('Error adding booking:', error);
    return rejectWithValue(error.message);
  }
});

// Thunk to book a room and store booking details in Firestore
export const bookRoom = createAsyncThunk(
  'bookings/bookRoom',
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const {
        userId,
        selectedRoomId,
        checkInDate,
        checkOutDate,
        guestName,
        contactInfo,
        extras,
        specialRequests,
        review,
        paymentMethodId,
        totalAmount,
        numRooms,
        numGuests,
      } = bookingDetails;

      // Validate required booking details
      if (!userId || !selectedRoomId || !checkInDate || !checkOutDate || !guestName || !contactInfo) {
        throw new Error('Missing required booking details');
      }

      // Check if user exists in Firestore
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('uid', '==', userId));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        throw new Error('User does not exist');
      }

      // Add booking details to Firestore
      const bookingsCollectionRef = collection(db, 'bookings');
      const docRef = await addDoc(bookingsCollectionRef, {
        userId,
        selectedRoomId,
        checkInDate,
        checkOutDate,
        guestName,
        contactInfo,
        extras,
        specialRequests,
        review,
        paymentMethodId,
        totalAmount,
        numRooms,
        numGuests,
        createdAt: new Date(),
      });

      return { id: docRef.id, ...bookingDetails };
    } catch (error) {
      console.error('Error booking room:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  bookings: [], // Store bookings
  loading: false, // Track loading status
  error: null, // Track errors
  bookingDetails: {
    checkInDate: '',
    checkOutDate: '',
    guestName: '',
    contactInfo: '',
    extras: [],
    specialRequests: '',
    review: '',
    paymentMethodId: '',
    totalAmount: 0,
    userId: '',
    selectedRoomId: '',
    numRooms: 1,
    numGuests: 1,
  },
};

// Slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setLoadingBookings: (state, action) => {
      state.loading = action.payload;
    },
    updateBookingDetails: (state, action) => {
      state.bookingDetails = { ...state.bookingDetails, ...action.payload };
    },
    resetBookingDetails: (state) => {
      state.bookingDetails = {
        checkInDate: '',
        checkOutDate: '',
        guestName: '',
        contactInfo: '',
        extras: [],
        specialRequests: '',
        review: '',
        paymentMethodId: '',
        totalAmount: 0,
        userId: '',
        selectedRoomId: '',
        numRooms: 1,
        numGuests: 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.bookingDetails = initialState.bookingDetails; // Reset booking details after successful booking
      })
      .addCase(bookRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setBookings, setLoadingBookings, updateBookingDetails, resetBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
