export interface TileValue {
  index: number;
  val: string;
}

export interface TileState {
  val: string;
  status: string;
  animation: string;
}

export interface TileStateArray {
  value: TileState[];
}

export interface TileStatus {
  index: number;
  status: string;
}

export interface TileAnimation {
  index: number;
  animation: string;
}