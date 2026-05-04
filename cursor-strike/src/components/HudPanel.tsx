import { Tip } from './Tip';
import { useLang } from '../i18n/LangContext';

export function HudPanel({ hits, totalTargets, misses, timeLeft }: {
  hits: number; totalTargets: number; misses: number; timeLeft: number;
}) {
  const { t } = useLang();
  const seconds = Math.ceil(timeLeft);
  const isLowTime = timeLeft <= 10 && timeLeft > 0;

  return (
    <div style={{
      position: 'absolute', right: 20, top: 16,
      width: 180, padding: '16px 20px',
      background: 'rgba(26,26,26,0.9)',
      border: '1px solid var(--fps-border)',
      borderRadius: 'var(--fps-rounded-md)',
      display: 'flex', flexDirection: 'column', gap: 16,
      overflow: 'visible',
    }}>
      <Row label={t('hud_hits')} desc={t('hud_hits_desc')} value={`${hits}/${totalTargets}`} valueColor="var(--fps-accent)" />
      <Row label={t('hud_misses')} desc={t('hud_misses_desc')} value={String(misses)} valueColor="var(--fps-error)" />
      <Row
        label={t('hud_time_left')}
        desc={t('hud_time_desc')}
        value={`${seconds}s`}
        valueColor={isLowTime ? 'var(--fps-error)' : 'var(--fps-text-primary)'}
        valueStyle={isLowTime ? { animation: 'timeFlash 500ms infinite' } : undefined}
      />
    </div>
  );
}

function Row({ label, desc, value, valueColor, valueStyle }: {
  label: string; desc?: string; value: string; valueColor: string; valueStyle?: React.CSSProperties;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--fps-font-captions)', fontSize: 11, letterSpacing: 2, color: 'var(--fps-text-muted)', display: 'inline-flex', alignItems: 'center' }}>
        {label}
        {desc && <Tip text={desc} />}
      </span>
      <span style={{ fontFamily: 'var(--fps-font-heading)', fontSize: 24, color: valueColor, ...valueStyle }}>
        {value}
      </span>
    </div>
  );
}