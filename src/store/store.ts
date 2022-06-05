import { configureStore } from "@reduxjs/toolkit";

// Reducers
import tilesSlice    from "./reducers/tiles";
import xAxisSlice    from "./reducers/xAxis";
import yAxisSlice    from "./reducers/yAxis";
import isPausedSlice from "./reducers/isPaused";
import keysSlice     from "./reducers/keys";
import alertSlice    from "./reducers/alert";

export default configureStore({
  reducer:
    {
      tiles       : tilesSlice,
      xAxisCounter: xAxisSlice,
      yAxisCounter: yAxisSlice,
      isPaused    : isPausedSlice,
      keys        : keysSlice,
      alert       : alertSlice,
    },
});