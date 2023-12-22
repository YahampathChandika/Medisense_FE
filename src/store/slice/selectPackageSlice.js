import { createSlice } from "@reduxjs/toolkit";

const selectPackageSlice = createSlice({
  name: "selectPackage",
  initialState: {
    selectedPackages: [], 
    selectedTests:[],
  },
  reducers: {
    addPackage: (state, action) => {
      // Assuming action.payload is an array of selected package objects
      state.selectedPackages = action.payload;
    },
    addTest: (state, action) => {
      // Assuming action.payload is an array of selected Test objects
      state.selectedTests = action.payload;
    },
  },
});

export const { addPackage , addTest } = selectPackageSlice.actions;
export const selectePackage = (state) => state.selectPackage.selectedPackages;
export const selecteTest = (state) => state.selectPackage.selectedTests;
export default selectPackageSlice.reducer;
