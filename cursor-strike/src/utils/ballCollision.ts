import type { Ball } from '../types/game';
import { BALL_CONFIG } from './constants';

export function generateBallPosition(existingBalls: Ball[], anchorX: number, anchorY: number): { x: number; y: number } | null {
  const minDist = BALL_CONFIG.DISTANCE_MIN;
  const maxDist = BALL_CONFIG.DISTANCE_MAX;

  for (let i = 0; i < BALL_CONFIG.SPAWN_RETRIES; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = minDist + Math.random() * (maxDist - minDist);
    const x = anchorX + Math.cos(angle) * dist;
    const y = anchorY + Math.sin(angle) * dist;

    const overlaps = existingBalls.some(ball => {
      const minGap = ball.radius + BALL_CONFIG.RADIUS + BALL_CONFIG.BALL_GAP;
      const actualDist = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);
      return actualDist < minGap;
    });

    if (!overlaps) return { x, y };
  }
  return null;
}