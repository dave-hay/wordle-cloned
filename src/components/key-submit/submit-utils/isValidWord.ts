import { TileState } from "../../../types/wordle";
import dictionary    from "../../../words/dictionary.json";

const isValidWord = (guessArray: TileState[]): boolean => {
  let guessString = "";
  for (let guess of guessArray) {
    guessString += guess.val;
  }
  return dictionary.includes(guessString);
};

export default isValidWord;