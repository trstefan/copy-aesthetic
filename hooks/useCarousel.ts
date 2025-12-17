import { useEffect, useState } from "react";

export function useCarousel(length: number, interval = 4000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval, paused]);

  return {
    index,
    next: () => setIndex((i) => (i + 1) % length),
    prev: () => setIndex((i) => (i - 1 + length) % length),
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
