import { useState, useRef, useCallback } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { Crosshair } from '../components/Crosshair';
import { TargetBall } from '../components/TargetBall';
import { HudPanel } from '../components/HudPanel';
import { HudControls } from '../components/HudControls';
import { CountdownOverlay } from '../components/CountdownOverlay';
import { PauseOverlay } from '../components/PauseOverlay';
import { ConfirmModal } from '../components/ConfirmModal';
import { HitEffect } from '../components/HitEffect';
import type { GameResult } from '../types/game';

export function GamePage({ nickname, onEnd, onExit }: {
  nickname: string; onEnd: (result: GameResult) => void; onExit: () => void;
}) {
  const [phase, setPhase] = useState<'countdown' | 'playing' | 'paused' | 'confirm_exit'>('countdown');
  const [crosshairFlash, setCrosshairFlash] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [hitEffects, setHitEffects] = useState<{ id: string; x: number; y: number }[]>([]);
  const areaRef = useRef<HTMLDivElement>(null);

  const game = useGameLoop(areaRef, (result) => { onEnd(result); }, nickname);

  const gameRef = useRef(game);
  gameRef.current = game;
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  // Mouse move: update crosshair position + parallax background
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    // Parallax: offset background opposite to mouse direction
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setBgOffset({
      x: -(x - cx) * 0.5,
      y: -(y - cy) * 0.5,
    });
  }, []);

  const handleCountdownDone = useCallback(() => {
    setPhase('playing');
    gameRef.current.startGame();
  }, []);

  const handlePause = useCallback(() => {
    setPhase('paused');
    gameRef.current.pauseGame();
  }, []);

  const handleResume = useCallback(() => {
    setPhase('playing');
    gameRef.current.resumeGame();
  }, []);

  const handleExitRequest = useCallback(() => {
    setPhase('confirm_exit');
    gameRef.current.pauseGame();
  }, []);

  const handleExitConfirm = useCallback(() => {
    gameRef.current.resetGame();
    onExitRef.current();
  }, []);

  const handleExitCancel = useCallback(() => {
    setPhase('paused');
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'playing') return;
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const currentBalls = gameRef.current.balls;
    let hitBall: string | null = null;
    for (const ball of currentBalls) {
      if (ball.dying) continue;
      const dist = Math.sqrt((clickX - ball.x) ** 2 + (clickY - ball.y) ** 2);
      if (dist <= ball.radius) {
        hitBall = ball.id;
        break;
      }
    }

    if (hitBall) {
      gameRef.current.handleHit(hitBall);
      setHitEffects(prev => [...prev, { id: `fx_${Date.now()}`, x: clickX, y: clickY }]);
      setTimeout(() => setHitEffects(prev => prev.slice(1)), 350);
    } else {
      gameRef.current.handleMiss();
      setCrosshairFlash(true);
      setTimeout(() => setCrosshairFlash(false), 150);
    }
  }, [phase]);

  return (
    <div
      ref={areaRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--fps-bg-dark)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {/* Moving background — grid pattern that shifts with mouse */}
      <div style={{
        position: 'absolute',
        width: '140%',
        height: '140%',
        left: '-20%',
        top: '-20%',
        transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)`,
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none',
      }}>
        {/* Grid lines */}
        {Array.from({ length: 15 }, (_, i) => (
          <div key={`h${i}`} style={{
            position: 'absolute',
            left: 0, top: `${(i + 1) * 6.67}%`,
            width: '100%', height: 1,
            background: 'rgba(74, 222, 128, 0.12)',
          }} />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`v${i}`} style={{
            position: 'absolute',
            left: `${(i + 1) * 5}%`, top: 0,
            width: 1, height: '100%',
            background: 'rgba(74, 222, 128, 0.12)',
          }} />
        ))}
        {/* Center glow */}
        <div style={{
          position: 'absolute',
          left: '45%', top: '40%',
          width: '10%', height: '20%',
          background: 'radial-gradient(ellipse, rgba(74,222,128,0.08), rgba(102,51,153,0.03), transparent)',
        }} />
      </div>

      <Crosshair x={mousePos.x} y={mousePos.y} flash={crosshairFlash} />

      {game.balls.map(ball => (
        <TargetBall key={ball.id} ball={ball} />
      ))}

      {hitEffects.map(fx => <HitEffect key={fx.id} x={fx.x} y={fx.y} />)}

      <HudPanel hits={game.hits} totalTargets={game.totalTargets} misses={game.misses} timeLeft={game.timeLeft} />
      <HudControls onPause={handlePause} onExit={handleExitRequest} />

      {phase === 'countdown' && <CountdownOverlay onDone={handleCountdownDone} />}
      {phase === 'paused' && <PauseOverlay onResume={handleResume} />}
      {phase === 'confirm_exit' && <ConfirmModal onConfirm={handleExitConfirm} onCancel={handleExitCancel} />}
    </div>
  );
}