import { useRef, useCallback } from 'react';
import { useTimer } from './useTimer';
import { useBallSpawner } from './useBallSpawner';
import { useScore } from './useScore';
import { GAME_DURATION } from '../utils/constants';
import type { GameResult } from '../types/game';

export function useGameLoop(
  gameAreaRef: React.RefObject<HTMLDivElement | null>,
  onEnd: (result: GameResult) => void,
  nickname: string
) {
  const score = useScore();
  const balls = useBallSpawner(gameAreaRef, score.onSpawn);
  const timer = useTimer(() => {
    const s = scoreRef.current;
    const hitsPerSecond = s.hits > 0 ? s.hits / GAME_DURATION : 0;
    const result: GameResult = {
      nickname,
      totalScore: s.score,
      hits: s.hits,
      misses: s.misses,
      totalTargets: s.totalTargets,
      hitRate: s.hitRate,
      avgReactionTime: s.avgReaction,
      hitsPerSecond,
      timestamp: Date.now(),
    };
    balls.stop();
    onEndRef.current(result);
  });

  const scoreRef = useRef(score);
  scoreRef.current = score;
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  const pausedRef = useRef(false);

  const startGame = useCallback(() => {
    pausedRef.current = false;
    score.reset();
    balls.reset();
    timer.start();
    balls.start();
  }, [timer, balls, score]);

  const pauseGame = useCallback(() => {
    pausedRef.current = true;
    timer.pause();
    balls.pause();
  }, [timer, balls]);

  const resumeGame = useCallback(() => {
    pausedRef.current = false;
    timer.resume();
    balls.resume();
  }, [timer, balls]);

  const handleHit = useCallback((ballId: string) => {
    const ball = balls.balls.find(b => b.id === ballId);
    if (!ball || ball.dying) return;
    const reactionTime = performance.now() - ball.spawnTime;
    balls.killBall(ballId);
    score.onHit(reactionTime);
  }, [balls, score]);

  const handleMiss = useCallback(() => {
    score.onMiss();
  }, [score]);

  return {
    timeLeft: timer.timeLeft,
    balls: balls.balls,
    score: score.score,
    hits: score.hits,
    misses: score.misses,
    totalTargets: score.totalTargets,
    hitRate: score.hitRate,
    avgReaction: score.avgReaction,
    paused: pausedRef.current,
    startGame,
    pauseGame,
    resumeGame,
    handleHit,
    handleMiss,
    resetGame: () => { balls.stop(); timer.stop(); },
  };
}