import { useLang } from '../i18n/LangContext';

export function PauseOverlay({ onResume }: { onResume: () => void }) {
  const { t } = useLang();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
      background: 'rgba(0,0,0,0.5)',
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
          color: 'var(--foreground-inverse)',
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