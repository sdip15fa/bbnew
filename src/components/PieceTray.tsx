import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Piece } from '../types';
import PieceView from './PieceView';

interface PieceTrayProps {
  pieces: Piece[];
  activePieceId: string | null;
}

interface DraggablePieceProps {
  piece: Piece;
  isActive: boolean;
}

const DraggablePiece = ({ piece, isActive }: DraggablePieceProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: piece.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: 'none' as const,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <Paper
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      elevation={isActive || isDragging ? 12 : 4}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 3,
        background: isActive
          ? 'linear-gradient(135deg, rgba(120, 144, 156,0.45), rgba(176, 190, 197,0.25))'
          : 'rgba(33, 33, 33, 0.65)',
        border: isActive ? '1px solid rgba(176, 190, 197, 0.55)' : '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 150ms ease, box-shadow 150ms ease, background 150ms ease',
        transform: style.transform,
        cursor: style.cursor,
        touchAction: style.touchAction,
      }}
    >
      <PieceView piece={piece} size={128} interactive />
    </Paper>
  );
};

const PieceTray = ({ pieces, activePieceId }: PieceTrayProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Drag one of the neon holographic tiles into the board. New pieces appear when you use
        all three.
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        {pieces.map((piece) => (
          <DraggablePiece key={piece.id} piece={piece} isActive={piece.id === activePieceId} />
        ))}
      </Stack>
    </Stack>
  );
};

export default PieceTray;
