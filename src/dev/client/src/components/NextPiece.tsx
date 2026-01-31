import React from 'react';
import { TETROMINOS, TetrominoType } from '../utils/tetrominos';

interface NextPieceProps {
  type: TetrominoType;
}

export const NextPiece: React.FC<NextPieceProps> = ({ type }) => {
  const tetromino = TETROMINOS[type];

  return (
    <div className="next-piece-container">
      <h3>Next</h3>
      <div className="next-piece">
        {tetromino.shape.map((row, rowIndex) => (
          <div key={rowIndex} className="preview-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`preview-cell ${cell ? 'filled' : 'empty'}`}
                style={cell ? { backgroundColor: tetromino.color } : {}}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
