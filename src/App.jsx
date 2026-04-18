import React, { useState, useEffect, useCallback, useRef } from 'react';
import BubbleBackground from './components/BubbleBackground';
import Header from './components/Header';
import CatCharacter from './components/CatCharacter';
import Grid from './components/Grid';
import SidePanel from './components/SidePanel';
import GameOver from './components/GameOver';
import {
  createEmptyGrid,
  generateQueue,
  generateTileValue,
  resolveMerges,
  getHintCells,
  isGameOver,
  calculateLevel,
  getTrashUses,
  getDifficulty,
  getTileColor,
  getTileDarkColor,
} from './utils/gameLogic';
import './App.css';

// localStorage helpers
const getBestScore = () => {
  try {
    return parseInt(localStorage.getItem('justdivide_best') || '0', 10);
  } catch {
    return 0;
  }
};
const saveBestScore = (s) => {
  try {
    localStorage.setItem('justdivide_best', String(s));
  } catch {}
};

function App() {
  // --- Game State ---
  // Initial grid matching screenshot precisely
  const initialGrid = Array(16).fill(null);
  initialGrid[4] = 8;
  initialGrid[5] = 6;
  initialGrid[9] = 35;
  initialGrid[11] = 32;
  initialGrid[15] = 12;

  const [grid, setGrid] = useState(initialGrid);
  const [queue, setQueue] = useState([32, 12]); // Exactly 2 numbers
  const [keepVal, setKeepVal] = useState(null);
  const [score, setScore] = useState(40);
  const [bestScore, setBestScore] = useState(getBestScore());
  const [level, setLevel] = useState(5);
  const [trashCount, setTrashCount] = useState(10);
  const [hintsEnabled, setHintsEnabled] = useState(false);
  const [timer, setTimer] = useState(7);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [mergeAnimation, setMergeAnimation] = useState([]);
  const [dragSource, setDragSource] = useState('queue'); // 'queue' or 'keep'
  const [scorePopup, setScorePopup] = useState(null);

  const timerRef = useRef(null);

  // --- Timer ---
  useEffect(() => {
    if (!gameOver && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameOver, isPaused]);

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver || isPaused) return;
      switch (e.key.toLowerCase()) {
        case 'z':
          handleUndo();
          break;
        case 'r':
          handleRestart();
          break;
        case 'g':
          setHintsEnabled((h) => !h);
          break;
        case '1':
        case '2':
        case '3':
          // Difficulty toggle (restart with new difficulty)
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver, isPaused, undoStack]);

  // --- Level up detection ---
  useEffect(() => {
    const newLevel = calculateLevel(score);
    if (newLevel > level) {
      setLevel(newLevel);
      setTrashCount((tc) => tc + getTrashUses(newLevel) - getTrashUses(newLevel - 1));
    }
  }, [score, level]);

  // --- Best score update ---
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [score, bestScore]);

  // --- Game over check ---
  useEffect(() => {
    if (isGameOver(grid, queue, keepVal)) {
      setGameOver(true);
      clearInterval(timerRef.current);
    }
  }, [grid, queue, keepVal]);

  // --- Save state for undo ---
  const saveUndo = useCallback(() => {
    setUndoStack((stack) => {
      const snapshot = { grid: [...grid], queue: [...queue], keepVal, score, level, trashCount };
      const newStack = [snapshot, ...stack].slice(0, 10);
      return newStack;
    });
  }, [grid, queue, keepVal, score, level, trashCount]);

  // --- Core: advance queue ---
  const advanceQueue = useCallback(
    (currentQueue) => {
      const diff = getDifficulty(level);
      const newQueue = [...currentQueue.slice(1), generateTileValue(diff)];
      return newQueue;
    },
    [level]
  );

  // --- Place tile on grid ---
  const handleGridDrop = useCallback(
    (cellIndex) => {
      if (gameOver || isPaused) return;
      if (grid[cellIndex] !== null) return;

      let tileValue;
      let newQueue = [...queue];
      let newKeepVal = keepVal;

      if (dragSource === 'keep' && keepVal !== null) {
        tileValue = keepVal;
        newKeepVal = null;
      } else {
        tileValue = queue[0];
        newQueue = advanceQueue(queue);
      }

      if (tileValue === null || tileValue === undefined) return;

      // Save undo
      saveUndo();

      // Place tile
      const newGrid = [...grid];
      newGrid[cellIndex] = tileValue;

      // Resolve merges
      const { grid: resolvedGrid, points } = resolveMerges(newGrid, cellIndex);

      // Animate merged cells
      const changedCells = [];
      for (let i = 0; i < 16; i++) {
        if (resolvedGrid[i] !== newGrid[i]) changedCells.push(i);
      }
      if (changedCells.length > 0) {
        setMergeAnimation(changedCells);
        setTimeout(() => setMergeAnimation([]), 400);
      }

      // Score popup
      if (points > 0) {
        setScorePopup({ points, key: Date.now() });
        setTimeout(() => setScorePopup(null), 1200);
      }

      setGrid(resolvedGrid);
      setQueue(newQueue);
      setKeepVal(newKeepVal);
      setScore((s) => s + points);
      setDragSource('queue');
    },
    [grid, queue, keepVal, dragSource, gameOver, level, saveUndo, advanceQueue]
  );

  // --- KEEP drop ---
  const handleKeepDrop = useCallback(() => {
    if (gameOver || isPaused) return;
    saveUndo();

    if (dragSource === 'keep') return; // already in keep

    const activeTile = queue[0];
    if (activeTile === null || activeTile === undefined) return;

    if (keepVal !== null) {
      // Swap: put keep tile back as active, store active in keep
      const newQueue = [keepVal, ...queue.slice(1)];
      setQueue(newQueue);
      setKeepVal(activeTile);
    } else {
      setKeepVal(activeTile);
      setQueue(advanceQueue(queue));
    }
    setDragSource('queue');
  }, [queue, keepVal, gameOver, isPaused, dragSource, saveUndo, advanceQueue]);

  // --- TRASH drop ---
  const handleTrashDrop = useCallback(() => {
    if (gameOver || isPaused) return;
    if (trashCount <= 0) return;
    saveUndo();

    if (dragSource === 'keep' && keepVal !== null) {
      setKeepVal(null);
    } else {
      setQueue(advanceQueue(queue));
    }
    setTrashCount((tc) => tc - 1);
    setDragSource('queue');
  }, [queue, keepVal, trashCount, gameOver, isPaused, dragSource, saveUndo, advanceQueue]);

  // --- Drag start handlers ---
  const handleActiveDragStart = useCallback(() => {
    if (isPaused) return;
    setDragSource('queue');
  }, [isPaused]);

  const handleKeepDragStart = useCallback(() => {
    if (isPaused) return;
    setDragSource('keep');
  }, [isPaused]);

  // --- Undo ---
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0 || isPaused) return;
    const prev = undoStack[0];
    setGrid(prev.grid);
    setQueue(prev.queue);
    setKeepVal(prev.keepVal);
    setScore(prev.score);
    setLevel(prev.level);
    setTrashCount(prev.trashCount);
    setUndoStack((stack) => stack.slice(1));
    setGameOver(false);
  }, [undoStack, isPaused]);

  // --- Restart ---
  const handleRestart = useCallback(() => {
    setGrid(createEmptyGrid());
    setQueue(generateQueue('easy'));
    setKeepVal(null);
    setScore(0);
    setLevel(1);
    setTrashCount(getTrashUses(1));
    setHintsEnabled(false);
    setTimer(0);
    setGameOver(false);
    setUndoStack([]);
    setMergeAnimation([]);
    setDragSource('queue');
    setIsPaused(false);
  }, []);

  // --- Hints ---
  const activeTile = dragSource === 'keep' && keepVal !== null ? keepVal : queue[0];
  const hintCells = hintsEnabled && activeTile ? getHintCells(grid, activeTile) : [];

  // --- Touch DnD support ---
  const [touchDragging, setTouchDragging] = useState(false);
  const [touchTile, setTouchTile] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const touchSourceRef = useRef('queue');

  const handleTouchStartTile = useCallback((e, source) => {
    if (isPaused) return;
    e.preventDefault();
    const touch = e.touches[0];
    const tileVal = source === 'keep' ? keepVal : queue[0];
    if (tileVal === null || tileVal === undefined) return;

    setTouchDragging(true);
    setTouchTile(tileVal);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
    touchSourceRef.current = source;
    setDragSource(source);
  }, [queue, keepVal, isPaused]);

  const handleTouchMove = useCallback((e) => {
    if (!touchDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  }, [touchDragging]);

  const handleTouchEnd = useCallback((e) => {
    if (!touchDragging) return;
    setTouchDragging(false);

    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;

    // Check if dropped on grid cell
    const gridCell = el.closest('.grid-cell');
    if (gridCell) {
      const index = parseInt(gridCell.dataset.index, 10);
      if (!isNaN(index)) {
        handleGridDrop(index);
        return;
      }
    }

    // Check if dropped on keep slot
    if (el.closest('.keep-slot')) {
      handleKeepDrop();
      return;
    }

    // Check if dropped on trash slot
    if (el.closest('.trash-slot')) {
      handleTrashDrop();
      return;
    }
  }, [touchDragging, handleGridDrop, handleKeepDrop, handleTrashDrop]);

  useEffect(() => {
    if (touchDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [touchDragging, handleTouchMove, handleTouchEnd]);

  return (
    <div className="app-root">
      <BubbleBackground />

      <div className="game-container">
        <Header
          timer={timer}
          hintsEnabled={hintsEnabled}
          onToggleHints={() => setHintsEnabled((h) => !h)}
          onRestart={handleRestart}
          onUndo={handleUndo}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((p) => !p)}
          onToggleHelp={() => setShowHelp(true)}
        />

        {/* Main gameplay area */}
        <div className="gameplay-area">
          <div className="grid-section">
            {/* ONE COMPOSED COMPONENT: Cat + Badges */}
            <div className="cat-badge-container">
              <div className="badge red-badge level-badge absolute-badge">
                LEVEL {level}
              </div>

              <div className="cat-wrapper-absolute">
                <CatCharacter />
              </div>

              <div className="badge red-badge score-badge absolute-badge">
                SCORE {score}
              </div>
            </div>

            <Grid
              grid={grid}
              hintCells={hintCells}
              onDrop={handleGridDrop}
              mergeAnimation={mergeAnimation}
            />
          </div>

          <SidePanel
            queue={queue}
            keepVal={keepVal}
            trashCount={trashCount}
            onActiveDragStart={handleActiveDragStart}
            onKeepDrop={handleKeepDrop}
            onKeepDragStart={handleKeepDragStart}
            onTrashDrop={handleTrashDrop}
          />
        </div>

        {/* Touch drag ghost */}
        {touchDragging && touchTile !== null && (
          <div
            className="touch-drag-ghost"
            style={{
              left: touchPos.x - 35,
              top: touchPos.y - 35,
            }}
          >
            <div
              className="tile tile-normal"
              style={{
                backgroundColor: getTileColor(touchTile),
                borderBottomColor: getTileDarkColor(touchTile),
              }}
            >
              <span className="tile-value">{touchTile}</span>
            </div>
          </div>
        )}
      </div>

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-help" onClick={() => setShowHelp(false)}>×</button>
            <h2>How to Play</h2>
            <div className="help-content">
              <p>Combine <strong>equal</strong> tiles to clear them from the board.</p>
              <p>Combine tiles where one <strong>divides</strong> the other. The smaller tile vanishes, and the larger one is replaced by the result!</p>
              <p>Keep the grid clear and maximize your score!</p>
            </div>
            <button className="help-ok-btn" onClick={() => setShowHelp(false)}>Got it!</button>
          </div>
        </div>
      )}

      {isPaused && (
        <div className="pause-overlay">
          <div className="pause-modal">
            <h2>Game Paused</h2>
            <button className="resume-btn" onClick={() => setIsPaused(false)}>Resume</button>
          </div>
        </div>
      )}

      {gameOver && (
        <GameOver score={score} bestScore={bestScore} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
