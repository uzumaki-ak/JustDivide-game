import React from 'react';
import { getTileColor, getTileDarkColor } from '../utils/gameLogic';
import './Tile.css';

export default function Tile({ value, draggable, onDragStart, size = 'normal', animateIn = false }) {
  if (value === null || value === undefined) return null;

  const bgColor = getTileColor(value);
  const borderColor = getTileDarkColor(value);

  const handleDragStart = (e) => {
    if (!draggable) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', String(value));
    e.dataTransfer.effectAllowed = 'move';
    if (onDragStart) onDragStart(e);
  };

  const handleTouchStart = (e) => {
    if (!draggable) return;
    if (onDragStart) onDragStart(e);
  };

  return (
    <div
      className={`tile tile-${size} ${draggable ? 'tile-draggable' : ''} ${animateIn ? 'tile-animate-in' : ''}`}
      style={{
        backgroundColor: bgColor,
        borderBottomColor: borderColor,
        cursor: draggable ? 'grab' : 'default',
      }}
      draggable={draggable}
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
    >
      <span className="tile-value">{value}</span>
    </div>
  );
}
