// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signInWithPopup, 
//   signOut 
// } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { auth, db, googleProvider } from '../../../Firebase/firebase'; // Firebase config file

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
//       localStorage.setItem('user', JSON.stringify(userData));

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
//         localStorage.setItem('user', JSON.stringify(userData));
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
//         localStorage.setItem('user', JSON.stringify(userData));
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
//       localStorage.removeItem('user');
//       return null; // Return null to indicate no user
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Set User Action
// export const setUser = (user) => {
//   return {
//     type: 'auth/setUser',
//     payload: user,
//   };
// };

// // Initial state
// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   isAuthenticated: !!localStorage.getItem('user'),
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

// // Export the setUser action
// export const { setUser: setUserAction } = authSlice.actions;

// export default authSlice.reducer;
