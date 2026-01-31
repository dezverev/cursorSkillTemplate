import React from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, lines }) => {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="label">Score</span>
        <span className="value">{score.toLocaleString()}</span>
      </div>
      <div className="score-item">
        <span className="label">Level</span>
        <span className="value">{level}</span>
      </div>
      <div className="score-item">
        <span className="label">Lines</span>
        <span className="value">{lines}</span>
      </div>
    </div>
  );
};
