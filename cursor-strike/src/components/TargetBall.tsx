import type { Ball } from '../types/game';

export function TargetBall({ ball }: { ball: Ball }) {
  return (
    <div
      data-ball-id={ball.id}
      style={{
        position: 'absolute',
        left: ball.x - ball.radius,
        top: ball.y - ball.radius,
        width: ball.radius * 2,
        height: ball.radius * 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, var(--fps-accent), var(--fps-green-dark))`,
        boxShadow: `0 0 10px rgba(74,222,128,0.5), 0 2px 4px rgba(0,0,0,0.3)`,
        animation: ball.dying
          ? 'ballDie 200ms ease-in forwards'
          : 'ballSpawn 150ms ease-out forwards',
        cursor: 'pointer',
        pointerEvents: ball.dying ? 'none' : 'auto',
      }}
    />
  );
}