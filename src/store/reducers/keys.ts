import { createSlice }                 from "@reduxjs/toolkit";
import { KeyLetterState, NewKeyColor } from "../../types/keys";
import initialKeysStateValue           from "./reducer-utils/initialKeysStateValue";

const initialState: KeyLetterState = {
  value: initialKeysStateValue,
};

export const keysSlice = createSlice({
  name    : "keys",
  initialState,
  reducers: {
    setKeyColor: (state, action) => {
      const { index, newColor }: NewKeyColor = action.payload;
      state.value[index].color = newColor;
    },
    getKeyColor: state => {
      return state;
    },
  },
});

export const { setKeyColor } = keysSlice.actions;

export default keysSlice.reducer;
