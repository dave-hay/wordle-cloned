import targetWords from "../words/targetWords.json";

export const getTodaysWord = (): string[] => {
  const date = new Date();
  const key = date.getDay() * date.getMonth() * date.getFullYear();
  const hashKey = key % 2315;
  return Array.from(targetWords[hashKey]);
};

export const keyboardRows = {
  rowOne: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  rowTwo: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  rowThree: ["z", "x", "c", "v", "b", "n", "m"],
}