// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signInWithPopup, 
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { auth, db, googleProvider } from '../../Firebase/firebase'; // Firebase config file

// // Utility to save user data to localStorage
// const saveUserToLocalStorage = (user) => {
//   localStorage.setItem('user', JSON.stringify(user));
// };

// // Utility to load user data from localStorage
// const loadUserFromLocalStorage = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// // Utility to remove user data from localStorage
// const removeUserFromLocalStorage = () => {
//   localStorage.removeItem('user');
// };

// // Thunks for authentication

// // Sign Up User (Email/Password)
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ email, password, name, surname, phoneNumber }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userData = { uid: user.uid, email, name, surname, phoneNumber };
//       await setDoc(doc(db, 'users', user.uid), userData);

//       // Save user data to localStorage
//       saveUserToLocalStorage(userData);

//       return userData;
//     } catch (error) {
//       console.error('Error signing up:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Sign In User (Email/Password)
// export const signInUser = createAsyncThunk(
//   'auth/signInUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userDoc = await getDoc(doc(db, 'users', user.uid));

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
        
//         // Save user data to localStorage
//         saveUserToLocalStorage(userData);

//         return userData;
//       }
//       throw new Error('User data not found in Firestore');
//     } catch (error) {
//       console.error('Error signing in:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Sign In with Google
// export const signInWithGoogle = createAsyncThunk(
//   'auth/signInWithGoogle',
//   async (_, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithPopup(auth, googleProvider);
//       const user = userCredential.user;
//       const userDoc = await getDoc(doc(db, 'users', user.uid));

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
        
//         // Save user data to localStorage
//         saveUserToLocalStorage(userData);

//         return userData;
//       }
//       throw new Error('User data not found in Firestore');
//     } catch (error) {
//       console.error('Error signing in with Google:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Sign Out User
// export const signOutUser = createAsyncThunk(
//   'auth/signOutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut(auth);
      
//       // Remove user data from localStorage
//       removeUserFromLocalStorage();

//       return null; // Return null to indicate no user
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: loadUserFromLocalStorage(),  // Load from localStorage if available
//   isAuthenticated: !!loadUserFromLocalStorage(),  // Check if user is already authenticated
//   status: 'idle',
//   error: null,
// };

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = !!action.payload;

//       if (action.payload) {
//         saveUserToLocalStorage(action.payload); // Save user to localStorage when set
//       } else {
//         removeUserFromLocalStorage(); // Remove user from localStorage if no user
//       }
//     },
//     setCanBook(state, action) {
//       state.canBook = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle Sign Up
//       .addCase(signUpUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Handle Sign In
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Handle Google Sign In
//       .addCase(signInWithGoogle.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInWithGoogle.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signInWithGoogle.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Handle Sign Out
//       .addCase(signOutUser.fulfilled, (state) => {
//         state.status = 'idle';
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(signOutUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// // Firebase Auth State Listener
// export const checkAuthState = () => {
//   return (dispatch) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in
//         const userData = {
//           uid: user.uid,
//           email: user.email,
//           // Add other user properties if needed
//         };
//         dispatch(authSlice.actions.setUser(userData));
//       } else {
//         // User is signed out
//         dispatch(authSlice.actions.setUser(null));
//       }
//     });
//   };
// };

// // Export the setUser action
// export const { setUser, setCanBook } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../Firebase/firebase'; // Firebase config file

// Utility to save user data to localStorage
const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Utility to load user data from localStorage
const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Utility to remove user data from localStorage
const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

// Thunks for authentication

// Sign Up User (Email/Password)
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ email, password, name, surname, phoneNumber }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userData = { uid: user.uid, email, name, surname, phoneNumber };
//       await setDoc(doc(db, 'users', user.uid), userData);

//       // Save user data to localStorage
//       saveUserToLocalStorage(userData);

//       return userData;
//     } catch (error) {
//       console.error('Error signing up:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, name, surname, phoneNumber }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = { uid: user.uid, email, name, surname, phoneNumber };
      await setDoc(doc(db, 'users', user.uid), userData);

      saveUserToLocalStorage(userData);
      return userData;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email already in use. Redirecting to sign-in...');
        return rejectWithValue('Email already in use. Please log in.');
      }
      console.error('Error signing up:', error.message);
      return rejectWithValue(error.message);
    }
  }
);


// Sign In User (Email/Password)
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Save user data to localStorage
        saveUserToLocalStorage(userData);

        return userData;
      }
      throw new Error('User data not found in Firestore');
    } catch (error) {
      console.error('Error signing in:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Sign In with Google
// export const signInWithGoogle = createAsyncThunk(
//   'auth/signInWithGoogle',
//   async (_, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithPopup(auth, googleProvider);
//       const user = userCredential.user;
//       const userDoc = await getDoc(doc(db, 'users', user.uid));

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
        
//         // Save user data to localStorage
//         saveUserToLocalStorage(userData);

//         return userData;
//       }
//       throw new Error('User data not found in Firestore');
//     } catch (error) {
//       console.error('Error signing in with Google:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Sign In with Google - Ensure Firestore Write
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Ensure user data exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        // Create user data in Firestore if not found
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
        };
        await setDoc(userDocRef, userData);
        console.log('New user added to Firestore.');
        saveUserToLocalStorage(userData);
        return userData;
      } else {
        const userData = userSnapshot.data();
        saveUserToLocalStorage(userData);
        return userData;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      return rejectWithValue(error.message);
    }
  }
);


// Sign Out User
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      
      // Remove user data from localStorage
      removeUserFromLocalStorage();

      return null; // Return null to indicate no user
    } catch (error) {
      console.error('Error signing out:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: loadUserFromLocalStorage(),  // Load from localStorage if available
  isAuthenticated: !!loadUserFromLocalStorage(),  // Check if user is already authenticated
  status: 'idle',
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;

      if (action.payload) {
        saveUserToLocalStorage(action.payload); // Save user to localStorage when set
      } else {
        removeUserFromLocalStorage(); // Remove user from localStorage if no user
      }
    },
    setCanBook(state, action) {
      state.canBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle Sign In
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle Google Sign In
      .addCase(signInWithGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Firebase Auth State Listener
export const checkAuthState = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          // Add other user properties if needed
        };
        dispatch(authSlice.actions.setUser(userData));
      } else {
        // User is signed out
        dispatch(authSlice.actions.setUser(null));
      }
    });
  };
};

// Export the setUser action
export const { setUser, setCanBook } = authSlice.actions;

export default authSlice.reducer;