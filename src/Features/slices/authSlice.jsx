// // import { createSlice } from "@reduxjs/toolkit";
// // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../../firebase"; // Updated import path

// // const authSlice = createSlice({
// //     name: 'auth',
// //     initialState:{
// //         user:{
// //             name:"",
// //             surname:"",
// //             email:"",
// //             password:"",
// //         },
// //         error: null
// //     },
// //     reducers:{
// //         signUp: (state, action) => {
// //             const { email, password } = action.payload; // Destructure email and password from the payload
// //             createUserWithEmailAndPassword(auth, email, password)
// //               .then(() => {
// //                 alert('Successfully registered');
// //               })
// //               .catch((err) => {
// //                 console.error(err.message);
// //                 state.error = err.message; // Set the error in the state
// //               });
// //           },
// //     }
// // })

// // export const { signUp } = authSlice.actions;
// // export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from "../../firebase"; // Adjust the import path to your project structure

// // Async thunk for signing up
// export const signUp = createAsyncThunk(
//   "auth/signUp",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for signing in
// export const signIn = createAsyncThunk(
//   "auth/signIn",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for signing out
// export const logOut = createAsyncThunk(
//   "auth/logOut",
//   async (_, thunkAPI) => {
//     try {
//       await signOut(auth);
//       return true;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     error: null,
//     status: "idle",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUp.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.error = null;
//         state.status = "succeeded";
//       })
//       .addCase(signUp.rejected, (state, action) => {
//         state.error = action.payload;
//         state.status = "failed";
//       })
//       .addCase(signIn.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.error = null;
//         state.status = "succeeded";
//       })
//       .addCase(signIn.rejected, (state, action) => {
//         state.error = action.payload;
//         state.status = "failed";
//       })
//       .addCase(logOut.fulfilled, (state) => {
//         state.user = null;
//         state.error = null;
//         state.status = "idle";
//       })
//       .addCase(logOut.rejected, (state, action) => {
//         state.error = action.payload;
//         state.status = "failed";
//       });
//   },
// });

// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../Firebase/firebase'

// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const signInUser = createAsyncThunk(
//   'auth/signInUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     error: null,
//     loading: false,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem('user');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUpUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(signInUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth } from '../../Firebase/firebase'; // Assuming you have a firebaseConfig file
// import { signInWithEmailAndPassword } from 'firebase/auth';

// // Async thunk for sign-in
// export const signInUser = createAsyncThunk('auth/signInUser', async ({ email, password }) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


// // authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth } from '../../Firebase/firebase'; // Adjust the import as necessary
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// // Thunks for sign-in and sign-up
// export const signUpUser = createAsyncThunk('auth/signUpUser', async ({ email, password }) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// export const signInUser = createAsyncThunk('auth/signInUser', async ({ email, password }) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//     signIn: signInUser,
//     signUp: signUpUser
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUpUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout, signIn, signUp } = authSlice.actions;
// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth } from '../../Firebase/firebase'; // Adjust the import as necessary
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// // Thunks for sign-in, sign-up, and sign-out
// export const signUpUser = createAsyncThunk('auth/signUpUser', async ({ email, password }) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// export const signInUser = createAsyncThunk('auth/signInUser', async ({ email, password }) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
//   await signOut(auth);
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user from localStorage
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     signIn: signInUser,
//     signOut: signOutUser
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUpUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//         state.status = 'succeeded';
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//         state.status = 'succeeded';
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(signOutUser.fulfilled, (state) => {
//         state.user = null;
//         localStorage.removeItem('user');
//       });
//   },
// });

// export const { clearError, signIn } = authSlice.actions;
// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth } from '../../Firebase/firebase'; // Adjust the import path as necessary
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// // Thunks for sign-in, sign-up, and sign-out
// export const signUpUser = createAsyncThunk('auth/signUpUser', async ({ email, password }) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// export const signInUser = createAsyncThunk('auth/signInUser', async ({ email, password }) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   };
// });

// export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
//   await signOut(auth);
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user from localStorage
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUpUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//         state.status = 'succeeded';
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//         state.status = 'succeeded';
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(signOutUser.fulfilled, (state) => {
//         state.user = null;
//         localStorage.removeItem('user');
//         state.status = 'idle';
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;

// authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebaseConfig';

// export const signOutUser = createAsyncThunk(
//   'auth/signOutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for signing in the user
// export const signInUser = createAsyncThunk(
//   'auth/signInUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for signing up the user
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     error: null,
//     status: 'idle',
//   },
//   reducers: {
//     signOutUser: (state) => {
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(signUpUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { signOutUser } = authSlice.actions;
// export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from '../../Firebase/firebase';

// // Thunk for signing in the user
// export const signInUser = createAsyncThunk(
//   'auth/signInUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for signing up the user
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for signing out the user
// export const signOutUser = createAsyncThunk(
//   'auth/signOutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut(auth);
//       return true;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     error: null,
//     status: 'idle',
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signInUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signInUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(signInUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(signUpUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(signOutUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signOutUser.fulfilled, (state) => {
//         state.status = 'succeeded';
//         state.user = null;
//         state.error = null;
//       })
//       .addCase(signOutUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../Firebase/firebase';

// Thunk for signing in the user
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    // Directly set the user, useful for session persistence
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    signOutUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
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
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
