import { useEffect, useCallback } from 'react';

export interface KeyboardHandlers {
  onLeft: () => void;
  onRight: () => void;
  onDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onPause: () => void;
}

export function useKeyboard(handlers: KeyboardHandlers, enabled: boolean = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          handlers.onLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          handlers.onRight();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          handlers.onDown();
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          handlers.onRotate();
          break;
        case ' ':
          event.preventDefault();
          handlers.onHardDrop();
          break;
        case 'p':
        case 'P':
        case 'Escape':
          event.preventDefault();
          handlers.onPause();
          break;
      }
    },
    [handlers, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
