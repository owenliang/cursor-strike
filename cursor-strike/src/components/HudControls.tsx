import { Pause, X } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export function HudControls({ onPause, onExit }: { onPause: () => void; onExit: () => void }) {
  const { t } = useLang();
  return (
    <div style={{ position: 'absolute', left: 20, top: 16, display: 'flex', gap: 12 }}>
      <Btn icon={<Pause size={16} />} label={t('hud_pause')} onClick={onPause} />
      <Btn icon={<X size={16} />} label={t('hud_quit')} onClick={onExit} />
    </div>
  );
}

function Btn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px',
        background: 'rgba(240,240,240,0.5)',
        border: '1px solid var(--fps-border)',
        borderRadius: 'var(--fps-rounded-sm)',
        color: 'var(--foreground-secondary)',
        cursor: 'pointer',
      }}
    >
      {icon}
      <span style={{ fontFamily: 'var(--fps-font-captions)', fontSize: 12 }}>{label}</span>
    </button>
  );
}