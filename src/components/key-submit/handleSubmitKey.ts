import { getTodaysWord } from "../../utils/getTodaysWord";
import { TileAnimation, TileState, TileStatus } from "../../types/wordle";
import { NewKeyColor } from "../../types/keys";
import { alertOff, alertOn } from "../../store/reducers/alert";
import handleAlert, { HandleAlert } from "../alert/handleAlert";
import hasEmpties from "./submit-utils/hasEmpties";
import isValidWord from "./submit-utils/isValidWord";
import getCharKeyHash from "./submit-utils/getCharKeyHash";
import handleTileAnimation, {
  HandleTileAnimation,
} from "./submit-utils/handleTileAnimation";

export interface HandleSubmitKey {
  e: any;
  dispatch: any;
  yAxisCounter: any;
  tilesArray: any;
  isPaused: any;
  setTileAnimation: any;
  setTileStatus: any;
  yIncremented: any;
  xReset: any;
  pauseGame: any;
  resumeGame: any;
  keyColors: any;
  setKeyColor: any;
}

/**
 * function to submit word to be checked
 */
const handleSubmitKey = async (props: HandleSubmitKey) => {
  const {
    e,
    dispatch,
    yAxisCounter,
    tilesArray,
    isPaused,
    setTileAnimation,
    setTileStatus,
    yIncremented,
    xReset,
    pauseGame,
    resumeGame,
    setKeyColor,
  }: HandleSubmitKey = props;

  e.preventDefault();

  // when submit is clicked pause all typing
  // if game currently paused don't allow submit again
  dispatch(pauseGame());
  if (isPaused) {
    return;
  }
  const todaysWord: string[] = getTodaysWord();
  const yAxisIndex = yAxisCounter * 5;
  const guess: TileState[] = tilesArray.slice(yAxisIndex, yAxisIndex + 5);

  // shake + exit if empty tiles or invalid word
  if (hasEmpties(guess) || !isValidWord(guess)) {
    let alertInfo: HandleAlert = {
      text: "Invalid Word!",
      status: "alert",
      alertOn: alertOn,
      alertOff: alertOff,
      dispatch: dispatch,
    };
    handleAlert(alertInfo);

    for (let i = 0; i < 5; i++) {
      let shakyTile: HandleTileAnimation = {
        index: i,
        yAxisIndex: yAxisIndex,
        animation: "shake",
        speed: 10,
        dispatch: dispatch,
        setTileAnimation: setTileAnimation,
      };
      handleTileAnimation(shakyTile).then();
    }
    for (let i = 0; i < 5; i++) {
      let tileAnimation: TileAnimation = {
        index: yAxisIndex + i,
        animation: "",
      };
      dispatch(setTileAnimation(tileAnimation));
    }
    dispatch(resumeGame());
    return;
  }

  let numCorrect = 0;
  let guessState = new Array(5).fill("");
  let guessNumber = 0;

  /**
   * Handles the tile flip and color change
   *  1. flips tile up
   *  2. calls to flip down but has to wait
   *  3. when wait over flip down tile and change color
   */
  for (let i = 0; i < 5; i++) {
    let flippyTile: HandleTileAnimation = {
      index: i,
      yAxisIndex: yAxisIndex,
      animation: "flip",
      speed: 0,
      dispatch: dispatch,
      setTileAnimation: setTileAnimation,
    };
    const ignoreThis: any = await handleTileAnimation(flippyTile);
    let noAnimationTile: HandleTileAnimation = {
      index: i,
      yAxisIndex: yAxisIndex,
      animation: "",
      speed: 400,
      dispatch: dispatch,
      setTileAnimation: setTileAnimation,
    };
    const ignoreThisAlso: any = await handleTileAnimation(noAnimationTile);
    console.log(ignoreThis + ignoreThisAlso); // need to no tsError

    let guessVal = guess[i].val;
    let tileStatus: TileStatus = { index: yAxisIndex + i, status: "" };

    let keyStatus: NewKeyColor = getCharKeyHash(guessVal);

    /**
     * Checks if guess and answer have char at same index
     * if true and is not already in guess state then change to green
     */
    if (todaysWord[i] === guessVal) {
      guessNumber += 1;
      if (guessState.includes(guess[i])) {
        tileStatus.status = "wrong";
        dispatch(setTileStatus(tileStatus));
        keyStatus.newColor = "wrong";
        dispatch(setKeyColor(keyStatus));
        continue;
      } else {
        guessState[i] = guessVal;
        numCorrect += 1;
        tileStatus.status = "correct";
        dispatch(setTileStatus(tileStatus));
        keyStatus.newColor = "correct";
        dispatch(setKeyColor(keyStatus));
        continue;
      }
    }

    /**
     * Yellow tile
     * Enters if guess letter is a char in ans array
     * @returns wrong - if already has been guessed
     * @returns correct - otherwise
     * todo set key to yellow
     */
    if (todaysWord.includes(guessVal)) {
      guessNumber += 1;
      if (guessState.includes(guessVal)) {
        tileStatus.status = "wrong";
        dispatch(setTileStatus(tileStatus));
        keyStatus.newColor = "wrong";
        dispatch(setKeyColor(keyStatus));
        continue;
      } else {
        guessState[i] = guessVal;
        tileStatus.status = "wrong-location";
        dispatch(setTileStatus(tileStatus));
        keyStatus.newColor = "wrong-location";
        dispatch(setKeyColor(keyStatus));
        continue;
      }
    }

    /**
     * change tile and keyboard color
     */
    guessNumber += 1;
    tileStatus.status = "wrong";
    dispatch(setTileStatus(tileStatus));
    keyStatus.newColor = "wrong";
    dispatch(setKeyColor(keyStatus));
  }

  // get winning message

  const winText = (numGuesses: number) => {
    switch (numGuesses) {
      case 0:
        return "u smart";
      case 1:
        return "impressive";
      case 2:
        return "not bad";
      case 3:
        return "nice";
      case 4:
        return "gewd";
      case 5:
        return "phew";
      default:
        return "phew";
    }
  };

  /**
   * Play dance animation if all tiles are correct
   */
  if (numCorrect === 5) {
    const txt: string = winText(guessNumber);
    for (let i = 0; i < 5; i++) {
      let winnerTile: HandleTileAnimation = {
        index: i,
        yAxisIndex: yAxisIndex,
        animation: "dance",
        speed: 50,
        dispatch: dispatch,
        setTileAnimation: setTileAnimation,
      };
      const ignoreThis: any = await handleTileAnimation(winnerTile);
      console.log(ignoreThis);

      let alertInfo: HandleAlert = {
        text: txt,
        status: "alert",
        alertOn: alertOn,
        alertOff: alertOff,
        dispatch: dispatch,
      };
      handleAlert(alertInfo);
    }
    return;
  }
  // increment y and reset x
  dispatch(yIncremented());
  dispatch(xReset());
  dispatch(resumeGame());
};

export default handleSubmitKey;
