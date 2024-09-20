// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { collection, addDoc, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // Fetch favorites from Firestore for a given user
// export const fetchFavorites = createAsyncThunk(
//   'favorites/fetchFavorites',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const favoritesRef = collection(db, 'favorites');
//       const q = query(favoritesRef, where('userId', '==', userId));
//       const snapshot = await getDocs(q);
//       const favorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//       return favorites;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Toggle favorite status for a room
// export const toggleFavorite = createAsyncThunk(
//   'favorites/toggleFavorite',
//   async ({ roomId, userId, isFavorite }, { rejectWithValue }) => {
//     try {
//       const favoritesRef = collection(db, 'favorites');

//       if (!isFavorite) {
//         // Add to favorites
//         await addDoc(favoritesRef, { userId, roomId });
//       } else {
//         // Remove from favorites
//         const q = query(favoritesRef, where('userId', '==', userId), where('roomId', '==', roomId));
//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           const favoriteId = snapshot.docs[0].id;  // Assuming only one favorite per room
//           const docRef = doc(db, 'favorites', favoriteId);
//           await deleteDoc(docRef);
//         } else {
//           // Handle case where no favorite was found for the room (already removed or never existed)
//           return rejectWithValue('Favorite not found for removal.');
//         }
//       }

//       return { roomId, newFavoriteStatus: !isFavorite };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState: {
//     favorites: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFavorites.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchFavorites.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.favorites = action.payload;
//       })
//       .addCase(fetchFavorites.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(toggleFavorite.fulfilled, (state, action) => {
//         const { roomId, newFavoriteStatus } = action.payload;

//         if (newFavoriteStatus) {
//           state.favorites.push({ id: roomId });
//         } else {
//           state.favorites = state.favorites.filter(favorite => favorite.id !== roomId);
//         }
//       })
//       .addCase(toggleFavorite.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default favoritesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // Thunk to toggle favorite status in Firestore
// export const toggleFavorite = createAsyncThunk(
//   'favorites/toggleFavorite',
//   async ({ roomId, userId, isFavorite }, { rejectWithValue }) => {
//     console.log({ roomId, userId, isFavorite }); // Debug log
//     try {
//       const roomRef = doc(db, 'rooms', roomId);
//       await updateDoc(roomRef, {
//         favorites: isFavorite ? arrayRemove(userId) : arrayUnion(userId),
//       });
//       return { roomId, isFavorite: !isFavorite }; // Return updated state
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Initial state
// const initialState = {
//   favorites: [], // Store favorite rooms
//   loading: false,
//   error: null,
// };

// // Favorites slice
// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     setFavorites: (state, action) => {
//       state.favorites = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(toggleFavorite.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(toggleFavorite.fulfilled, (state, action) => {
//         state.loading = false;
//         const { roomId, isFavorite } = action.payload;

//         if (isFavorite) {
//           state.favorites = state.favorites.filter((room) => room.id !== roomId);
//         } else {
//           state.favorites.push({ id: roomId });
//         }
//       })
//       .addCase(toggleFavorite.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setFavorites } = favoritesSlice.actions;

// export default favoritesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, query, doc, getDocs, where, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk to toggle favorite status in Firestore
export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async ({ roomId, userId, isFavorite }, { rejectWithValue }) => {
    console.log('Toggle Favorite Called:', { roomId, userId, isFavorite });
    try {
      const favoritesRef = collection(db, 'favorites');

      if (!isFavorite) {
        // Add to favorites
        await addDoc(favoritesRef, { userId, roomId });
        console.log('Added to favorites');
      } else {
        // Remove from favorites
        const q = query(favoritesRef, where('userId', '==', userId), where('roomId', '==', roomId));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const favoriteId = snapshot.docs[0].id; 
          await deleteDoc(doc(db, 'favorites', favoriteId));
          console.log('Removed from favorites');
        } else {
          return rejectWithValue('Favorite not found for removal.');
        }
      }

      return { roomId, newFavoriteStatus: !isFavorite };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  favorites: [], // Store favorite rooms
  loading: false,
  error: null,
};

// Favorites slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { roomId, newFavoriteStatus } = action.payload;

        if (newFavoriteStatus) {
          // If favorited, add room to favorites
          state.favorites.push({ id: roomId });
        } else {
          // If unfavorited, remove room from favorites
          state.favorites = state.favorites.filter((room) => room.id !== roomId);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
