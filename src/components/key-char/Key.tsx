import { useSelector }     from "react-redux";
import { KeyLetter }       from "../../types/keys";
import "../styles/keyboard.css";

interface IKey {
  val: string;
  handleTileChange: any;
}

/**
 * Single Key object - only for letters.
 * @param {string} val - letter assign to key
 * @param handleTileChange - from @App.tsx
 */
const Key = ({ val, handleTileChange }: IKey) => {
  const num = val.charCodeAt(0);
  const hashCode = num % 26;

  const keyLetterArr: KeyLetter[] = useSelector((state: any) => state.keys.value);
  const { color }: KeyLetter = keyLetterArr[hashCode];

  return (
    <>
      <button
        value={`${val}`}
        onClick={handleTileChange}
        className={`key ${color}`}
      >{val}
      </button>
    </>
  );
};

export default Key;