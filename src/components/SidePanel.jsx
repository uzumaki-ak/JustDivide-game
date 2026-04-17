import React from 'react';
import Tile from './Tile';
import './SidePanel.css';

export default function SidePanel({
  queue,
  keepVal,
  trashCount,
  onActiveDragStart,
  onKeepDrop,
  onKeepDragStart,
  onTrashDrop,
}) {
  const activeTile = queue[0];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="side-panel">
      {/* KEEP Slot */}
      <div className="side-section keep-section">
        <div
          className={`keep-slot ${keepVal !== null ? 'keep-filled' : ''}`}
          onDragOver={handleDragOver}
          onDrop={(e) => { e.preventDefault(); onKeepDrop(); }}
        >
          {keepVal !== null ? (
            <Tile
              value={keepVal}
              draggable={true}
              onDragStart={onKeepDragStart}
              size="normal"
            />
          ) : (
            <div className="slot-placeholder"></div>
          )}
        </div>
        <div className="side-label keep-label">KEEP</div>
      </div>

      {/* Queue */}
      <div className="side-section queue-section">
        <div className="queue-tiles">
          {queue.slice(0, 2).map((val, i) => (
            <div key={i} className={`queue-slot ${i === 0 && keepVal === null ? 'queue-active' : ''}`}>
              <Tile
                value={val}
                draggable={i === 0}
                onDragStart={i === 0 ? onActiveDragStart : undefined}
                size="queue"
              />
            </div>
          ))}
        </div>
      </div>

      {/* TRASH Slot */}
      <div className="side-section">
        <div className="side-label trash-label">TRASH</div>
        <div
          className="trash-slot"
          onDragOver={trashCount > 0 ? handleDragOver : undefined}
          onDrop={trashCount > 0 ? (e) => { e.preventDefault(); onTrashDrop(); } : undefined}
        >
          <div className="trash-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="10" width="20" height="18" rx="3" fill="#e84040" stroke="#c03030" strokeWidth="1.5"/>
              <rect x="4" y="7" width="24" height="4" rx="2" fill="#f06060" stroke="#c03030" strokeWidth="1"/>
              <rect x="12" y="4" width="8" height="4" rx="1" fill="#f06060" stroke="#c03030" strokeWidth="1"/>
              <line x1="11" y1="14" x2="11" y2="24" stroke="#c03030" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="14" x2="16" y2="24" stroke="#c03030" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="21" y1="14" x2="21" y2="24" stroke="#c03030" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="trash-count">x{trashCount}</div>
        </div>
      </div>
    </div>
  );
}
