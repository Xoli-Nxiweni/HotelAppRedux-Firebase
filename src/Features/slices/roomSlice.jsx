// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import { getDocs, getDoc, collection, doc, updateDoc } from 'firebase/firestore';
// // import { db } from '../../Firebase/firebase';

// // // Thunk for fetching rooms from Firestore
// // export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async (_, { rejectWithValue }) => {
// //   try {
// //     const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
// //     const rooms = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //     console.log('Rooms returned:', rooms); // Log the rooms data for debugging
// //     return rooms;
// //   } catch (error) {
// //     console.log('Error fetching rooms:', error.message); // Log the actual error message
// //     return rejectWithValue(error.message);
// //   }
// // });

// // // Thunk for toggling favorite status
// // export const toggleFavorite = createAsyncThunk(
// //   'rooms/toggleFavorite',
// //   async (roomId, { rejectWithValue }) => {
// //     try {
// //       const roomIdStr = String(roomId);
// //       console.log(`Attempting to toggle favorite status for room ID: ${roomIdStr}`);

// //       // Create document reference
// //       const roomRef = doc(db, 'hotelRooms', roomIdStr);
// //       console.log(`Document reference path: ${roomRef.path}`);

// //       // Get document
// //       const roomDoc = await getDoc(roomRef);

// //       if (!roomDoc.exists()) {
// //         console.error(`No document found with ID: ${roomIdStr}`);
// //         return rejectWithValue('No document to update');
// //       }

// //       const roomData = roomDoc.data();
// //       if (!roomData || typeof roomData.isFavorite !== 'boolean') {
// //         console.error(`Invalid document data or missing isFavorite field for ID: ${roomIdStr}`);
// //         return rejectWithValue('Invalid document data');
// //       }

// //       const newFavoriteStatus = !roomData.isFavorite;
// //       console.log(`Current favorite status: ${roomData.isFavorite}`);
// //       console.log(`Updating favorite status to: ${newFavoriteStatus}`);

// //       await updateDoc(roomRef, { isFavorite: newFavoriteStatus });
// //       console.log(`Successfully updated favorite status for room ID: ${roomIdStr}`);

// //       return { roomId: roomIdStr, newFavoriteStatus };
// //     } catch (error) {
// //       console.error('Error updating favorite status in Firestore:', error.message);
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const addFavorite = createAsyncThunk(
// //   'favorites/addFavorite',
// //   async ({ userId, roomId }, { rejectWithValue }) => {
// //     try {
// //       const favoriteRef = collection(db, 'favorites');
// //       await addDoc(favoriteRef, {
// //         userId,
// //         roomId,
// //         addedAt: new Date().toISOString(),
// //       });
// //       return { userId, roomId };
// //     } catch (error) {
// //       console.error('Error adding favorite:', error.message);
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const removeFavorite = createAsyncThunk(
// //   'favorites/removeFavorite',
// //   async ({ userId, roomId }, { rejectWithValue }) => {
// //     try {
// //       const q = query(
// //         collection(db, 'favorites'),
// //         where('userId', '==', userId),
// //         where('roomId', '==', roomId)
// //       );
// //       const querySnapshot = await getDocs(q);
// //       const favoriteDoc = querySnapshot.docs[0];
      
// //       if (favoriteDoc) {
// //         await deleteDoc(doc(db, 'favorites', favoriteDoc.id));
// //         return { userId, roomId };
// //       } else {
// //         throw new Error('Favorite not found');
// //       }
// //     } catch (error) {
// //       console.error('Error removing favorite:', error.message);
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // const roomSlice = createSlice({
// //   name: 'rooms',
// //   initialState: {
// //     rooms: [],
// //     filteredRooms: [],
// //     searchQuery: '',
// //     selectedRoom: null,
// //     status: 'idle',
// //     error: null,
// //   },
// //   reducers: {
// //     setSearchQuery: (state, action) => {
// //       state.searchQuery = action.payload;
// //       state.filteredRooms = state.rooms.filter((room) =>
// //         room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
// //       );
// //     },
// //     setSelectedRoom: (state, action) => {
// //       state.selectedRoom = state.rooms.find((room) => room.id === action.payload);
// //     },
// //     clearSelectedRoom: (state) => {
// //       state.selectedRoom = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchRooms.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchRooms.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.rooms = action.payload;
// //         state.filteredRooms = action.payload;
// //       })
// //       .addCase(fetchRooms.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       })
// //       .addCase(toggleFavorite.pending, (state) => {
// //         // Optionally set a loading state for the favorite toggle
// //       })
// //       .addCase(toggleFavorite.fulfilled, (state, action) => {
// //         const { roomId, newFavoriteStatus } = action.payload;
// //         state.rooms = state.rooms.map(room =>
// //           room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
// //         );
// //         state.filteredRooms = state.filteredRooms.map(room =>
// //           room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
// //         );
// //       })
// //       .addCase(toggleFavorite.rejected, (state, action) => {
// //         console.error('Failed to update favorite status:', action.payload);
// //         // Optionally revert local state if Firestore update fails
// //       });
// //   },
// // });

// // export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = roomSlice.actions;
// // export default roomSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDocs, getDoc, collection, doc, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // Thunk for fetching rooms from Firestore
// export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async (_, { rejectWithValue }) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
//     const rooms = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return rooms;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Thunk for toggling favorite status
// export const toggleFavorite = createAsyncThunk(
//   'rooms/toggleFavorite',
//   async (roomId, { rejectWithValue }) => {
//     try {
//       const roomIdStr = String(roomId);
//       console.log(`Attempting to toggle favorite status for room ID: ${roomIdStr}`);

//       // Create document reference
//       const roomRef = doc(db, 'hotelRooms', roomIdStr);
//       console.log(`Document reference path: ${roomRef.path}`);

//       // Get document
//       const roomDoc = await getDoc(roomRef);

//       if (!roomDoc.exists()) {
//         console.error(`No document found with ID: ${roomIdStr}`);
//         return rejectWithValue('No document to update');
//       }

//       const roomData = roomDoc.data();
//       if (!roomData || typeof roomData.isFavorite !== 'boolean') {
//         console.error(`Invalid document data or missing isFavorite field for ID: ${roomIdStr}`);
//         return rejectWithValue('Invalid document data');
//       }

//       const newFavoriteStatus = !roomData.isFavorite;
//       console.log(`Current favorite status: ${roomData.isFavorite}`);
//       console.log(`Updating favorite status to: ${newFavoriteStatus}`);

//       await updateDoc(roomRef, { isFavorite: newFavoriteStatus });
//       console.log(`Successfully updated favorite status for room ID: ${roomIdStr}`);

//       return { roomId: roomIdStr, newFavoriteStatus };
//     } catch (error) {
//       console.error('Error updating favorite status in Firestore:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Thunk for adding a favorite
// export const addFavorite = createAsyncThunk(
//   'favorites/addFavorite',
//   async ({ userId, roomId }, { rejectWithValue }) => {
//     try {
//       const favoriteRef = collection(db, 'favorites');
//       await addDoc(favoriteRef, {
//         userId,
//         roomId,
//         addedAt: new Date().toISOString(),
//       });
//       return { userId, roomId };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for removing a favorite
// export const removeFavorite = createAsyncThunk(
//   'favorites/removeFavorite',
//   async ({ userId, roomId }, { rejectWithValue }) => {
//     try {
//       const q = query(
//         collection(db, 'favorites'),
//         where('userId', '==', userId),
//         where('roomId', '==', roomId)
//       );
//       const querySnapshot = await getDocs(q);
//       const favoriteDoc = querySnapshot.docs[0];

//       if (favoriteDoc) {
//         await deleteDoc(doc(db, 'favorites', favoriteDoc.id));
//         return { userId, roomId };
//       } else {
//         throw new Error('Favorite not found');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const roomSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     rooms: [],
//     filteredRooms: [],
//     searchQuery: '',
//     selectedRoom: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//       state.filteredRooms = state.rooms.filter((room) =>
//         room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
//       );
//     },
//     setSelectedRoom: (state, action) => {
//       state.selectedRoom = state.rooms.find((room) => room.id === action.payload);
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
//         state.filteredRooms = action.payload;
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(toggleFavorite.pending, (state) => {
//         // Optionally set a loading state for the favorite toggle
//       })
//       .addCase(toggleFavorite.fulfilled, (state, action) => {
//         const { roomId, newFavoriteStatus } = action.payload;
//         state.rooms = state.rooms.map(room =>
//           room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
//         );
//         state.filteredRooms = state.filteredRooms.map(room =>
//           room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
//         );
//       })
//       .addCase(toggleFavorite.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = roomSlice.actions;
// export default roomSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, getDoc, collection, doc, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk for fetching rooms from Firestore
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
    const rooms = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return rooms;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk for toggling favorite status
export const toggleFavorite = createAsyncThunk(
  'rooms/toggleFavorite',
  async (roomId, { rejectWithValue }) => {
    try {
      const roomIdStr = String(roomId);
      console.log(`Attempting to toggle favorite status for room ID: ${roomIdStr}`);

      const roomRef = doc(db, 'hotelRooms', roomIdStr);
      console.log(`Document reference path: ${roomRef.path}`);

      const roomDoc = await getDoc(roomRef);

      if (!roomDoc.exists()) {
        console.error(`No document found with ID: ${roomIdStr}`);
        return rejectWithValue('No document to update');
      }

      const roomData = roomDoc.data();
      if (!roomData || typeof roomData.isFavorite !== 'boolean') {
        console.error(`Invalid document data or missing isFavorite field for ID: ${roomIdStr}`);
        return rejectWithValue('Invalid document data');
      }

      const newFavoriteStatus = !roomData.isFavorite;
      console.log(`Current favorite status: ${roomData.isFavorite}`);
      console.log(`Updating favorite status to: ${newFavoriteStatus}`);

      await updateDoc(roomRef, { isFavorite: newFavoriteStatus });
      console.log(`Successfully updated favorite status for room ID: ${roomIdStr}`);

      return { roomId: roomIdStr, newFavoriteStatus };
    } catch (error) {
      console.error('Error updating favorite status in Firestore:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for adding a favorite
export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ userId, roomId }, { rejectWithValue }) => {
    try {
      const favoriteRef = collection(db, 'favorites');
      await addDoc(favoriteRef, {
        userId,
        roomId,
        addedAt: new Date().toISOString(),
      });
      return { userId, roomId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for removing a favorite
export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ userId, roomId }, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, 'favorites'),
        where('userId', '==', userId),
        where('roomId', '==', roomId)
      );
      const querySnapshot = await getDocs(q);
      const favoriteDoc = querySnapshot.docs[0];

      if (favoriteDoc) {
        await deleteDoc(doc(db, 'favorites', favoriteDoc.id));
        return { userId, roomId };
      } else {
        throw new Error('Favorite not found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    filteredRooms: [],
    searchQuery: '',
    selectedRoom: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredRooms = state.rooms.filter((room) =>
        room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = state.rooms.find((room) => room.id === action.payload);
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
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
        state.filteredRooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleFavorite.pending, (state) => {
        // Optionally set a loading state for the favorite toggle
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { roomId, newFavoriteStatus } = action.payload;
        state.rooms = state.rooms.map(room =>
          room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
        );
        state.filteredRooms = state.filteredRooms.map(room =>
          room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
        );
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;
