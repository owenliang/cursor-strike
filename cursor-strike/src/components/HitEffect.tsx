import { useState, useEffect } from 'react';

const PARTICLE_COUNT = 5;
const ANGLE_STEP = (Math.PI * 2) / PARTICLE_COUNT;

export function HitEffect({ x, y }: { x: number; y: number }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 300);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = ANGLE_STEP * i;
        const dist = 20 + Math.random() * 10;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: 4, height: 4,
            borderRadius: '50%',
            background: 'var(--fps-accent)',
            animation: `hitParticle 300ms ease-out forwards`,
            '--tx': `${tx}px`, '--ty': `${ty}px`,
            transform: `translate(${tx}px, ${ty}px)`,
            opacity: 0.7,
          } as React.CSSProperties} />
        );
      })}
    </div>
  );
}