import { createSlice } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Updated import path

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user:{
            name:"",
            surname:"",
            email:"",
            password:"",
        },
        error: null
    },
    reducers:{
        signUp: (state, action) => {
            const { email, password } = action.payload; // Destructure email and password from the payload
            createUserWithEmailAndPassword(auth, email, password)
              .then(() => {
                alert('Successfully registered');
              })
              .catch((err) => {
                console.error(err.message);
                state.error = err.message; // Set the error in the state
              });
          },
    }
})

export const { signUp } = authSlice.actions;
export default authSlice.reducer;