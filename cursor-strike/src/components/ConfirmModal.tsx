import { useLang } from '../i18n/LangContext';

export function ConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const { t } = useLang();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(10,10,10,0.8)',
      zIndex: 200,
    }}>
      <div style={{
        padding: 32,
        background: 'var(--fps-bg-card)',
        border: '1px solid var(--fps-border)',
        borderRadius: 'var(--fps-rounded-md)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        <span style={{ fontFamily: 'var(--fps-font-heading)', fontSize: 24, color: 'var(--fps-text-primary)' }}>
          {t('confirm_quit_title')}
        </span>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={onConfirm} style={{
            padding: '12px 24px',
            background: 'var(--fps-error)',
            borderRadius: 'var(--fps-rounded-sm)',
            color: '#fff',
            fontFamily: 'var(--fps-font-heading)',
            fontSize: 16,
            cursor: 'pointer',
          }}>
            {t('confirm_quit_yes')}
          </button>
          <button onClick={onCancel} style={{
            padding: '12px 24px',
            background: 'var(--fps-bg-card)',
            border: '1px solid var(--fps-border)',
            borderRadius: 'var(--fps-rounded-sm)',
            color: 'var(--fps-text-light)',
            fontFamily: 'var(--fps-font-heading)',
            fontSize: 16,
            cursor: 'pointer',
          }}>
            {t('confirm_quit_no')}
          </button>
        </div>
      </div>
    </div>
  );
}