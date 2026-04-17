// Tile value pools by difficulty
const TILE_POOLS = {
  easy: [2, 3, 4, 5, 6, 8, 9, 10, 12, 15],
  medium: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20],
  hard: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 25, 30],
};

// Generate a random tile value based on difficulty
export function generateTileValue(difficulty = 'easy') {
  const pool = TILE_POOLS[difficulty] || TILE_POOLS.easy;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Generate initial queue of 3 tiles
export function generateQueue(difficulty = 'easy') {
  return [
    generateTileValue(difficulty),
    generateTileValue(difficulty),
    generateTileValue(difficulty),
  ];
}

// Create empty 4x4 grid
export function createEmptyGrid() {
  return Array(16).fill(null);
}

// Get neighbor indices for a given cell index in 4x4 grid
export function getNeighbors(index) {
  const row = Math.floor(index / 4);
  const col = index % 4;
  const neighbors = [];

  if (row > 0) neighbors.push(index - 4); // up
  if (row < 3) neighbors.push(index + 4); // down
  if (col > 0) neighbors.push(index - 1); // left
  if (col < 3) neighbors.push(index + 1); // right

  return neighbors;
}

// Resolve merges after placing a tile
// Returns { grid, points } where points is the score earned
export function resolveMerges(gridInput, placedIndex) {
  const grid = [...gridInput];
  let totalPoints = 0;
  let merged = true;

  // Keep resolving until no more merges happen
  while (merged) {
    merged = false;

    // Check all cells that have values
    for (let i = 0; i < 16; i++) {
      if (grid[i] === null) continue;

      const neighbors = getNeighbors(i);
      for (const ni of neighbors) {
        if (grid[ni] === null) continue;

        const a = grid[i];
        const b = grid[ni];

        // Equal tiles: both vanish
        if (a === b) {
          totalPoints += a;
          grid[i] = null;
          grid[ni] = null;
          merged = true;
          break;
        }

        // Divisible tiles: larger / smaller = whole number
        const larger = Math.max(a, b);
        const smaller = Math.min(a, b);
        if (larger % smaller === 0) {
          const result = larger / smaller;
          totalPoints += smaller;

          // Result of 1 is removed
          if (result === 1) {
            grid[i] = null;
            grid[ni] = null;
          } else {
            // Place result where the larger tile was
            if (grid[i] === larger) {
              grid[i] = result;
              grid[ni] = null;
            } else {
              grid[ni] = result;
              grid[i] = null;
            }
          }
          merged = true;
          break;
        }
      }
      if (merged) break; // restart scan after a merge
    }
  }

  return { grid, points: totalPoints };
}

// Check if a tile placement at index would cause a merge
export function wouldMerge(grid, index, tileValue) {
  if (grid[index] !== null) return false;

  const neighbors = getNeighbors(index);
  for (const ni of neighbors) {
    if (grid[ni] === null) continue;
    const a = tileValue;
    const b = grid[ni];

    // Equal
    if (a === b) return true;

    // Divisible
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);
    if (larger % smaller === 0) return true;
  }
  return false;
}

// Get all valid hint cells for current tile
export function getHintCells(grid, tileValue) {
  const hints = [];
  for (let i = 0; i < 16; i++) {
    if (grid[i] === null && wouldMerge(grid, i, tileValue)) {
      hints.push(i);
    }
  }
  return hints;
}

// Check if game is over (grid full and no valid merges possible)
export function isGameOver(grid, queue, keepVal) {
  // If there are empty cells, not over
  if (grid.some((v) => v === null)) return false;

  // Check if any adjacent tiles can merge
  for (let i = 0; i < 16; i++) {
    if (grid[i] === null) continue;
    const neighbors = getNeighbors(i);
    for (const ni of neighbors) {
      if (grid[ni] === null) continue;
      const a = grid[i];
      const b = grid[ni];
      if (a === b) return false;
      const larger = Math.max(a, b);
      const smaller = Math.min(a, b);
      if (larger % smaller === 0) return false;
    }
  }

  return true;
}

// Calculate level from score
export function calculateLevel(score) {
  return Math.floor(score / 10) + 1;
}

// Get trash uses for a level
export function getTrashUses(level) {
  return 3 + Math.floor((level - 1) / 2);
}

// Difficulty based on level
export function getDifficulty(level) {
  if (level <= 3) return 'easy';
  if (level <= 7) return 'medium';
  return 'hard';
}

// Get tile color based on value
export function getTileColor(value) {
  if (value === null) return 'transparent';
  const colors = {
    2: '#3898e8',    // blue
    3: '#f69c28',    // orange
    4: '#e85888',    // pink
    5: '#3898e8',    // blue
    6: '#f8d848',    // yellow
    7: '#e85888',    // pink
    8: '#f69c28',    // orange
    9: '#e84040',    // red
    10: '#28c878',   // emerald
    12: '#4cc84c',   // green
    14: '#a858d8',   // purple
    15: '#f69c28',   // orange
    16: '#e85888',   // pink
    18: '#4cc84c',   // green
    20: '#f8d848',   // yellow
    24: '#3898e8',   // blue
    25: '#e84040',   // red
    30: '#28c878',   // emerald
    32: '#e84040',   // red
    35: '#a858d8',   // purple
  };
  return colors[value] || '#e84040';
}

// Get a darker shade for tile bottom border
export function getTileDarkColor(value) {
  if (value === null) return 'transparent';
  const colors = {
    2: '#2878c8',
    3: '#d88018',
    4: '#c84068',
    5: '#2878c8',
    6: '#d8b838',
    7: '#c84068',
    8: '#d88018',
    9: '#c03030',
    10: '#20a860',
    12: '#38a838',
    14: '#8840b8',
    15: '#d88018',
    16: '#c84068',
    18: '#38a838',
    20: '#d8b838',
    24: '#2878c8',
    25: '#c03030',
    30: '#20a860',
    32: '#c03030',
    35: '#8840b8',
  };
  return colors[value] || '#c03030';
}
