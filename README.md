# Just Divide - Kid Mode 🐱🎮

A visually stunning, math-based puzzle game built with ReactJS, designed to help children (aged 7-12) master division, factors, and multiples through engaging, tactile gameplay. 

**🔗 Live Demo:** [https://just-divide-game-delta.vercel.app/](https://just-divide-game-delta.vercel.app/)

---

## ✨ Features
*   **Intuitive Drag & Drop**: Smooth tile placement across Grid, KEEP, and TRASH slots.
*   **Dynamic Merge Logic**: Multiple merge types (Equality, Division) with recursive resolution.
*   **Kid-Friendly UI**: Premium visuals with "Glassmorphism" effects, animated bubble backgrounds, and a cute cat guide.
*   **Advanced Game State**: Functional **Undo** (up to 10 states), **Pause** system, and **Smart Hints** that highlight move-making opportunities.
*   **Level & Progression**: Level-up every 10 points, unlocking more TRASH uses as you go.
*   **Persistence**: Automatic **Best Score** tracking using `localStorage`.

---

## 🎲 How to Play (Rules)
*   **Objective**: Drag tiles from the queue into the 4x4 grid. Clear tiles and divide their values to prevent the grid from filling up.
*   **Merge Rules**:
    1.  **Equality**: Two touching tiles of the same value vanish immediately. (e.g., `4 + 4 = Clear`)
    2.  **Division**: If the larger tile is divisible by the smaller tile, the smaller one vanishes and the larger is replaced by the result. (e.g., `12 + 3 = 4`)
    3.  **The "1" Rule**: If a division results in `1`, the tile is removed from the board entirely.
*   **Action Slots**:
    *   **KEEP**: Store a tricky tile for later or swap it with the current active tile.
    *   **TRASH**: Discard an unwanted tile (limited uses per level).

---

## 🛠 Approach & Implementation
The project follows a **Modular React Architecture**:
- **Logic Isolation**: The core engine (merges, neighbor detection, game over checks) is abstracted into `src/utils/gameLogic.js`. This ensures the UI remains "dumb" and purely focused on rendering state.
- **State Management**: Handled via React standard hooks. `useCallback` and `useMemo` were used extensively to prevent unnecessary re-renders during high-frequency drag events.
- **Responsive Design**: Built using a hybrid of CSS Grid/Flexbox and media queries, targeting a core design resolution of **1440 x 1024** while maintaining full usability on mobile and tablet.

---

## 🔑 Key Decisions
- **Custom Event Handlers**: Instead of using heavy libraries like `react-dnd`, I implemented custom Pointer and Mouse handlers. This kept the bundle size small and allowed for precise control over the "ghost" tile during touch events.
- **Visual Depth**: Positioning the Cat character at a lower `z-index` than the score badges but higher than the grid creates a layered, "3D" feel that makes the interface feel more alive.
- **Font & Branding**: Used `Fredoka One` for the primary headers to give the game a playful, premium toy-like aesthetic.

---

## 🚧 Challenges & Solutions
- **Recursive Merge Resolution**: A single tile placement can trigger a chain reaction of merges. I implemented a `while` loop within the `resolveMerges` utility that continues to scan the board until no further valid merges exist, ensuring perfect accuracy every turn.
- **Layout Precision**: Pinning the Cat character's paws so they sit exactly on the borders of the "Level" and "Score" cards across different screen scales required careful coordinate mapping and `transform` logic.

---

## 📈 Future Improvements
- **Micro-Interactions**: Adding spring-physics animations for tile merges using `Framer Motion`.
- **Sound Effects**: Adding "pop" sounds for merges and a rewarding chime for Level-Ups.
- **Themes**: Expanding from the "Pink Peach" theme to include Dark Mode or seasonal variations.

---

### 💻 Local Development
1. Clone the repo: `git clone https://github.com/uzumaki-ak/JustDivide-game.git`
2. Install dependencies: `npm install`
3. Launch: `npm run dev`

---
**Submission for "Just Divide - Kid Mode" Task.**
