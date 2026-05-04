import { useState, useRef, useCallback } from 'react';
import { GAME_DURATION } from '../utils/constants';

export function useTimer(onEnd: () => void) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const startTimeRef = useRef<number>(0);
  const pauseAccumRef = useRef<number>(0);
  const pauseStartRef = useRef<number>(0);
  const runningRef = useRef(false);
  const endedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const tick = useCallback(() => {
    if (!runningRef.current || endedRef.current) return;
    const now = performance.now();
    const elapsed = (now - startTimeRef.current - pauseAccumRef.current) / 1000;
    const left = Math.max(0, GAME_DURATION - elapsed);
    setTimeLeft(left);

    if (left <= 0) {
      endedRef.current = true;
      runningRef.current = false;
      onEndRef.current();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = performance.now();
    pauseAccumRef.current = 0;
    endedRef.current = false;
    runningRef.current = true;
    setTimeLeft(GAME_DURATION);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    if (!runningRef.current) return;
    runningRef.current = false;
    pauseStartRef.current = performance.now();
    cancelAnimationFrame(rafRef.current);
  }, []);

  const resume = useCallback(() => {
    if (runningRef.current || endedRef.current) return;
    pauseAccumRef.current += performance.now() - pauseStartRef.current;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    runningRef.current = false;
    endedRef.current = true;
    cancelAnimationFrame(rafRef.current);
  }, []);

  return { timeLeft, start, pause, resume, stop, isRunning: runningRef.current };
}