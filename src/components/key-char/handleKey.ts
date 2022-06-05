import { TileAnimation, TileStatus, TileValue } from "../../types/wordle";
import { xIncremented }                         from "../../store/reducers/xAxis";

export interface HandleKey {
  e: any;
  dispatch: any;
  xAxisCounter: any;
  yAxisCounter: any;
  isPaused: any;
  setTileAnimation: any;
  setTileStatus: any;
  setTileValue: any;
}

/**
 * xAxisCounter => What row is current pointer on? 0-4
 * yAxisCounter => Which row is current pointer on? 0-5
 * yModifier => Keeps track of exact grid tiles 0, 5, 10, 15, 20
 * @callback shakesTiles => async function
 */
const handleKey = (props: HandleKey) => {
  const { e, dispatch, xAxisCounter, yAxisCounter, isPaused, setTileAnimation, setTileStatus, setTileValue }: HandleKey = props;
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
   * If some tries to add tile past limit shake tiles
   *  1. adds shake class
   *  2. then removes it so it can be repeated
   */
  if (yModifier + xAxisCounter === yModifier + 5) {
    for (let i = 0; i < 5; i++) {
      shakesTiles(i).then();
    }
    for (let i = 0; i < 5; i++) {
      let tileAnimation: TileAnimation = { index: yModifier + i, animation: "" };
      dispatch(setTileAnimation(tileAnimation));
    }
    console.log("Cannot add anymore letters!");
  }

  /**
   * Else delete the previous added letter
   *  1. Get current index
   *  2. Set current tile's value to key
   *  3. Set current tile to active
   *  4. increment
   */
  else {
    const eVal = e.type === "click" ? e.target.value : e.key;
    if (eVal.length === 1 && eVal.match(/[a-z]/i)) {
      const currentIndex = (yAxisCounter * 5) + xAxisCounter;
      const newTileValue: TileValue = { index: currentIndex, val: eVal };
      dispatch(setTileValue(newTileValue));
      const newTileStatus: TileStatus = { index: currentIndex, status: "active" };
      dispatch(setTileStatus(newTileStatus));
      dispatch(xIncremented());
    }
  }
};

export default handleKey;