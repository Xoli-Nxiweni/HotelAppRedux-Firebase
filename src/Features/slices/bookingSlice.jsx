import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk to fetch bookings from Firestore
// export const fetchBookings = createAsyncThunk(
//   'bookings/fetchBookings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const bookingsRef = collection(db, 'bookings');
//       const snapshot = await getDocs(bookingsRef);
//       const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       return bookings;
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk to add a new booking to Firestore
// export const addBooking = createAsyncThunk(
//   'bookings/addBooking',
//   async (bookingDetails, { rejectWithValue }) => {
//     try {
//       const bookingsRef = collection(db, 'bookings');
//       const docRef = await addDoc(bookingsRef, bookingDetails);
//       return { id: docRef.id, ...bookingDetails };
//     } catch (error) {
//       console.error('Error adding booking:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk to book a room
// export const bookRoom = createAsyncThunk(
//   'bookings/bookRoom',
//   async (bookingDetails, { rejectWithValue }) => {
//     try {
//       console.log('Booking details:', bookingDetails);

//       const {
//         uid,
//         name,
//         email,
//         room: selectedRoomId, // Consistent with Firestore naming
//         checkInDate,
//         checkOutDate,
//         numRooms,
//         numGuests,
//         extras,
//         specialRequests,
//         price: totalAmount, // Rename 'price' to 'totalAmount'
//         status = 'Pending',
//       } = bookingDetails;

//       if (!uid || !selectedRoomId || !checkInDate || !checkOutDate || !name || !email) {
//         throw new Error('Missing required booking details');
//       }

//       // Validate if user exists
//       const usersRef = collection(db, 'users');
//       const userQuery = query(usersRef, where('uid', '==', uid));
//       const userSnapshot = await getDocs(userQuery);

//       if (userSnapshot.empty) {
//         throw new Error('User does not exist');
//       }

//       // Prepare booking data
//       const newBookingData = {
//         uid,
//         name,
//         email,
//         selectedRoomId,
//         checkInDate,
//         checkOutDate,
//         numRooms,
//         numGuests,
//         extras,
//         specialRequests,
//         totalAmount,
//         status,
//         createdAt: new Date().toISOString()
//       };

//       const bookingsCollectionRef = collection(db, 'bookings');
//       const docRef = await addDoc(bookingsCollectionRef, newBookingData);

//       return { id: docRef.id, ...newBookingData };
//     } catch (error) {
//       console.error('Error booking room:', error.message, error);
//       return rejectWithValue(error.message || 'Failed to book the room.');
//     }
//   }
// );

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

export const addBooking = createAsyncThunk('bookings/addBooking', async (bookingDetails, { rejectWithValue }) => {
  try {
    const bookingsRef = collection(db, 'bookings');
    await addDoc(bookingsRef, bookingDetails);
    return bookingDetails;
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
      console.log('booking details:', bookingDetails);

      const {
        uid,
        name,
        email,
        room,
        checkInDate,
        checkOutDate,
        numRooms,
        numGuests,
        extras = [], // Default to an empty array
        specialRequests = '',
        price,
      } = bookingDetails;

      // Validate required fields
      if (!uid || !name || !email || !room || !checkInDate || !checkOutDate) {
        throw new Error('Missing required booking details');
      }

      // Check if user exists in Firestore
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('uid', '==', uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        throw new Error('User does not exist');
      }

      // Prepare booking data
      const newBookingData = {
        uid,
        name,
        email,
        room,
        checkInDate,
        checkOutDate,
        numRooms,
        numGuests: parseInt(numGuests, 10),
        extras,
        specialRequests,
        price: parseFloat(price),
        createdAt: new Date().toISOString(),
      };

      // Add the booking to Firestore
      const bookingsCollectionRef = collection(db, 'bookings');
      const docRef = await addDoc(bookingsCollectionRef, newBookingData);

      console.log('Booking added with ID:', docRef.id);
      return { id: docRef.id, ...newBookingData };
    } catch (error) {
      console.error('Error adding booking:', error.message);
      return rejectWithValue(error.message || 'Failed to book the room.');
    }
  }
);



// Initial state
const initialState = {
  bookings: [], // Store bookings
  loading: false, // Track loading state
  error: null, // Store errors
  bookingDetails: {
    checkInDate: '',
    checkOutDate: '',
    name: '', // Consistent with 'name' used in thunks
    email: '',
    extras: [],
    specialRequests: '',
    totalAmount: 0,
    uid: '',
    selectedRoomId: '',
    numRooms: 1,
    numGuests: 1,
    status: 'pending',
  },
};

// Booking slice
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
      state.bookingDetails = { ...initialState.bookingDetails };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.bookingDetails = { ...initialState.bookingDetails }; // Reset after booking
      })
      .addCase(bookRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {
  setBookings,
  setLoadingBookings,
  updateBookingDetails,
  resetBookingDetails,
} = bookingSlice.actions;

export default bookingSlice.reducer;
