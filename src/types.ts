export type BoardCell = string | null;

export type BoardState = BoardCell[][];

export interface Piece {
  id: string;
  name: string;
  shape: number[][];
  color: string;
}
