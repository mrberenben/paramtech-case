import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [],
  basket: {
    total: 0,
    packages: []
  }
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackages: (state, action) => {
      state.packages = action.payload;
    },
    selectPackage: (state, action) => {
      if (
        !state.basket.packages.filter(item => item.id === action.payload.id)
          .length > 0
      ) {
        state.basket.packages.push(action.payload);

        let total = 0;
        state.basket.packages.map(item => (total += item.amount));

        state.basket.total = total;
      } else {
        state.basket.packages = state.basket.packages.filter(
          item => item.id !== action.payload.id
        );

        let total = 0;
        state.basket.packages.map(item => (total += item.amount));

        state.basket.total = total;
      }
    }
  }
});

export const { setPackages, selectPackage } = packageSlice.actions;
export default packageSlice.reducer;
