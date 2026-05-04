import { useState } from 'react';
import { Info } from 'lucide-react';

export function Tip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-flex', marginLeft: 4, cursor: 'help' }}
    >
      <Info size={12} color="var(--fps-text-muted)" />
      {show && (
        <span style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-4px)',
          padding: '8px 12px',
          background: '#2a2a4a',
          border: '1px solid var(--fps-border)',
          borderRadius: 'var(--fps-rounded-sm)',
          color: 'var(--fps-text-light)',
          fontFamily: 'var(--fps-font-body)',
          fontSize: 12,
          lineHeight: 1.4,
          whiteSpace: 'normal',
          minWidth: 120,
          maxWidth: 220,
          textAlign: 'center',
          zIndex: 999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          marginBottom: 4,
        }}>
          {text}
        </span>
      )}
    </span>
  );
}