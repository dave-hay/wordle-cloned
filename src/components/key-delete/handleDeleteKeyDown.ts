import { TileAnimation, TileStatus, TileValue } from "../../types/wordle";

export interface HandleDeleteKeyDown {
  e: any;
  dispatch: any;
  xAxisCounter: any;
  yAxisCounter: any;
  isPaused: any;
  setTileAnimation: any;
  setTileStatus: any;
  setTileValue: any;
  xDecremented: any;
}

const handleDeleteKeyDown = (props: HandleDeleteKeyDown) => {
  const { e, dispatch, xAxisCounter, yAxisCounter, isPaused, setTileAnimation, setTileStatus, setTileValue, xDecremented }: HandleDeleteKeyDown = props;

  e.preventDefault();
  if (isPaused) {
    return;
  }

  let yModifier = yAxisCounter * 5;

  function shakesTiles(index: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        let tileAnimation: TileAnimation = {
          index    : yModifier + index,
          animation: "shake",
        };
        dispatch(setTileAnimation(tileAnimation));
        resolve("");
      }, 10);  // controls tile spin speed
    });
  }

  /**
   * If some tries to delete but on first letter shake tiles
   *  1. adds shake class
   *  2. then removes it so it can be repeated
   */
  if (yModifier + xAxisCounter === yModifier) {
    for (let i = 0; i < 5; i++) {
      shakesTiles(i).then();
    }
    for (let i = 0; i < 5; i++) {
      let tileAnimation: TileAnimation = { index: yModifier + i, animation: "" };
      dispatch(setTileAnimation(tileAnimation));
    }
    console.log("Cannot delete anymore letters!");
  }

  /**
   * Else delete the previous added letter
   *  1. Get current index
   *  2. Set previous tile's value to ''
   *  3. Set previous tile's status to ''
   *  4. decrement
   */
  else {
    const currentIndex = (yAxisCounter * 5) + xAxisCounter;
    const newTileValue: TileValue = { index: currentIndex - 1, val: "" };
    dispatch(setTileValue(newTileValue));
    const newTileStatus: TileStatus = { index: currentIndex - 1, status: "" };
    dispatch(setTileStatus(newTileStatus));
    dispatch(xDecremented());
  }
};

export default handleDeleteKeyDown;