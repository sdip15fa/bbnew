import { BoardState, Piece } from '../types';

export const BOARD_SIZE = 10;

export const createEmptyBoard = (): BoardState =>
  Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null));

export const cloneBoard = (board: BoardState): BoardState => board.map((row) => [...row]);

export const canPlacePiece = (board: BoardState, piece: Piece, row: number, col: number): boolean => {
  for (let r = 0; r < piece.shape.length; r += 1) {
    for (let c = 0; c < piece.shape[r].length; c += 1) {
      if (piece.shape[r][c] !== 1) continue;
      const boardRow = row + r;
      const boardCol = col + c;
      if (boardRow < 0 || boardRow >= BOARD_SIZE || boardCol < 0 || boardCol >= BOARD_SIZE) {
        return false;
      }
      if (board[boardRow][boardCol]) {
        return false;
      }
    }
  }
  return true;
};

export const placePiece = (board: BoardState, piece: Piece, row: number, col: number): BoardState => {
  const next = cloneBoard(board);
  for (let r = 0; r < piece.shape.length; r += 1) {
    for (let c = 0; c < piece.shape[r].length; c += 1) {
      if (piece.shape[r][c] === 1) {
        next[row + r][col + c] = piece.color;
      }
    }
  }
  return next;
};

export const clearCompletedLines = (board: BoardState): { board: BoardState; cleared: number } => {
  let clearedRows = 0;
  let clearedCols = 0;
  let next = cloneBoard(board);

  // Clear rows
  next = next.map((row) => {
    if (row.every((cell) => cell !== null)) {
      clearedRows += 1;
      return Array.from({ length: BOARD_SIZE }, () => null);
    }
    return row;
  });

  // Clear columns
  for (let col = 0; col < BOARD_SIZE; col += 1) {
    let columnFilled = true;
    for (let row = 0; row < BOARD_SIZE; row += 1) {
      if (!next[row][col]) {
        columnFilled = false;
        break;
      }
    }
    if (columnFilled) {
      clearedCols += 1;
      for (let row = 0; row < BOARD_SIZE; row += 1) {
        next[row][col] = null;
      }
    }
  }

  return { board: next, cleared: clearedRows + clearedCols };
};

export const hasAvailableMoves = (board: BoardState, pieces: Piece[]): boolean => {
  return pieces.some((piece) => {
    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        if (canPlacePiece(board, piece, row, col)) {
          return true;
        }
      }
    }
    return false;
  });
};

export const SHAPES: Omit<Piece, 'id' | 'color'>[] = [
  {
    name: 'Solo',
    shape: [[1]],
  },
  {
    name: 'Duo',
    shape: [[1, 1]],
  },
  {
    name: 'Triple',
    shape: [[1, 1, 1]],
  },
  {
    name: 'Quad',
    shape: [[1, 1, 1, 1]],
  },
  {
    name: 'Pillar',
    shape: [[1], [1], [1]],
  },
  {
    name: 'Square',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    name: 'L-Shape',
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  {
    name: 'Reverse L',
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },
  {
    name: 'Zig',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    name: 'Long',
    shape: [[1], [1], [1], [1]],
  },
  {
    name: 'Plus',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
  {
    name: 'Tee',
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
];

export const PALETTE = [
  '#ff8a65',
  '#ba68c8',
  '#4db6ac',
  '#9575cd',
  '#f06292',
  '#7986cb',
  '#4fc3f7',
  '#64b5f6',
  '#81c784',
  '#ffb74d',
];
