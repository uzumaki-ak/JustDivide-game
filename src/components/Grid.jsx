import React from 'react';
import Tile from './Tile';
import './Grid.css';

export default function Grid({ grid, hintCells, onDrop, mergeAnimation }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    e.currentTarget.classList.remove('cell-drag-over');
    if (onDrop) onDrop(index);
  };

  const handleDragEnter = (e) => {
    e.currentTarget.classList.add('cell-drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('cell-drag-over');
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {grid.map((cellValue, index) => {
          const isHint = hintCells.includes(index);
          const isMerging = mergeAnimation.includes(index);
          return (
            <div
              key={index}
              className={`grid-cell ${isHint ? 'cell-hint' : ''} ${isMerging ? 'cell-merge' : ''} ${cellValue === null ? 'cell-empty' : 'cell-filled'}`}
              onDragOver={cellValue === null ? handleDragOver : undefined}
              onDrop={cellValue === null ? (e) => handleDrop(e, index) : undefined}
              onDragEnter={cellValue === null ? handleDragEnter : undefined}
              onDragLeave={cellValue === null ? handleDragLeave : undefined}
              data-index={index}
            >
              {cellValue !== null && (
                <Tile value={cellValue} animateIn={isMerging} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
