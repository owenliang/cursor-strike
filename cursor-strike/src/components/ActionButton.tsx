import { RotateCcw, Home } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export function ActionButton({ variant, icon, label, onClick }: {
  variant: 'primary' | 'secondary'; icon: React.ReactNode; label: string; onClick: () => void;
}) {
  const isPrimary = variant === 'primary';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        padding: '14px 28px',
        background: isPrimary ? 'var(--fps-accent)' : 'var(--fps-bg-card)',
        border: isPrimary ? 'none' : '1px solid var(--fps-border)',
        borderRadius: 'var(--fps-rounded-md)',
        color: isPrimary ? 'var(--fps-bg-dark)' : 'var(--fps-text-light)',
        boxShadow: isPrimary ? 'var(--fps-glow-accent)' : 'none',
        cursor: 'pointer',
        fontFamily: 'var(--fps-font-heading)',
        fontSize: 18,
        letterSpacing: 1,
        width: '100%',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export function PlayAgainBtn({ onClick }: { onClick: () => void }) {
  const { t } = useLang();
  return <ActionButton variant="primary" icon={<RotateCcw size={18} />} label={t('result_play_again')} onClick={onClick} />;
}

export function HomeBtn({ onClick }: { onClick: () => void }) {
  const { t } = useLang();
  return <ActionButton variant="secondary" icon={<Home size={18} />} label={t('result_home')} onClick={onClick} />;
}