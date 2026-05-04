import { useState, useRef, useCallback, useEffect } from 'react';
import type { Ball } from '../types/game';
import { BALL_CONFIG } from '../utils/constants';
import { generateBallPosition } from '../utils/ballCollision';

let nextBallId = 0;

export function useBallSpawner(gameAreaRef: React.RefObject<HTMLDivElement | null>, onSpawn?: () => void) {
  const [balls, setBalls] = useState<Ball[]>([]);
  const ballsRef = useRef<Ball[]>([]);
  const lastSpawnRef = useRef<number>(0);
  const runningRef = useRef(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const onSpawnRef = useRef(onSpawn);
  onSpawnRef.current = onSpawn;

  useEffect(() => { ballsRef.current = balls; }, [balls]);

  const spawnBall = useCallback(() => {
    const now = performance.now();
    const radius = BALL_CONFIG.RADIUS;
    const alive = ballsRef.current.filter(b => !b.dying);

    // Spawn balls at screen center, not at mouse position
    const area = gameAreaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const pos = generateBallPosition(alive, cx, cy);
    if (!pos) return;

    const ball: Ball = {
      id: `ball_${nextBallId++}`,
      x: pos.x,
      y: pos.y,
      radius,
      spawnTime: now,
      dying: false,
    };

    setBalls(prev => {
      const pAlive = prev.filter(b => !b.dying);
      if (pAlive.length >= BALL_CONFIG.MAX_BALLS) return prev;
      return [...prev, ball];
    });

    onSpawnRef.current?.();
  }, [gameAreaRef]);

  const tick = useCallback(() => {
    if (!runningRef.current) return;

    const now = performance.now();
    const interval = BALL_CONFIG.SPAWN_INTERVAL;

    if (now - lastSpawnRef.current >= interval) {
      lastSpawnRef.current = now;
      spawnBall();
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [spawnBall]);

  const start = useCallback(() => {
    runningRef.current = true;
    startTimeRef.current = performance.now();
    lastSpawnRef.current = performance.now() - BALL_CONFIG.SPAWN_INTERVAL;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const resume = useCallback(() => {
    runningRef.current = true;
    lastSpawnRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const killBall = useCallback((id: string) => {
    setBalls(prev => prev.map(b => b.id === id ? { ...b, dying: true } : b));
    setTimeout(() => {
      setBalls(prev => prev.filter(b => b.id !== id));
    }, BALL_CONFIG.DIE_DURATION);
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback(() => {
    setBalls([]);
    ballsRef.current = [];
    nextBallId = 0;
  }, []);

  useEffect(() => { return () => cancelAnimationFrame(rafRef.current); }, []);

  return { balls, start, pause, resume, killBall, stop, reset };
}