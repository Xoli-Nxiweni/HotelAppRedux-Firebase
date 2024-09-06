// import { createSlice } from '@reduxjs/toolkit';

// export const roomSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     searchQuery: '',
//     rooms: [],
//     filteredRooms: [],
//     selectedRoom: null,
//   },
//   reducers: {
//     fetchRooms: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     setRooms: (state, action) => {
//       state.rooms = action.payload;
//       state.filteredRooms = action.payload; // Initialize filteredRooms with all rooms
//     },
//     filterRooms: (state) => {
//       state.filteredRooms = state.rooms.filter(room =>
//         room.heading.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
//         room.location.toLowerCase().includes(state.searchQuery.toLowerCase())
//       );
//     },
//     setSelectedRoom: (state, action) => {
//       state.selectedRoom = action.payload;
//     },
//     clearSelectedRoom: (state) => {
//       state.selectedRoom = null;
//     },
//   },
// });

// export const { setSearchQuery, setRooms, filterRooms, setSelectedRoom, clearSelectedRoom, fetchRooms } = roomSlice.actions;
// export default roomSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase'; // Adjust the import path as needed

// // Thunk to fetch rooms from Firestore
// export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
//   const querySnapshot = await getDocs(collection(db, 'rooms'));
//   const roomsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   return roomsArray;
// });

// const roomSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     searchQuery: '',
//     rooms: [],
//     filteredRooms: [],
//     selectedRoom: null,
//     status: 'idle', // Adding status to handle loading and error states
//     error: null
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     setSelectedRoom: (state, action) => {
//       state.selectedRoom = action.payload;
//     },
//     clearSelectedRoom: (state) => {
//       state.selectedRoom = null;
//     },
//     filterRooms: (state) => {
//       state.selectedRoom = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRooms.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.rooms = action.payload;
//         state.filteredRooms = action.payload; // Initialize filteredRooms with all rooms
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const { setSearchQuery, setSelectedRoom, clearSelectedRoom, filterRooms } = roomSlice.actions;
// export default roomSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase'; // Adjust the import path as needed

// // Thunk to fetch rooms from Firestore
// export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
//   const querySnapshot = await getDocs(collection(db, 'hotelRooms')); // Ensure 'hotelRooms' matches your Firestore collection name
//   const roomsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   return roomsArray;
// });

// const roomSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     searchQuery: '',
//     rooms: [],
//     filteredRooms: [],
//     selectedRoom: null,
//     status: 'idle', // Adding status to handle loading and error states
//     error: null
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//       state.filteredRooms = state.rooms.filter(room =>
//         room.heading.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
//         room.location.toLowerCase().includes(state.searchQuery.toLowerCase())
//       );
//     },
//     setSelectedRoom: (state, action) => {
//       state.selectedRoom = action.payload;
//     },
//     clearSelectedRoom: (state) => {
//       state.selectedRoom = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRooms.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.rooms = action.payload;
//         state.filteredRooms = action.payload; // Initialize filteredRooms with all rooms
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = roomSlice.actions;
// export default roomSlice.reducer;


// src/redux/roomsSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
//   const roomsCollectionRef = collection(db, 'hotelRooms');
//   const querySnapshot = await getDocs(roomsCollectionRef);
//   const roomsList = querySnapshot.docs.map(doc => doc.data());
//   return roomsList;
// });

// const roomsSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     rooms: [],
//     selectedRoom: null,
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     selectRoom: (state, action) => {
//       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
//     },
//     clearSelectedRoom: (state, action) => {
//       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
//     },
//     setSearchQuery: (state, action) => {
//       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
//     },
//     setSelectedRoom: (state, action) => {
//       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRooms.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.rooms = action.payload;
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const { selectRoom, clearSelectedRoom, setSearchQuery, setSelectedRoom } = roomsSlice.actions;

// export default roomsSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
// //   const roomsCollectionRef = collection(db, 'hotelRooms');
// //   const querySnapshot = await getDocs(roomsCollectionRef);
// //   const roomsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Ensure you include the document ID
// //   return roomsList;
// // });

// export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
//   try {
//     const roomsCollectionRef = collection(db, 'hotelRooms');
//     const querySnapshot = await getDocs(roomsCollectionRef);
//     const roomsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return roomsList;
//   } catch (error) {
//     console.error('Error fetching rooms:', error);
//     throw error; // Rethrow to be caught in extraReducers
//   }
// });


// const roomsSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     rooms: [],
//     selectedRoom: null,
//     status: 'idle',
//     error: null,
//     searchQuery: '', // Add searchQuery to the state
//   },
//   reducers: {
//     selectRoom: (state, action) => {
//       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
//     },
//     clearSelectedRoom: (state) => {
//       state.selectedRoom = null;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     setSelectedRoom: (state, action) => {
//       state.selectedRoom = state.rooms.find(room => room.id === action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRooms.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.rooms = action.payload;
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const { selectRoom, clearSelectedRoom, setSearchQuery, setSelectedRoom } = roomsSlice.actions;

// export default roomsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Fetch rooms from Firestore
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  try {
    const roomsCollectionRef = collection(db, 'hotelRooms');
    const querySnapshot = await getDocs(roomsCollectionRef);
    const roomsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return roomsList;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error; // Rethrow to be caught in extraReducers
  }
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    filteredRooms: [],
    selectedRoom: null,
    status: 'idle',
    error: null,
    searchQuery: '',
    roomOpened: false,
  },
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = state.rooms.find(room => room.id === action.payload);
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Filter rooms based on the search query
      state.filteredRooms = state.rooms.filter(room => 
        room.heading.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = state.rooms.find(room => room.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;
        state.filteredRooms = action.payload; // Initialize filteredRooms with all rooms
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { selectRoom, clearSelectedRoom, setSearchQuery, setSelectedRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
