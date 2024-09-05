import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // Action to set loading state to true
    showLoader: (state) => {
      state.isLoading = true;
    },
    // Action to set loading state to false
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

// Export actions to be used in components
export const { showLoader, hideLoader } = loadingSlice.actions;

// Export reducer to be included in the store
export default loadingSlice.reducer;