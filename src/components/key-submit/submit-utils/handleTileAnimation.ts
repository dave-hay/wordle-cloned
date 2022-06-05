import { TileAnimation } from "../../../types/wordle";

export interface HandleTileAnimation {
  index: number;
  yAxisIndex: number;
  animation: string;
  speed: number;
  dispatch: any;
  setTileAnimation: any;
}

/**
 * Changes a tile's animation CSS class
 * param index - index of tile
 * yAxisIndex - y-axis of current tile * 5
 * animation - CSS class
 * speed - in ms
 */
const handleTileAnimation = ({ index, yAxisIndex, animation, speed, dispatch, setTileAnimation }: HandleTileAnimation) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let tileAnimation: TileAnimation = { index: yAxisIndex + index, animation: animation };
      dispatch(setTileAnimation(tileAnimation));
      resolve("");
    }, speed);
  });
};

export default handleTileAnimation;