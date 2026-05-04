import { useLang } from '../i18n/LangContext';

export function PauseOverlay({ onResume }: { onResume: () => void }) {
  const { t } = useLang();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
      background: 'rgba(10,10,10,0.7)',
      zIndex: 100,
    }}>
      <span style={{ fontFamily: 'var(--fps-font-heading)', fontSize: 48, color: 'var(--fps-accent)' }}>
        {t('overlay_paused')}
      </span>
      <button
        onClick={onResume}
        style={{
          padding: '14px 32px',
          background: 'var(--fps-accent)',
          borderRadius: 'var(--fps-rounded-md)',
          color: 'var(--fps-bg-dark)',
          fontFamily: 'var(--fps-font-heading)',
          fontSize: 20,
          textShadow: 'var(--fps-glow-accent)',
          cursor: 'pointer',
        }}
      >
        {t('overlay_resume')}
      </button>
    </div>
  );
}