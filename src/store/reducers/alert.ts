import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    value: {text: "", status: ""},
  },
  reducers: {
    alertOn: (state, action) => {
      state.value = action.payload;
    },
    alertOff: state => {
      state.value = {text: "", status: ""};
    },
    alertStatus: state => {
      return state;
    },
  },
});

export const { alertOn, alertOff, alertStatus } = alertSlice.actions;

export default alertSlice.reducer;
