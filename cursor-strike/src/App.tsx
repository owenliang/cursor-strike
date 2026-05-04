import { useState } from 'react';
import type { Page, GameResult } from './types/game';
import { LoginPage } from './pages/LoginPage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage';
import './styles/global.css';
import './styles/animations.css';

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [nickname, setNickname] = useState('');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (target: Page) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(target);
      setTransitioning(false);
    }, 200);
  };

  const handleStart = (nick: string) => {
    setNickname(nick);
    navigate('game');
  };

  const handleGameEnd = (result: GameResult) => {
    setGameResult(result);
    navigate('result');
  };

  const handlePlayAgain = () => {
    navigate('game');
  };

  const handleHome = () => {
    navigate('login');
  };

  const handleExit = () => {
    navigate('login');
  };

  return (
    <div style={{
      opacity: transitioning ? 0 : 1,
      transition: 'opacity 200ms',
      pointerEvents: transitioning ? 'none' : 'auto',
    }}>
      {page === 'login' && <LoginPage onStart={handleStart} />}
      {page === 'game' && <GamePage nickname={nickname} onEnd={handleGameEnd} onExit={handleExit} />}
      {page === 'result' && gameResult && <ResultPage result={gameResult} onPlayAgain={handlePlayAgain} onHome={handleHome} />}
    </div>
  );
}