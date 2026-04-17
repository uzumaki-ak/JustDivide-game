import React from 'react';
import './GameOver.css';

export default function GameOver({ score, bestScore, onRestart }) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-modal">
        {/* Sad cat */}
        <div className="gameover-cat">
          <svg viewBox="0 0 120 100" width="120" height="100">
            <polygon points="18,38 35,5 50,38" fill="#f5a623" />
            <polygon points="70,38 85,5 102,38" fill="#f5a623" />
            <ellipse cx="60" cy="60" rx="48" ry="38" fill="#f5a623" />
            <ellipse cx="60" cy="66" rx="34" ry="26" fill="#fdd835" />
            {/* Sad eyes */}
            <ellipse cx="44" cy="55" rx="8" ry="9" fill="#fff" />
            <ellipse cx="76" cy="55" rx="8" ry="9" fill="#fff" />
            <ellipse cx="45" cy="57" rx="5" ry="6" fill="#2d2d2d" />
            <ellipse cx="75" cy="57" rx="5" ry="6" fill="#2d2d2d" />
            <circle cx="47" cy="54" r="2" fill="#fff" />
            <circle cx="77" cy="54" r="2" fill="#fff" />
            {/* Sad mouth */}
            <path d="M52,72 Q60,65 68,72" stroke="#d48a15" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="65" rx="4" ry="3" fill="#e8941a" />
            {/* Tears */}
            <ellipse cx="36" cy="64" rx="3" ry="5" fill="#90caf9" opacity="0.7" />
            <ellipse cx="84" cy="64" rx="3" ry="5" fill="#90caf9" opacity="0.7" />
          </svg>
        </div>

        <h2 className="gameover-title">Game Over!</h2>

        <div className="gameover-scores">
          <div className="score-item">
            <span className="score-label-go">Your Score</span>
            <span className="score-value-go">{score}</span>
          </div>
          <div className="score-divider"></div>
          <div className="score-item">
            <span className="score-label-go">Best Score</span>
            <span className="score-value-go best">{bestScore}</span>
          </div>
        </div>

        {score >= bestScore && score > 0 && (
          <div className="new-best">🎉 New Best Score! 🎉</div>
        )}

        <button className="restart-btn" onClick={onRestart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
            <path d="M4 12a8 8 0 0114-5.3V4m0 2.7H15M20 12a8 8 0 01-14 5.3V20m0-2.7H9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Play Again
        </button>
      </div>
    </div>
  );
}
