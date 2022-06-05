import { createSlice } from "@reduxjs/toolkit";

const isPausedSlice = createSlice({
  name: "isPaused",
  initialState: {
    value: false,
  },
  reducers: {
    pauseGame: state => {
      state.value = true;
    },
    resumeGame: state => {
      state.value = false;
    },
    isPausedStatus: state => {
      return state;
    },
  },
});

export const { pauseGame, resumeGame, isPausedStatus } = isPausedSlice.actions;

export default isPausedSlice.reducer;