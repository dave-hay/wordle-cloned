import { createSlice } from "@reduxjs/toolkit";
import {
  TileValue,
  TileState,
  TileStatus,
  TileAnimation, TileStateArray,
}                      from "../../types/wordle";

const defaultTileItem: TileState = {
  val: "",
  status: "",
  animation: "",
};

const initialState: TileStateArray = {
  value: new Array(30).fill(defaultTileItem),
};

export const tilesSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    // replace tile - press letter key
    setTileValue: (state, action) => {
      const { index, val }: TileValue = action.payload;
      state.value[index].val = val;
    },
    setTileStatus: (state, action) => {
      const { index, status }: TileStatus = action.payload;
      state.value[index].status = status;
    },
    setTileAnimation: (state, action) => {
      const { index, animation }: TileAnimation = action.payload;
      state.value[index].animation = animation;
    },
  },
});

export const { setTileValue, setTileStatus, setTileAnimation } = tilesSlice.actions;

export default tilesSlice.reducer;
