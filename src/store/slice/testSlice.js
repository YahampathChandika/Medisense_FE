import { createSlice } from '@reduxjs/toolkit';

const selectedTestsSlice = createSlice({
  name: 'selectedTests',
  initialState: [],
  reducers: {
    addSelectedTest: (state, action) => {
      state.push(action.payload);
    },
    removeSelectedTest: (state, action) => {
      return state.filter((testId) => testId !== action.payload);
    },
    clearSelectedTests: (state) => {
      return [];
    },
  },
});

export const {
  addSelectedTest,
  removeSelectedTest,
  clearSelectedTests,
} = selectedTestsSlice.actions;

export default selectedTestsSlice.reducer;