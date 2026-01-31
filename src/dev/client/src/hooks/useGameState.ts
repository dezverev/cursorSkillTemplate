import { useState, useCallback, useMemo } from 'react';
import {
  type GameState,
  createEmptyBoard,
  createPiece,
  movePiece,
  rotatePiece,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropInterval,
  hardDrop as performHardDrop,
  checkGameOver,
  getGhostPosition,
  Position,
} from '../utils/gameLogic';
import { getRandomTetromino } from '../utils/tetrominos';
import { useInterval } from './useInterval';
import { useKeyboard } from './useKeyboard';

export interface UseGameStateReturn {
  gameState: GameState;
  ghostPosition: Position | null;
  startGame: () => void;
  togglePause: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  hardDrop: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: getRandomTetromino(),
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false,
  }));

  // Spawn next piece
  const spawnPiece = useCallback((state: GameState): GameState => {
    const newPiece = createPiece(state.nextPiece);
    const nextType = getRandomTetromino();

    if (checkGameOver(state.board, newPiece)) {
      return { ...state, isGameOver: true };
    }

    return {
      ...state,
      currentPiece: newPiece,
      nextPiece: nextType,
    };
  }, []);

  // Lock piece and clear lines
  const lockPiece = useCallback((state: GameState): GameState => {
    if (!state.currentPiece) return state;

    const boardWithPiece = placePiece(state.board, state.currentPiece);
    const { board: clearedBoard, linesCleared } = clearLines(boardWithPiece);

    const newLines = state.lines + linesCleared;
    const newLevel = calculateLevel(newLines);
    const scoreGain = calculateScore(linesCleared, state.level);

    const newState: GameState = {
      ...state,
      board: clearedBoard,
      currentPiece: null,
      score: state.score + scoreGain,
      level: newLevel,
      lines: newLines,
    };

    return spawnPiece(newState);
  }, [spawnPiece]);

  // Start new game
  const startGame = useCallback(() => {
    const initialState: GameState = {
      board: createEmptyBoard(),
      currentPiece: null,
      nextPiece: getRandomTetromino(),
      score: 0,
      level: 0,
      lines: 0,
      isGameOver: false,
      isPaused: false,
    };
    setGameState(spawnPiece(initialState));
  }, [spawnPiece]);

  // Toggle pause
  const togglePause = useCallback(() => {
    setGameState(state => {
      if (state.isGameOver || !state.currentPiece) return state;
      return { ...state, isPaused: !state.isPaused };
    });
  }, []);

  // Move piece
  const move = useCallback((dx: number, dy: number) => {
    setGameState(state => {
      if (state.isGameOver || state.isPaused || !state.currentPiece) return state;

      const movedPiece = movePiece(state.board, state.currentPiece, dx, dy);
      if (movedPiece) {
        return { ...state, currentPiece: movedPiece };
      }

      // If moving down and can't move, lock the piece
      if (dy > 0) {
        return lockPiece(state);
      }

      return state;
    });
  }, [lockPiece]);

  const moveLeft = useCallback(() => move(-1, 0), [move]);
  const moveRight = useCallback(() => move(1, 0), [move]);
  const moveDown = useCallback(() => move(0, 1), [move]);

  // Rotate piece
  const rotate = useCallback(() => {
    setGameState(state => {
      if (state.isGameOver || state.isPaused || !state.currentPiece) return state;

      const rotatedPiece = rotatePiece(state.board, state.currentPiece);
      if (rotatedPiece) {
        return { ...state, currentPiece: rotatedPiece };
      }
      return state;
    });
  }, []);

  // Hard drop
  const hardDrop = useCallback(() => {
    setGameState(state => {
      if (state.isGameOver || state.isPaused || !state.currentPiece) return state;

      const { piece: droppedPiece, cellsDropped } = performHardDrop(state.board, state.currentPiece);
      const stateWithDroppedPiece: GameState = {
        ...state,
        currentPiece: droppedPiece,
        score: state.score + cellsDropped * 2, // Bonus points for hard drop
      };

      return lockPiece(stateWithDroppedPiece);
    });
  }, [lockPiece]);

  // Calculate ghost position
  const ghostPosition = useMemo(() => {
    if (!gameState.currentPiece || gameState.isGameOver || gameState.isPaused) {
      return null;
    }
    return getGhostPosition(gameState.board, gameState.currentPiece);
  }, [gameState.currentPiece, gameState.board, gameState.isGameOver, gameState.isPaused]);

  // Game tick (auto drop)
  const dropInterval = gameState.isGameOver || gameState.isPaused || !gameState.currentPiece
    ? null
    : getDropInterval(gameState.level);

  useInterval(moveDown, dropInterval);

  // Keyboard controls
  useKeyboard(
    {
      onLeft: moveLeft,
      onRight: moveRight,
      onDown: moveDown,
      onRotate: rotate,
      onHardDrop: hardDrop,
      onPause: togglePause,
    },
    !gameState.isGameOver
  );

  return {
    gameState,
    ghostPosition,
    startGame,
    togglePause,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
  };
}
