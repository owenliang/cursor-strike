import { StatCard, buildResultCards } from '../components/StatCard';
import { PlayAgainBtn, HomeBtn } from '../components/ActionButton';
import type { GameResult } from '../types/game';
import { saveResult } from '../utils/storage';
import { useLang } from '../i18n/LangContext';

export function ResultPage({ result, onPlayAgain, onHome }: {
  result: GameResult; onPlayAgain: () => void; onHome: () => void;
}) {
  const cards = buildResultCards(result);
  const { t } = useLang();

  saveResult({ ...result, id: `r_${result.timestamp}` });

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'var(--fps-bg-dark)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: '30%', top: '30%',
        width: '40%', height: '42%',
        background: 'radial-gradient(ellipse, rgba(74,222,128,0.03), transparent)',
        opacity: 0.4,
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 80px', gap: 32,
      }}>
        <span style={{
          fontFamily: 'var(--fps-font-heading)', fontSize: 48, fontWeight: 'bold',
          letterSpacing: 1, color: 'var(--fps-accent)',
          textShadow: '0 0 10px rgba(74,222,128,0.25)',
        }}>
          {t('result_title')}
        </span>

        <span style={{
          fontFamily: 'var(--fps-font-captions)', fontSize: 13,
          letterSpacing: 3, color: 'var(--fps-text-light)',
        }}>
          {t('result_subtitle')}
        </span>

        <div style={{ width: 840, maxWidth: '90vw', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {cards.slice(0, 3).map(c => <div key={c.labelKey} style={{ flex: 1, overflow: 'visible' }}><StatCard label={t(c.labelKey)} desc={t(c.descKey)} value={c.value} color={c.color} delay={c.delay} /></div>)}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {cards.slice(3).map(c => <div key={c.labelKey} style={{ flex: 1, overflow: 'visible' }}><StatCard label={t(c.labelKey)} desc={t(c.descKey)} value={c.value} color={c.color} delay={c.delay} /></div>)}
          </div>
        </div>

        <div style={{ width: 480, maxWidth: '90vw', display: 'flex', gap: 16 }}>
          <PlayAgainBtn onClick={onPlayAgain} />
          <HomeBtn onClick={onHome} />
        </div>
      </div>
    </div>
  );
}