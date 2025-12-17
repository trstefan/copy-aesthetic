export function useTouchSwipe(onLeft: () => void, onRight: () => void) {
  let startX: number | null = null;

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX = e.targetTouches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) onLeft();
      if (diff < -50) onRight();
      startX = null;
    },
  };
}
