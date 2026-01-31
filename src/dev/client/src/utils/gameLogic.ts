import { TETROMINOS, TetrominoType, rotateShape } from './tetrominos';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type Cell = string | null; // null for empty, color string for filled
export type Board = Cell[][];

export interface Position {
  x: number;
  y: number;
}

export interface GamePiece {
  type: TetrominoType;
  shape: number[][];
  position: Position;
  color: string;
}

export interface GameState {
  board: Board;
  currentPiece: GamePiece | null;
  nextPiece: TetrominoType;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
}

// Create an empty board
export function createEmptyBoard(): Board {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(null));
}

// Create a new game piece at the top of the board
export function createPiece(type: TetrominoType): GamePiece {
  const tetromino = TETROMINOS[type];
  return {
    type,
    shape: tetromino.shape.map(row => [...row]),
    position: {
      x: Math.floor((BOARD_WIDTH - tetromino.shape[0].length) / 2),
      y: 0,
    },
    color: tetromino.color,
  };
}

// Check if a position is valid (within bounds and not colliding)
export function isValidPosition(
  board: Board,
  shape: number[][],
  position: Position
): boolean {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = position.x + col;
        const newY = position.y + row;

        // Check bounds
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision with placed pieces (ignore if above the board)
        if (newY >= 0 && board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }
  return true;
}

// Move piece in a direction
export function movePiece(
  board: Board,
  piece: GamePiece,
  dx: number,
  dy: number
): GamePiece | null {
  const newPosition = {
    x: piece.position.x + dx,
    y: piece.position.y + dy,
  };

  if (isValidPosition(board, piece.shape, newPosition)) {
    return { ...piece, position: newPosition };
  }
  return null;
}

// Rotate piece with wall kick
export function rotatePiece(board: Board, piece: GamePiece): GamePiece | null {
  // O piece doesn't rotate
  if (piece.type === 'O') {
    return piece;
  }

  const rotatedShape = rotateShape(piece.shape);

  // Try normal rotation
  if (isValidPosition(board, rotatedShape, piece.position)) {
    return { ...piece, shape: rotatedShape };
  }

  // Wall kick attempts: try moving left, right, up
  const kicks = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -2, y: 0 },
    { x: 2, y: 0 },
  ];

  for (const kick of kicks) {
    const kickedPosition = {
      x: piece.position.x + kick.x,
      y: piece.position.y + kick.y,
    };
    if (isValidPosition(board, rotatedShape, kickedPosition)) {
      return { ...piece, shape: rotatedShape, position: kickedPosition };
    }
  }

  return null;
}

// Place piece on board and return new board
export function placePiece(board: Board, piece: GamePiece): Board {
  const newBoard = board.map(row => [...row]);

  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        const boardY = piece.position.y + row;
        const boardX = piece.position.x + col;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }

  return newBoard;
}

// Clear completed lines and return new board and number of lines cleared
export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard: Board = [];
  let linesCleared = 0;

  // Check each row from bottom to top
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    const isComplete = board[row].every(cell => cell !== null);
    if (!isComplete) {
      newBoard.push([...board[row]]);
    } else {
      linesCleared++;
    }
  }

  // Add empty rows at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { board: newBoard, linesCleared };
}

// Calculate score based on lines cleared and level
export function calculateScore(linesCleared: number, level: number): number {
  const basePoints: Record<number, number> = {
    1: 100,
    2: 300,
    3: 500,
    4: 800, // Tetris!
  };
  return (basePoints[linesCleared] || 0) * (level + 1);
}

// Calculate level based on total lines cleared
export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

// Calculate drop interval based on level (in ms)
export function getDropInterval(level: number): number {
  // Starts at 1000ms, decreases by 75ms per level, minimum 100ms
  return Math.max(100, 1000 - level * 75);
}

// Hard drop - move piece all the way down
export function hardDrop(board: Board, piece: GamePiece): { piece: GamePiece; cellsDropped: number } {
  let cellsDropped = 0;
  let currentPiece = piece;

  while (true) {
    const movedPiece = movePiece(board, currentPiece, 0, 1);
    if (movedPiece) {
      currentPiece = movedPiece;
      cellsDropped++;
    } else {
      break;
    }
  }

  return { piece: currentPiece, cellsDropped };
}

// Get ghost piece position (preview of where piece will land)
export function getGhostPosition(board: Board, piece: GamePiece): Position {
  const { piece: ghostPiece } = hardDrop(board, piece);
  return ghostPiece.position;
}

// Check if game is over (piece spawns in collision)
export function checkGameOver(board: Board, piece: GamePiece): boolean {
  return !isValidPosition(board, piece.shape, piece.position);
}
