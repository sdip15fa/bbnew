import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { memo } from 'react';
import { Piece } from '../types';

interface PieceViewProps {
  piece: Piece;
  size?: number;
  elevation?: number;
  interactive?: boolean;
}

const PieceView = memo(({ piece, size = 48, elevation = 6, interactive = false }: PieceViewProps) => {
  const rows = piece.shape.length;
  const cols = piece.shape[0].length;
  const dimension = Math.max(rows, cols);
  const cellSize = size / dimension;
  const gridTemplate = `repeat(${dimension}, minmax(${cellSize}px, 1fr))`;

  return (
    <Stack
      component={Paper}
      elevation={interactive ? elevation : 0}
      sx={{
        display: 'grid',
        gridTemplateRows: gridTemplate,
        gridTemplateColumns: gridTemplate,
        gap: 0.5,
        background: 'transparent',
        p: 1,
        transition: 'transform 160ms ease',
        transform: interactive ? 'scale(1.02)' : undefined,
      }}
    >
      {Array.from({ length: dimension * dimension }, (_, index) => {
        const row = Math.floor(index / dimension);
        const col = index % dimension;
        const isFilled = piece.shape[row]?.[col] === 1;
        return (
          <Paper
            key={`${piece.id}-${row}-${col}`}
            elevation={isFilled ? elevation : 0}
            sx={{
              width: cellSize,
              height: cellSize,
              borderRadius: 1,
              transition: 'transform 120ms ease, opacity 120ms ease',
              background: isFilled ? piece.color : 'rgba(255,255,255,0.06)',
              opacity: isFilled ? 1 : 0.18,
            }}
          />
        );
      })}
    </Stack>
  );
});

PieceView.displayName = 'PieceView';

export default PieceView;
