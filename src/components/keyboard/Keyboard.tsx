import { keyboardRows }                                  from "../../utils/getTodaysWord";
import Key       from "../key-char/Key";
import DeleteKey                    from "../key-delete/DeleteKey";
import SubmitKey                    from "../key-submit/SubmitKey";
import { useDispatch, useSelector } from "react-redux";
import { setTileAnimation, setTileStatus, setTileValue } from "../../store/reducers/tiles";
import handleKey, { HandleKey }                          from "../key-char/handleKey";

const Keyboard = () => {
  const { rowOne, rowTwo, rowThree } = keyboardRows;

  // set state/constants
  const dispatch = useDispatch();
  const xAxisCounter: number = useSelector((state: any) => state.xAxisCounter.value);
  const yAxisCounter: number = useSelector((state: any) => state.yAxisCounter.value);
  const isPaused: boolean = useSelector((state: any) => state.isPaused.value);

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

  const makeButtons = (list: string[], handle: any) => {
    let tileArr = [];
    for (const letter of list) {
      tileArr.push(<Key val={letter} handleTileChange={handle} />);
    }
    return tileArr;
  };

  const handleTileChange = (e: any) => {
    handleKeyObject.e = e;
    handleKey(handleKeyObject);
  };

  return (
    <div className={"keyboard"}>
      {makeButtons(rowOne, handleTileChange)}
      <div className={"space"}></div>
      {makeButtons(rowTwo, handleTileChange)}
      <div className={"space"}></div>
      <SubmitKey />
      {makeButtons(rowThree, handleTileChange)}
      <DeleteKey />
    </div>
  );
};

export default Keyboard;
