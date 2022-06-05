import { useSelector }     from "react-redux";
import { TileState }       from "../../types/wordle";
import "../styles/tile.css";

interface TileIndex {
  index: number;
}

/**
 * Single Tile in grid
 * @param {number} index - 0 through 29
 */
const GuessTile = ({ index }: TileIndex) => {
  const tilesArray: any = useSelector((state: any) => state.tiles.value);
  const { val, status, animation }: TileState = tilesArray[index];

  return (
    <div
      className={`${animation} tile ${status}`}
    >{val}
    </div>
  );
};

export default GuessTile;