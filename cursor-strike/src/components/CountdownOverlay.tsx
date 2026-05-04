import { useState, useEffect, useRef } from 'react';
import { COUNTDOWN_DURATION } from '../utils/constants';

export function CountdownOverlay({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(COUNTDOWN_DURATION);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (count <= 0) {
      setTimeout(() => onDoneRef.current(), 500);
      return;
    }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]); // only depend on count, not onDone

  const display = count <= 0 ? 'GO!' : String(count);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(10,10,10,0.7)',
      zIndex: 100,
    }}>
      <span key={count} style={{
        fontFamily: 'var(--fps-font-heading)',
        fontSize: 96,
        color: 'var(--fps-accent)',
        letterSpacing: -2,
        textShadow: '0 0 16px rgba(74,222,128,0.4)',
        animation: 'countIn 300ms ease-out',
      }}>
        {display}
      </span>
    </div>
  );
}