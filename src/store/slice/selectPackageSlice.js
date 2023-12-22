import { createSlice } from "@reduxjs/toolkit";

const selectPackageSlice = createSlice({
  name: "selectPackage",
  initialState: {
    selectedPackages: [], 
    selectedTests:[],
  },
  reducers: {
    addPackage: (state, action) => {
      state.selectedPackages = action.payload;
    },
    addTest: (state, action) => {
      state.selectedTests = action.payload;
    },
  },
});

export const { addPackage , addTest } = selectPackageSlice.actions;
export const selectePackage = (state) => state.selectPackage.selectedPackages;
export const selecteTest = (state) => state.selectPackage.selectedTests;
export default selectPackageSlice.reducer;
