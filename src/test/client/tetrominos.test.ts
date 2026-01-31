import { describe, it, expect } from 'vitest';
import {
  TETROMINOS,
  TETROMINO_TYPES,
  getRandomTetromino,
  rotateShape,
  TetrominoType,
} from '../../dev/client/src/utils/tetrominos';

describe('Tetromino Definitions', () => {
  it('has all 7 tetromino types defined', () => {
    expect(TETROMINO_TYPES).toHaveLength(7);
    expect(TETROMINO_TYPES).toContain('I');
    expect(TETROMINO_TYPES).toContain('O');
    expect(TETROMINO_TYPES).toContain('T');
    expect(TETROMINO_TYPES).toContain('S');
    expect(TETROMINO_TYPES).toContain('Z');
    expect(TETROMINO_TYPES).toContain('J');
    expect(TETROMINO_TYPES).toContain('L');
  });

  it('each tetromino has shape and color', () => {
    for (const type of TETROMINO_TYPES) {
      const tetromino = TETROMINOS[type as TetrominoType];
      expect(tetromino.shape).toBeDefined();
      expect(tetromino.color).toBeDefined();
      expect(Array.isArray(tetromino.shape)).toBe(true);
      expect(typeof tetromino.color).toBe('string');
    }
  });

  it('I piece is 4 cells long', () => {
    const iPiece = TETROMINOS.I;
    const filledCells = iPiece.shape.flat().filter(cell => cell === 1);
    expect(filledCells).toHaveLength(4);
  });

  it('O piece is 2x2', () => {
    const oPiece = TETROMINOS.O;
    expect(oPiece.shape).toHaveLength(2);
    expect(oPiece.shape[0]).toHaveLength(2);
    expect(oPiece.shape.flat().every(cell => cell === 1)).toBe(true);
  });

  it('each tetromino has exactly 4 filled cells', () => {
    for (const type of TETROMINO_TYPES) {
      const tetromino = TETROMINOS[type as TetrominoType];
      const filledCells = tetromino.shape.flat().filter(cell => cell === 1);
      expect(filledCells).toHaveLength(4);
    }
  });
});

describe('Random Tetromino', () => {
  it('returns valid tetromino type', () => {
    for (let i = 0; i < 100; i++) {
      const type = getRandomTetromino();
      expect(TETROMINO_TYPES).toContain(type);
    }
  });
});

describe('Shape Rotation', () => {
  it('rotates 2x2 shape (stays same)', () => {
    const shape = [
      [1, 1],
      [1, 1],
    ];
    const rotated = rotateShape(shape);
    expect(rotated).toEqual(shape);
  });

  it('rotates L shape correctly', () => {
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

  it('four rotations return to original', () => {
    const original = TETROMINOS.T.shape;
    let rotated = original;
    for (let i = 0; i < 4; i++) {
      rotated = rotateShape(rotated);
    }
    expect(rotated).toEqual(original);
  });

  it('I piece rotates to vertical', () => {
    const iPiece = TETROMINOS.I.shape;
    const rotated = rotateShape(iPiece);
    // Check it's now vertical
    const hasVerticalColumn = rotated.every(row => row.some(cell => cell === 1));
    expect(hasVerticalColumn).toBe(true);
  });
});
