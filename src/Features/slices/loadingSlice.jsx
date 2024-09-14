import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // Action to toggle loading state
    // setLoader: (state) => {
    //   state.isLoading = !state.isLoading;
    // },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions to be used in components
export const { setLoader } = loadingSlice.actions;

// Export reducer to be included in the store
export default loadingSlice.reducer;
