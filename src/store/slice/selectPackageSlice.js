import { createSlice } from "@reduxjs/toolkit";

const selectPackageSlice = createSlice({
  name: "selectPackage",
  initialState: {
    selectedPackages: [], 
    selectedTests: [],
  },
  reducers: {
    addPackage: (state, action) => {
      state.selectedPackages = action.payload;
    },
    addTest: (state, action) => {
      state.selectedTests = action.payload;
    },

    deletetest: (state, action) => {
      const testCode = action.payload;
      state.selectedTests = state.selectedTests.filter(
        (item) => item.testCode !== testCode
      );
    },

    deletePackages: (state, action) => {
      const packageCode = action.payload;
      state.selectedPackages = state.selectedPackages.filter(
        (item) => item.packageCode !== packageCode
      );
    },
  },
});


export const { addPackage , addTest , deletePackages ,deletetest } = selectPackageSlice.actions;
export const selectePackage = (state) => state.selectPackage.selectedPackages;
export const selecteTest = (state) => state.selectPackage.selectedTests;
export default selectPackageSlice.reducer;

export const selectTotalPrice = (state) => {
  const selectedPackages = state.selectPackage.selectedPackages;
  const selectedTests = state.selectPackage.selectedTests;

  // Calculate the sum of prices for selected packages and tests
  const packageSum = selectedPackages.reduce((sum, pak) => sum + pak.price, 0);
  const testSum = selectedTests.reduce((sum, test) => sum + test.price, 0);

  // Return the total sum
  return packageSum + testSum;
};
