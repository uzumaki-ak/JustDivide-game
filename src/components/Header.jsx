import React from 'react';
import './Header.css';

export default function Header({
  timer,
  hintsEnabled,
  onToggleHints,
  onRestart,
  onUndo,
  isPaused,
  onTogglePause,
  onToggleHelp
}) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="header">
      {/* Play/Pause Button */}
      <button className="corner-btn pause-btn" onClick={onTogglePause} title={isPaused ? "Play" : "Pause"}>
        {isPaused ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        )}
      </button>

      {/* Help Button */}
      <button className="corner-btn help-btn" onClick={onToggleHelp} title="How to Play">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </button>

      <h1 className="game-title">JUST DIVIDE</h1>
      <div className="header-row">
        <div className="timer-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="13" r="9" stroke="#666" strokeWidth="2"/>
            <path d="M12 8v5l3 3" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 2h6" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="timer-text">{formatTime(timer)}</span>
        </div>
      </div>
      <p className="subtitle">DIVIDE WITH THE NUMBERS TO SOLVE THE ROWS AND COLUMNS.</p>
    </div>
  );
}
