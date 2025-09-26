import { useCallback, useEffect, useMemo, useState } from 'react';
import { BoardState, Piece } from '../types';
import {
  PALETTE,
  SHAPES,
  canPlacePiece,
  clearCompletedLines,
  createEmptyBoard,
  hasAvailableMoves,
  placePiece,
} from '../lib/gameLogic';

const generateId = (() => {
  let counter = 0;
  return () => {
    counter += 1;
    return `piece-${counter}-${Math.random().toString(36).slice(2, 8)}`;
  };
})();

const randomFrom = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

const countFilledCells = (piece: Piece): number =>
  piece.shape.reduce((acc, row) => acc + row.filter((cell) => cell === 1).length, 0);

const generatePiece = (): Piece => {
  const shape = randomFrom(SHAPES);
  return {
    id: generateId(),
    name: shape.name,
    shape: shape.shape.map((row) => [...row]),
    color: randomFrom(PALETTE),
  };
};

const generatePieceSet = (): Piece[] => [generatePiece(), generatePiece(), generatePiece()];

export const useBlockBlastGame = () => {
  const [board, setBoard] = useState<BoardState>(() => createEmptyBoard());
  const [availablePieces, setAvailablePieces] = useState<Piece[]>(() => generatePieceSet());
  const [activePieceId, setActivePieceId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const stored = window.localStorage.getItem('bbneo:best-score');
    return stored ? Number(stored) : 0;
  });
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('bbneo:best-score', String(bestScore));
  }, [bestScore]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setAvailablePieces(generatePieceSet());
    setActivePieceId(null);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
  }, []);

  const handleDragStart = useCallback((pieceId: string) => {
    setActivePieceId(pieceId);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActivePieceId(null);
  }, []);

  const handlePieceDrop = useCallback(
    (piece: Piece, row: number, col: number) => {
      if (!canPlacePiece(board, piece, row, col)) {
        return false;
      }

      let nextBoard = placePiece(board, piece, row, col);
      const { board: clearedBoard, cleared } = clearCompletedLines(nextBoard);
      nextBoard = clearedBoard;

      const cellsPlaced = countFilledCells(piece);
      const baseScore = cellsPlaced;
      const nextStreak = cleared > 0 ? streak + 1 : 0;
      const comboBonus = cleared > 0 ? cleared * 12 * Math.max(1, nextStreak) : 0;
      const gained = baseScore + comboBonus;
      const updatedScore = score + gained;

      const remainingPieces = availablePieces.filter((p) => p.id !== piece.id);
      const nextPieces = remainingPieces.length > 0 ? remainingPieces : generatePieceSet();

      setBoard(nextBoard);
      setScore(updatedScore);
      setAvailablePieces(nextPieces);
      setActivePieceId(null);
      setStreak(nextStreak);
      setBestScore((prev) => Math.max(prev, updatedScore));

      const gameOver = !hasAvailableMoves(nextBoard, nextPieces);
      setIsGameOver(gameOver);

      return true;
    },
    [availablePieces, board, score, streak]
  );

  const state = useMemo(
    () => ({
      board,
      availablePieces,
      activePieceId,
      score,
      bestScore,
      streak,
      isGameOver,
    }),
    [activePieceId, availablePieces, bestScore, board, isGameOver, score, streak]
  );

  return {
    ...state,
    setActivePieceId,
    handleDragStart,
    handleDragCancel,
    handlePieceDrop,
    resetGame,
  };
};
