import React                                             from "react";
import GuessTile                                         from "./components/guess-tile/GuessTile";
import Keyboard                                          from "./components/keyboard/Keyboard";
import { useDispatch, useSelector }                      from "react-redux";
import { setTileAnimation, setTileStatus, setTileValue } from "./store/reducers/tiles";
import { xDecremented, xReset }                          from "./store/reducers/xAxis";
import handleSubmitKey, { HandleSubmitKey }              from "./components/key-submit/handleSubmitKey";
import { yIncremented }                                  from "./store/reducers/yAxis";
import { pauseGame, resumeGame }                         from "./store/reducers/isPaused";
import handleDeleteKeyDown, { HandleDeleteKeyDown }      from "./components/key-delete/handleDeleteKeyDown";
import handleKey, { HandleKey }                          from "./components/key-char/handleKey";
import { setKeyColor }                                   from "./store/reducers/keys";
import Alert                                             from "./components/alert/Alert";
import "./app.css";
import Header                                            from "./components/Header";

function App() {

  // set state/constants
  const dispatch = useDispatch();
  const xAxisCounter: number = useSelector((state: any) => state.xAxisCounter.value);
  const yAxisCounter: number = useSelector((state: any) => state.yAxisCounter.value);
  const isPaused: boolean = useSelector((state: any) => state.isPaused.value);
  const tilesArray: any = useSelector((state: any) => state.tiles.value);
  const keyColors: any = useSelector((state: any) => state.keys.value);


  // i -> className + tilesArray index @GuessTile.tsx
  const buildTiles = () => {
    let tileArr = [];
    for (let i = 0; i < 30; i++) {
      tileArr.push(<GuessTile index={i} />);
    }
    return tileArr;
  };

  const directKeyDown = (e: any) => {
    let handleKeyObject: HandleKey = {
      e               : undefined,
      dispatch        : dispatch,
      xAxisCounter    : xAxisCounter,
      yAxisCounter    : yAxisCounter,
      isPaused        : isPaused,
      setTileAnimation: setTileAnimation,
      setTileStatus   : setTileStatus,
      setTileValue    : setTileValue,
    };
    let handleSubmitKeyObject: HandleSubmitKey = {
      e               : "",
      dispatch        : dispatch,
      yAxisCounter    : yAxisCounter,
      tilesArray      : tilesArray,
      isPaused        : isPaused,
      setTileAnimation: setTileAnimation,
      setTileStatus   : setTileStatus,
      yIncremented    : yIncremented,
      xReset          : xReset,
      pauseGame       : pauseGame,
      resumeGame      : resumeGame,
      keyColors       : keyColors,
      setKeyColor     : setKeyColor,
    };
    let handleDeleteKeyDownObject: HandleDeleteKeyDown = {
      e               : "",
      dispatch        : dispatch,
      xAxisCounter    : xAxisCounter,
      yAxisCounter    : yAxisCounter,
      isPaused        : isPaused,
      setTileAnimation: setTileAnimation,
      setTileStatus   : setTileStatus,
      setTileValue    : setTileValue,
      xDecremented    : xDecremented,
    };

    let keyValue = e.key.toLowerCase();
    switch (keyValue) {
      case "enter":
        console.log("enter has entered");
        handleSubmitKeyObject.e = e;
        handleSubmitKey(handleSubmitKeyObject).then();
        break;
      case "backspace":
        console.log(`backspace bruv => ${e.key}`);
        handleDeleteKeyDownObject.e = e;
        handleDeleteKeyDown(handleDeleteKeyDownObject);
        break;
      default:
        handleKeyObject.e = e;
        handleKey(handleKeyObject);
    }
  };

  return (
    <div className={"game-app"}>
      <Header />
      <div
        className={"game"}
        tabIndex={0}
        style={{ outline: "none" }}
        onKeyDown={directKeyDown}
      >
        <div className={"board-container"}>
          <div className={"guess-grid"}>
            {buildTiles()}
          </div>
        </div>
        <Keyboard />
        <Alert />
        <span className={'footer'}>
          created by <a href={'https://davidhay.me/'}>david hay</a>
        </span>
      </div>
    </div>
  );
}

export default App;
