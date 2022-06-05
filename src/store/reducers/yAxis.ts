import { createSlice } from "@reduxjs/toolkit";

const yAxisSlice = createSlice({
  name: "yAxisCounter",
  initialState: {
    value: 0,
  },
  reducers: {
    yIncremented: state => {
      state.value += 1;
    },
    yDecremented: state => {
      state.value -= 1;
    },
    yCurrentCount: state => {
      return state;
    },
  },
});

export const { yIncremented, yDecremented } = yAxisSlice.actions;

export default yAxisSlice.reducer;