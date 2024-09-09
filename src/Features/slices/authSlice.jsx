import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Thunk for signing in the user
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', JSON.stringify(userCredential.user)); // Persist user
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for signing up the user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', JSON.stringify(userCredential.user)); // Persist user
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for signing out the user
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('user'); // Remove user from localStorage
      return null; // Return null on success
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for Google sign-in
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      localStorage.setItem('user', JSON.stringify(userCredential.user)); // Persist user
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for adding/updating user data in Firestore
export const saveUserToFirestore = createAsyncThunk(
  'auth/saveUserToFirestore',
  async (userData, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userData.uid);
      await setDoc(userRef, userData, { merge: true });
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching user data from Firestore
export const fetchUserFromFirestore = createAsyncThunk(
  'auth/fetchUserFromFirestore',
  async (userId, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        throw new Error('No such user!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting user data from Firestore
export const deleteUserFromFirestore = createAsyncThunk(
  'auth/deleteUserFromFirestore',
  async (userId, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Safe function to load user from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // If user is found, parse it, otherwise return null
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null; // Return null if there's an error
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUserFromLocalStorage(), 
    error: null,
    status: 'idle',
    authOpen: false,
    canBook: false,
  },
  reducers: {
    // Directly set the user, useful for session persistence
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save to localStorage
    },
    // Clear user state and localStorage
    signOutUser: (state) => {
      state.user = null;
      state.error = null;
      state.status = 'idle';
      localStorage.removeItem('user'); // Remove from localStorage
    },
    // Toggle authentication modal open/close
    toggleAuthOpen: (state) => {
      state.authOpen = !state.authOpen;
    },
    setCanBook: (state) => {
      if(state.user){
        state.canBook = !state.canBook;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in user cases
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Sign up user cases
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Sign out user cases
      .addCase(signOutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Google sign-in cases
      .addCase(signInWithGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Save user to Firestore cases
      .addCase(saveUserToFirestore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUserToFirestore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(saveUserToFirestore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch user from Firestore cases
      .addCase(fetchUserFromFirestore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFromFirestore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserFromFirestore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete user from Firestore cases
      .addCase(deleteUserFromFirestore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserFromFirestore.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.error = null;
      })
      .addCase(deleteUserFromFirestore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, toggleAuthOpen, setCanBook } = authSlice.actions;
export default authSlice.reducer;
