import { useState, useRef, useCallback } from 'react';
import { SCORE_PER_HIT } from '../utils/constants';

export function useScore() {
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);
  const reactionTimesRef = useRef<number[]>([]);

  const onHit = useCallback((reactionTime: number) => {
    setScore(s => s + SCORE_PER_HIT);
    setHits(h => h + 1);
    reactionTimesRef.current.push(reactionTime);
  }, []);

  const onMiss = useCallback(() => {
    setMisses(m => m + 1);
  }, []);

  const onSpawn = useCallback(() => {
    setTotalTargets(t => t + 1);
  }, []);

  const hitRate = hits + misses > 0 ? (hits / (hits + misses)) * 100 : 0;
  const avgReaction = reactionTimesRef.current.length > 0
    ? reactionTimesRef.current.reduce((a, b) => a + b, 0) / reactionTimesRef.current.length / 1000
    : 0;

  const reset = useCallback(() => {
    setScore(0);
    setHits(0);
    setMisses(0);
    setTotalTargets(0);
    reactionTimesRef.current = [];
  }, []);

  return { score, hits, misses, totalTargets, hitRate, avgReaction, onHit, onMiss, onSpawn, reset };
}