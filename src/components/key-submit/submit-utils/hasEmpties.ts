import { TileState } from "../../../types/wordle";

const hasEmpties = (guessArray: TileState[]): boolean => {
  for (let i = 0; i < 5; i++) {
    if (guessArray[i].val === "") {
      return true;
    }
  }
  return false;
};

export default hasEmpties;