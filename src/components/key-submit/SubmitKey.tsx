import { useDispatch, useSelector }         from "react-redux";
import { setTileAnimation, setTileStatus }  from "../../store/reducers/tiles";
import { yIncremented }                     from "../../store/reducers/yAxis";
import { xReset }                           from "../../store/reducers/xAxis";
import { pauseGame, resumeGame }            from "../../store/reducers/isPaused";
import handleSubmitKey, { HandleSubmitKey } from "./handleSubmitKey";
import { setKeyColor }                      from "../../store/reducers/keys";

const SubmitKey = () => {
  const dispatch = useDispatch();
  const yAxisCounter: number = useSelector((state: any) => state.yAxisCounter.value);
  const tilesArray: any = useSelector((state: any) => state.tiles.value);
  const isPaused: boolean = useSelector((state: any) => state.isPaused.value);
  const keyColors: any = useSelector((state: any) => state.keys.value);

  let handleSubmitKeyObject: HandleSubmitKey = {
    e               : undefined,
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

  return (
    <>
      <button
        value={'enter'}
        className={'key large'}
        onClick={(e) => {
          handleSubmitKeyObject.e = e;
          handleSubmitKey(handleSubmitKeyObject).then();
        }}
      >{'enter'}
      </button>
    </>
  );
};

export default SubmitKey;
