import React from 'react';
import { useGameState } from './hooks/useGameState';
import { GameBoard } from './components/GameBoard';
import { NextPiece } from './components/NextPiece';
import { ScoreBoard } from './components/ScoreBoard';
import { Controls } from './components/Controls';

const App: React.FC = () => {
  const { gameState, ghostPosition, startGame, togglePause } = useGameState();

  const isPlaying = gameState.currentPiece !== null;

  return (
    <div className="app">
      <header className="header">
        <h1>Tetris</h1>
      </header>

      <main className="game-container">
        <div className="game-area">
          <GameBoard
            board={gameState.board}
            currentPiece={gameState.currentPiece}
            ghostPosition={ghostPosition}
          />

          {gameState.isPaused && (
            <div className="overlay">
              <div className="overlay-content">
                <h2>Paused</h2>
                <p>Press P or click Resume to continue</p>
              </div>
            </div>
          )}

          {gameState.isGameOver && (
            <div className="overlay">
              <div className="overlay-content game-over">
                <h2>Game Over</h2>
                <p>Final Score: {gameState.score.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        <aside className="sidebar">
          <ScoreBoard
            score={gameState.score}
            level={gameState.level}
            lines={gameState.lines}
          />

          <NextPiece type={gameState.nextPiece} />

          <Controls
            isPlaying={isPlaying}
            isPaused={gameState.isPaused}
            isGameOver={gameState.isGameOver}
            onStart={startGame}
            onPause={togglePause}
          />
        </aside>
      </main>
    </div>
  );
};

export default App;
