import { NewKeyColor } from "../../../types/keys";

const getCharKeyHash = (letter: string): NewKeyColor => {
  const letterCode: number = letter.charCodeAt(0);
  const letterHash: number = letterCode % 26;
  return { index: letterHash, newColor: "" };
}

export default getCharKeyHash;