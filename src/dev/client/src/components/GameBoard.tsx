import React from 'react';
import { Board, GamePiece, Position, BOARD_WIDTH, BOARD_HEIGHT } from '../utils/gameLogic';

interface GameBoardProps {
  board: Board;
  currentPiece: GamePiece | null;
  ghostPosition: Position | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, currentPiece, ghostPosition }) => {
  // Create display board with current piece and ghost
  const displayBoard = board.map(row => [...row]);

  // Draw ghost piece
  if (currentPiece && ghostPosition) {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const boardY = ghostPosition.y + row;
          const boardX = ghostPosition.x + col;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            if (!displayBoard[boardY][boardX]) {
              displayBoard[boardY][boardX] = `ghost-${currentPiece.color}`;
            }
          }
        }
      }
    }
  }

  // Draw current piece
  if (currentPiece) {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const boardY = currentPiece.position.y + row;
          const boardX = currentPiece.position.x + col;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <div className="game-board">
      {displayBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const isGhost = cell?.startsWith('ghost-') ?? false;
            const color = isGhost && cell ? cell.replace('ghost-', '') : cell;
            return (
              <div
                key={colIndex}
                className={`cell ${cell ? (isGhost ? 'ghost' : 'filled') : 'empty'}`}
                style={color && !isGhost ? { backgroundColor: color } : color ? { borderColor: color } : {}}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
