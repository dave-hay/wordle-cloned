import { createSlice } from "@reduxjs/toolkit";

const xAxisSlice = createSlice({
  name: "xAxisCounter",
  initialState: {
    value: 0,
  },
  reducers: {
    xIncremented: state => {
      state.value += 1;
    },
    xDecremented: state => {
      state.value -= 1;
    },
    xReset: state => {
      state.value = 0;
    },
    xCurrentCount: state => {
      return state;
    },
  },
});

export const { xIncremented, xDecremented, xReset } = xAxisSlice.actions;

export default xAxisSlice.reducer;