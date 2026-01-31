import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  onStart: () => void;
  onPause: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  isPaused,
  isGameOver,
  onStart,
  onPause,
}) => {
  return (
    <div className="controls">
      {!isPlaying || isGameOver ? (
        <button className="btn btn-start" onClick={onStart}>
          {isGameOver ? 'Play Again' : 'Start Game'}
        </button>
      ) : (
        <button className="btn btn-pause" onClick={onPause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      )}
      <div className="instructions">
        <h4>Controls</h4>
        <ul>
          <li><kbd>←</kbd> <kbd>→</kbd> Move</li>
          <li><kbd>↑</kbd> Rotate</li>
          <li><kbd>↓</kbd> Soft Drop</li>
          <li><kbd>Space</kbd> Hard Drop</li>
          <li><kbd>P</kbd> Pause</li>
        </ul>
      </div>
    </div>
  );
};
