# Issue #4: feat: Create a simple webapp tetris

**Priority**: P5 (FEAT - New Feature)
**Created**: 2026-01-31
**GitHub**: https://github.com/dezverev/cursorSkillTest/issues/4

---

## Execution Plan

### Summary
Build a simple Tetris web application using React for the frontend and Node.js/Express for the backend.

### Steps

#### Phase 1: Project Setup
1. Initialize the project structure following repository conventions (`src/dev/`, `src/test/`)
2. Set up Node.js backend with Express in `src/dev/server/`
3. Set up React frontend with Vite in `src/dev/client/`
4. Configure TypeScript for both frontend and backend
5. Create `package.json` with scripts for dev, build, and test

#### Phase 2: Backend Development
6. Create Express server with static file serving
7. Add API endpoint for high scores (optional persistence)
8. Configure CORS and middleware

#### Phase 3: Game Core Logic
9. Implement Tetris game state management
   - Board representation (10x20 grid)
   - Tetromino shapes (I, O, T, S, Z, J, L)
   - Piece rotation logic
   - Collision detection
10. Implement game mechanics
    - Piece movement (left, right, down, rotate)
    - Line clearing
    - Scoring system
    - Level progression (speed increase)
    - Game over detection

#### Phase 4: React Frontend
11. Create game board component with CSS Grid
12. Implement piece preview (next piece)
13. Add score/level/lines display
14. Handle keyboard input (arrow keys, space for hard drop)
15. Add game controls (start, pause, restart)
16. Style with modern UI (clean, responsive design)

#### Phase 5: Polish & Testing
17. Add sound effects (optional)
18. Implement local high score storage
19. Write unit tests for game logic in `src/test/`
20. Test responsive design on different screen sizes

### Files Likely Affected

```
src/
├── dev/
│   ├── client/
│   │   ├── index.html
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   ├── components/
│   │   │   │   ├── GameBoard.tsx
│   │   │   │   ├── Piece.tsx
│   │   │   │   ├── NextPiece.tsx
│   │   │   │   ├── ScoreBoard.tsx
│   │   │   │   └── Controls.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGameState.ts
│   │   │   │   ├── useKeyboard.ts
│   │   │   │   └── useInterval.ts
│   │   │   ├── utils/
│   │   │   │   ├── tetrominos.ts
│   │   │   │   ├── gameLogic.ts
│   │   │   │   └── collision.ts
│   │   │   └── styles/
│   │   │       └── game.css
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── server/
│       ├── index.ts
│       ├── routes/
│       │   └── scores.ts
│       └── package.json
└── test/
    ├── client/
    │   └── gameLogic.test.ts
    └── server/
        └── api.test.ts
```

### Testing Approach

1. **Unit Tests**: Test game logic functions (rotation, collision, line clearing, scoring)
2. **Component Tests**: Test React components render correctly
3. **Integration Tests**: Test API endpoints
4. **Manual Testing**: Play the game to verify:
   - All 7 tetromino shapes work correctly
   - Rotation works at boundaries
   - Line clearing removes full rows
   - Score increments properly
   - Game over triggers when pieces stack to top
   - Keyboard controls are responsive

### Risks/Considerations

1. **Performance**: React re-renders on game tick - may need optimization with `useMemo`/`useCallback`
2. **Rotation at edges**: Wall kick logic needed for proper piece rotation near boundaries
3. **Mobile support**: Touch controls would require additional implementation
4. **Browser compatibility**: Test across Chrome, Firefox, Safari
5. **State management**: Consider if Redux/Zustand needed for complex state (likely overkill for simple Tetris)

### Tech Stack

- **Frontend**: React 18+, TypeScript, Vite, CSS
- **Backend**: Node.js, Express, TypeScript
- **Testing**: Vitest or Jest
- **Build**: Vite for frontend, tsc for backend

### Estimated Complexity

**Medium** - Core game logic is well-documented, but requires careful implementation of collision detection and rotation mechanics.
