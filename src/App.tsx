import { CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useMemo, useState } from 'react';
import Board from './components/Board';
import PieceTray from './components/PieceTray';
import ScorePanel from './components/ScorePanel';
import PieceView from './components/PieceView';
import { Piece } from './types';
import { useBlockBlastGame } from './hooks/useBlockBlastGame';
import { darkTheme } from './theme/darkTheme';

function App() {
  const theme = useMemo(() => darkTheme, []);
  const {
    board,
    availablePieces,
    activePieceId,
    score,
    bestScore,
    streak,
    isGameOver,
    handleDragStart,
    handleDragCancel,
    handlePieceDrop,
    resetGame,
  } = useBlockBlastGame();
  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);

  const activePiece = useMemo(() => {
    if (draggedPiece) return draggedPiece;
    if (!activePieceId) return null;
    return availablePieces.find((p) => p.id === activePieceId) ?? null;
  }, [activePieceId, availablePieces, draggedPiece]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndContext
        onDragStart={(event) => {
          const piece = availablePieces.find((p) => p.id === event.active.id);
          if (piece) {
            setDraggedPiece(piece);
            handleDragStart(piece.id);
          }
        }}
        onDragEnd={(event) => {
          if (!event.over) {
            handleDragCancel();
            setDraggedPiece(null);
            return;
          }

          const [row, col] = (event.over.id as string).split('-').map(Number);
          const piece = availablePieces.find((p) => p.id === event.active.id);
          if (piece && handlePieceDrop(piece, row, col)) {
            setDraggedPiece(null);
          } else {
            handleDragCancel();
            setDraggedPiece(null);
          }
        }}
        onDragCancel={() => {
          handleDragCancel();
          setDraggedPiece(null);
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
          <Stack spacing={4} alignItems="center">
            <Stack spacing={1} alignItems="center">
              <Typography variant="h3" component="h1" fontWeight={600} textAlign="center">
                Block Blast Neo
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" textAlign="center">
                Drag, drop, and clear lines in this sleek Material Design puzzle built for
                every screen.
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              spacing={{ xs: 3, lg: 6 }}
              alignItems={{ xs: 'stretch', lg: 'flex-start' }}
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              <ScorePanel
                score={score}
                bestScore={bestScore}
                streak={streak}
                isGameOver={isGameOver}
                onReset={resetGame}
              />
              <Board board={board} activePieceId={activePieceId} activePiece={activePiece} />
            </Stack>
            <Box sx={{ width: '100%', maxWidth: 720 }}>
              <PieceTray pieces={availablePieces} activePieceId={activePieceId} />
            </Box>
          </Stack>
          <DragOverlay dropAnimation={null}>
            {draggedPiece ? <PieceView piece={draggedPiece} size={64} elevation={12} /> : null}
          </DragOverlay>
        </Container>
      </DndContext>
    </ThemeProvider>
  );
}

export default App;
