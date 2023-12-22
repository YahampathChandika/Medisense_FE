import { createSlice } from "@reduxjs/toolkit";

const selectPackageSlice = createSlice({
  name: "selectPackage",
  initialState: {
    selectedPackages: [], // Change the property name to selectedPackages
  },
  reducers: {
    addPackage: (state, action) => {
      // Assuming action.payload is an array of selected package objects
      state.selectedPackages = action.payload;
    },
  },
});

export const { addPackage } = selectPackageSlice.actions;
export const selectePackage = (state) => state.selectPackage.selectedPackages;
export default selectPackageSlice.reducer;
