import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  createPiece,
  isValidPosition,
  movePiece,
  rotatePiece,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropInterval,
  hardDrop,
  checkGameOver,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from '../../dev/client/src/utils/gameLogic';
import { rotateShape, TETROMINOS } from '../../dev/client/src/utils/tetrominos';

describe('Board Creation', () => {
  it('creates an empty board with correct dimensions', () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(BOARD_HEIGHT);
    expect(board[0].length).toBe(BOARD_WIDTH);
    expect(board.every(row => row.every(cell => cell === null))).toBe(true);
  });
});

describe('Piece Creation', () => {
  it('creates a piece with correct properties', () => {
    const piece = createPiece('T');
    expect(piece.type).toBe('T');
    expect(piece.color).toBe(TETROMINOS.T.color);
    expect(piece.shape).toEqual(TETROMINOS.T.shape);
    expect(piece.position.y).toBe(0);
  });

  it('centers piece horizontally', () => {
    const piece = createPiece('I');
    expect(piece.position.x).toBeGreaterThanOrEqual(0);
    expect(piece.position.x).toBeLessThan(BOARD_WIDTH);
  });
});

describe('Collision Detection', () => {
  it('allows valid position on empty board', () => {
    const board = createEmptyBoard();
    const shape = TETROMINOS.T.shape;
    const position = { x: 3, y: 0 };
    expect(isValidPosition(board, shape, position)).toBe(true);
  });

  it('detects collision with left wall', () => {
    const board = createEmptyBoard();
    const shape = TETROMINOS.T.shape;
    const position = { x: -1, y: 0 };
    expect(isValidPosition(board, shape, position)).toBe(false);
  });

  it('detects collision with right wall', () => {
    const board = createEmptyBoard();
    const shape = TETROMINOS.T.shape;
    const position = { x: BOARD_WIDTH - 1, y: 0 };
    expect(isValidPosition(board, shape, position)).toBe(false);
  });

  it('detects collision with bottom', () => {
    const board = createEmptyBoard();
    const shape = TETROMINOS.T.shape;
    const position = { x: 3, y: BOARD_HEIGHT - 1 };
    expect(isValidPosition(board, shape, position)).toBe(false);
  });

  it('detects collision with placed pieces', () => {
    const board = createEmptyBoard();
    board[5][5] = '#ff0000';
    const shape = [[1]];
    const position = { x: 5, y: 5 };
    expect(isValidPosition(board, shape, position)).toBe(false);
  });
});

describe('Piece Movement', () => {
  it('moves piece left', () => {
    const board = createEmptyBoard();
    const piece = createPiece('T');
    const moved = movePiece(board, piece, -1, 0);
    expect(moved).not.toBeNull();
    expect(moved!.position.x).toBe(piece.position.x - 1);
  });

  it('moves piece right', () => {
    const board = createEmptyBoard();
    const piece = createPiece('T');
    const moved = movePiece(board, piece, 1, 0);
    expect(moved).not.toBeNull();
    expect(moved!.position.x).toBe(piece.position.x + 1);
  });

  it('moves piece down', () => {
    const board = createEmptyBoard();
    const piece = createPiece('T');
    const moved = movePiece(board, piece, 0, 1);
    expect(moved).not.toBeNull();
    expect(moved!.position.y).toBe(piece.position.y + 1);
  });

  it('returns null when move is invalid', () => {
    const board = createEmptyBoard();
    const piece = createPiece('I');
    piece.position.x = 0;
    const moved = movePiece(board, piece, -2, 0);
    expect(moved).toBeNull();
  });
});

describe('Piece Rotation', () => {
  it('rotates shape 90 degrees clockwise', () => {
    const shape = [
      [1, 0],
      [1, 0],
      [1, 1],
    ];
    const rotated = rotateShape(shape);
    expect(rotated).toEqual([
      [1, 1, 1],
      [1, 0, 0],
    ]);
  });

  it('O piece does not change on rotation', () => {
    const board = createEmptyBoard();
    const piece = createPiece('O');
    const originalShape = piece.shape.map(row => [...row]);
    const rotated = rotatePiece(board, piece);
    expect(rotated).not.toBeNull();
    expect(rotated!.shape).toEqual(originalShape);
  });

  it('rotates T piece', () => {
    const board = createEmptyBoard();
    const piece = createPiece('T');
    piece.position = { x: 4, y: 4 };
    const rotated = rotatePiece(board, piece);
    expect(rotated).not.toBeNull();
    expect(rotated!.shape).not.toEqual(piece.shape);
  });

  it('applies wall kick when rotation against wall', () => {
    const board = createEmptyBoard();
    const piece = createPiece('T');
    piece.position = { x: 0, y: 5 };
    const rotated = rotatePiece(board, piece);
    // Should succeed with wall kick
    expect(rotated).not.toBeNull();
  });
});

describe('Place Piece', () => {
  it('places piece on board', () => {
    const board = createEmptyBoard();
    const piece = createPiece('O');
    piece.position = { x: 4, y: 18 };
    const newBoard = placePiece(board, piece);
    
    // O piece should be 2x2
    expect(newBoard[18][4]).toBe(TETROMINOS.O.color);
    expect(newBoard[18][5]).toBe(TETROMINOS.O.color);
    expect(newBoard[19][4]).toBe(TETROMINOS.O.color);
    expect(newBoard[19][5]).toBe(TETROMINOS.O.color);
  });
});

describe('Line Clearing', () => {
  it('clears complete line', () => {
    const board = createEmptyBoard();
    // Fill bottom row
    for (let col = 0; col < BOARD_WIDTH; col++) {
      board[BOARD_HEIGHT - 1][col] = '#ff0000';
    }
    
    const { board: clearedBoard, linesCleared } = clearLines(board);
    expect(linesCleared).toBe(1);
    expect(clearedBoard[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
  });

  it('clears multiple lines', () => {
    const board = createEmptyBoard();
    // Fill bottom two rows
    for (let row = BOARD_HEIGHT - 2; row < BOARD_HEIGHT; row++) {
      for (let col = 0; col < BOARD_WIDTH; col++) {
        board[row][col] = '#ff0000';
      }
    }
    
    const { board: clearedBoard, linesCleared } = clearLines(board);
    expect(linesCleared).toBe(2);
  });

  it('does not clear incomplete line', () => {
    const board = createEmptyBoard();
    // Fill bottom row except one cell
    for (let col = 0; col < BOARD_WIDTH - 1; col++) {
      board[BOARD_HEIGHT - 1][col] = '#ff0000';
    }
    
    const { board: clearedBoard, linesCleared } = clearLines(board);
    expect(linesCleared).toBe(0);
    expect(clearedBoard[BOARD_HEIGHT - 1][0]).toBe('#ff0000');
  });

  it('shifts rows down after clearing', () => {
    const board = createEmptyBoard();
    // Put a piece on row 17
    board[17][0] = '#00ff00';
    // Fill row 19 (bottom)
    for (let col = 0; col < BOARD_WIDTH; col++) {
      board[19][col] = '#ff0000';
    }
    
    const { board: clearedBoard, linesCleared } = clearLines(board);
    expect(linesCleared).toBe(1);
    // The piece from row 17 should now be at row 18
    expect(clearedBoard[18][0]).toBe('#00ff00');
  });
});

describe('Scoring', () => {
  it('calculates score for 1 line', () => {
    expect(calculateScore(1, 0)).toBe(100);
    expect(calculateScore(1, 1)).toBe(200);
  });

  it('calculates score for 2 lines', () => {
    expect(calculateScore(2, 0)).toBe(300);
  });

  it('calculates score for 3 lines', () => {
    expect(calculateScore(3, 0)).toBe(500);
  });

  it('calculates score for 4 lines (Tetris)', () => {
    expect(calculateScore(4, 0)).toBe(800);
    expect(calculateScore(4, 1)).toBe(1600);
  });

  it('returns 0 for 0 lines', () => {
    expect(calculateScore(0, 0)).toBe(0);
  });
});

describe('Level Calculation', () => {
  it('starts at level 0', () => {
    expect(calculateLevel(0)).toBe(0);
    expect(calculateLevel(9)).toBe(0);
  });

  it('increases level every 10 lines', () => {
    expect(calculateLevel(10)).toBe(1);
    expect(calculateLevel(20)).toBe(2);
    expect(calculateLevel(25)).toBe(2);
  });
});

describe('Drop Interval', () => {
  it('starts at 1000ms', () => {
    expect(getDropInterval(0)).toBe(1000);
  });

  it('decreases with level', () => {
    expect(getDropInterval(1)).toBe(925);
    expect(getDropInterval(5)).toBe(625);
  });

  it('has minimum of 100ms', () => {
    expect(getDropInterval(100)).toBe(100);
  });
});

describe('Hard Drop', () => {
  it('drops piece to bottom of empty board', () => {
    const board = createEmptyBoard();
    const piece = createPiece('O');
    piece.position = { x: 4, y: 0 };
    
    const { piece: dropped, cellsDropped } = hardDrop(board, piece);
    expect(dropped.position.y).toBe(BOARD_HEIGHT - 2); // O piece is 2 tall
    expect(cellsDropped).toBe(BOARD_HEIGHT - 2);
  });

  it('drops piece on top of existing pieces', () => {
    const board = createEmptyBoard();
    // Place a piece at the bottom
    board[19][4] = '#ff0000';
    board[19][5] = '#ff0000';
    
    const piece = createPiece('O');
    piece.position = { x: 4, y: 0 };
    
    const { piece: dropped } = hardDrop(board, piece);
    expect(dropped.position.y).toBe(17); // Should land on row 17-18
  });
});

describe('Game Over Detection', () => {
  it('returns false when spawn position is clear', () => {
    const board = createEmptyBoard();
    const piece = createPiece('T');
    expect(checkGameOver(board, piece)).toBe(false);
  });

  it('returns true when spawn position is blocked', () => {
    const board = createEmptyBoard();
    // Block the spawn area
    for (let col = 0; col < BOARD_WIDTH; col++) {
      board[0][col] = '#ff0000';
      board[1][col] = '#ff0000';
    }
    const piece = createPiece('T');
    expect(checkGameOver(board, piece)).toBe(true);
  });
});
