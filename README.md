# Block Blast Neo

A sleek dark-theme Material Design take on the classic Block Blast puzzle, built with React,
Vite, and MUI. Drag holographic blocks into the 10×10 board, clear lines, and stack combos on
both desktop and mobile.

## Features

- ⚡️ Responsive layout that fluidly adapts between mobile touch interactions and desktop
  pointer controls.
- 🎨 Custom MUI dark theme with glassmorphism accents and neon block colors.
- 🧠 Smart drag-and-drop powered by `@dnd-kit/core`, including valid move highlighting.
- 🔁 Procedurally generated block sets with combo streak scoring and persistent best score.
- ♻️ Instant reset button so you can chase a new high score anytime.

## Getting started

```bash
npm install
npm run dev
```

The dev server defaults to [http://localhost:5173](http://localhost:5173). Use `npm run build`
to produce an optimized production bundle.

## Controls

- **Drag a block** from the tray into the board. Valid placements glow teal, invalid placements
  glow crimson.
- **Clear lines** (rows or columns) to earn combo streaks for extra points.
- **Reset session** at any time to start fresh while keeping your all-time best score in local
  storage.
