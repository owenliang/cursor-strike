// FPS-style crosshair: 4 short arms with center gap + dot
const ARM_LEN = 8;
const GAP = 4;
const DOT = 4;
const LINE_W = 2;

export function Crosshair({ x, y, flash }: { x: number; y: number; flash: boolean }) {
  const color = flash ? 'var(--fps-error)' : 'var(--fps-accent)';
  const opacity = flash ? undefined : 0.8;

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {/* Top arm */}
      <div style={{
        position: 'absolute', left: -LINE_W / 2, top: -(GAP + ARM_LEN),
        width: LINE_W, height: ARM_LEN,
        background: color, opacity,
        animation: flash ? 'crosshairFlash 150ms ease-out forwards' : undefined,
      }} />
      {/* Bottom arm */}
      <div style={{
        position: 'absolute', left: -LINE_W / 2, top: GAP,
        width: LINE_W, height: ARM_LEN,
        background: color, opacity,
        animation: flash ? 'crosshairFlash 150ms ease-out forwards' : undefined,
      }} />
      {/* Left arm */}
      <div style={{
        position: 'absolute', left: -(GAP + ARM_LEN), top: -LINE_W / 2,
        width: ARM_LEN, height: LINE_W,
        background: color, opacity,
        animation: flash ? 'crosshairFlash 150ms ease-out forwards' : undefined,
      }} />
      {/* Right arm */}
      <div style={{
        position: 'absolute', left: GAP, top: -LINE_W / 2,
        width: ARM_LEN, height: LINE_W,
        background: color, opacity,
        animation: flash ? 'crosshairFlash 150ms ease-out forwards' : undefined,
      }} />
      {/* Center dot */}
      <div style={{
        position: 'absolute', left: -DOT / 2, top: -DOT / 2,
        width: DOT, height: DOT,
        borderRadius: '50%',
        background: color,
      }} />
    </div>
  );
}