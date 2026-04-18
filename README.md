# Just Divide - Kid Mode

A visually stunning, math-based puzzle game built with ReactJS for children aged 7-12. This project focuses on factor/multiple recognition and strategic division through an engaging "Kid Mode" interface.

## 🚀 Quick Start
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server

## 🛠 Approach & Implementation
The game was built using a **component-driven architecture** in React.
- **State Management**: Centralized in `App.jsx` using React Hooks (`useState`, `useEffect`, `useCallback`) to maintain a single source of truth for the 4x4 grid, queue, and scoring.
- **Logic Engine**: Decoupled game logic in `src/utils/gameLogic.js`. This allows for pure functional testing of the merge rules (Equality, Division, and the "Result of 1" rule) outside of the UI.
- **Visuals**: Modern CSS with frosted glass effects (Glassmorphism), animated bubble backgrounds, and a responsive layout designed for 1440x1024 workspaces.

## 🔑 Key Decisions
- **Custom Drag & Drop**: Implemented a lightweight drag-and-drop system with full support for both **Mouse** and **Touch** events to ensure smooth gameplay on mobile and tablet devices.
- **Z-Index Layering**: The "Cat" character is dynamically layered behind the Level/Score badges and overlaps the grid to create a sense of depth and interaction with the game board.
- **Hint System**: A dynamic cell-highlighting system that uses the pure logic engine to pre-calculate valid moves for the player.

## 🚧 Challenges
- **Merge Cascades**: Ensuring that multiple merges (e.g., a division resulting in a number that then merges with an adjacent twin) resolve correctly in a single turn. This was solved using a `while` loop in the resolution logic.
- **Visual Alignment**: Adjusting the absolute positioning of the "Cat" character to precisely "bite" the grid border while ensuring the paws sit correctly on top of the moving badges across various screen sizes.

## 📈 Future Improvements
- **Animated Merges**: Adding more granular CSS animations or Framer Motion for tiles as they merge/divide to enhance the game's tactile feel.
- **Sound Design**: Integrating subtle audio cues for successful merges and level-ups to provide better feedback to the player.
- **Themes**: Multiple cat characters and background colors that change as the player reaches higher levels.

---
**Submission for "Just Divide - Kid Mode" Task.**
