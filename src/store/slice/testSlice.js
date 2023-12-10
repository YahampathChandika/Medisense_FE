import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "selectedTests",
  initialState: [],
  reducers: {
    setSelectedTests: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedTests } = testSlice.actions;

export default testSlice.reducer;
