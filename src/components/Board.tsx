import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { BoardState, Piece } from '../types';
import { BOARD_SIZE, canPlacePiece } from '../lib/gameLogic';

interface BoardProps {
  board: BoardState;
  activePieceId: string | null;
  activePiece?: Piece | null;
}

interface BoardCellProps {
  row: number;
  col: number;
  color: string | null;
  board: BoardState;
  activePiece?: Piece | null;
}

const BoardCell = memo(({ row, col, color, board, activePiece }: BoardCellProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: `${row}-${col}` });
  const canDrop = activePiece ? canPlacePiece(board, activePiece, row, col) : false;
  const overlayColor = isOver
    ? canDrop
      ? 'rgba(129, 199, 132, 0.45)'
      : 'rgba(244, 67, 54, 0.45)'
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      sx={{
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden',
        aspectRatio: '1 / 1',
        backgroundColor: color ?? 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'transform 120ms ease, background-color 120ms ease, box-shadow 120ms ease',
        boxShadow: isOver
          ? `0 0 0 3px ${canDrop ? 'rgba(76, 175, 80, 0.55)' : 'rgba(244, 67, 54, 0.55)'}`
          : undefined,
      }}
    >
      {overlayColor ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
      ) : null}
    </Box>
  );
});

BoardCell.displayName = 'BoardCell';

const Board = ({ board, activePieceId, activePiece }: BoardProps) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="subtitle2" color="text.secondary">
        Drop pieces onto the 10×10 grid to clear rows and columns.
      </Typography>
      <Paper
        elevation={18}
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(33,33,33,0.95), rgba(66,66,66,0.6))',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            gap: 0.5,
            width: 'min(100%, 480px)',
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <BoardCell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                color={cell}
                board={board}
                activePiece={activePieceId ? activePiece ?? null : null}
              />
            ))
          )}
        </Box>
      </Paper>
    </Stack>
  );
};

export default Board;
