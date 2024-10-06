import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase"; // Adjust this path as needed

// Thunk to fetch ratings from Firestore
export const fetchRatings = createAsyncThunk(
  "ratings/fetchRatings",
  async (_, { rejectWithValue }) => {
    try {
      const ratingsRef = collection(db, "ratings");
      const snapshot = await getDocs(ratingsRef);
      const ratings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return ratings;
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return rejectWithValue("Failed to fetch ratings."); // User-friendly message
    }
  }
);

// Thunk to add a rating to Firestore
export const addRating = createAsyncThunk(
  "ratings/addRating",
  async ({ roomId, rating }, { rejectWithValue }) => {
    try {
      const ratingsRef = collection(db, "ratings");
      const timestamp = new Date().toISOString(); // Serialize timestamp
      const ratingDetails = { roomId, rating, timestamp };

      const docRef = await addDoc(ratingsRef, ratingDetails);
      return { id: docRef.id, ...ratingDetails }; // Return the added rating with its ID
    } catch (error) {
      console.error("Error adding rating:", error);
      return rejectWithValue("Failed to add rating."); // User-friendly message
    }
  }
);

// Initial state
const initialState = {
  ratings: [],
  loading: false,
  error: null,
};

// Slice
const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    // Add any additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(addRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings.push(action.payload);
      })
      .addCase(addRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      });
  },
});

// Export actions and reducer
export default ratingsSlice.reducer;
