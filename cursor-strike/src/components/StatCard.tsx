import { Tip } from './Tip';
import type { TKey } from '../i18n/types';

export function StatCard({ label, desc, value, color, delay, glow }: {
  label: string; desc?: string; value: string; color: string; delay: number; glow?: string;
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      padding: '20px 24px',
      background: 'var(--fps-bg-card)',
      border: '1px solid var(--fps-border)',
      borderRadius: 'var(--fps-rounded-md)',
      backdropFilter: 'blur(8px)',
      animation: `fadeInUp 400ms ${delay}ms both`,
      overflow: 'visible',
    }}>
      <span style={{ fontFamily: 'var(--fps-font-captions)', fontSize: 11, letterSpacing: 2, color: 'var(--fps-text-muted)', display: 'inline-flex', alignItems: 'center' }}>
        {label}
        {desc && <Tip text={desc} />}
      </span>
      <span style={{ fontFamily: 'var(--fps-font-heading)', fontSize: 32, color, textShadow: glow }}>
        {value}
      </span>
    </div>
  );
}

export function buildResultCards(result: {
  totalScore: number; hits: number; misses: number; totalTargets: number;
  hitRate: number; avgReactionTime: number; hitsPerSecond: number;
}) {
  return [
    { labelKey: 'stat_total_score' as TKey, descKey: 'desc_total_score' as TKey, value: String(result.totalScore), color: 'var(--fps-accent)', delay: 0 },
    { labelKey: 'stat_hits' as TKey, descKey: 'desc_hits' as TKey, value: `${result.hits}/${result.totalTargets}`, color: 'var(--fps-accent)', delay: 80 },
    { labelKey: 'stat_misses' as TKey, descKey: 'desc_misses' as TKey, value: String(result.misses), color: 'var(--fps-error)', delay: 160 },
    { labelKey: 'stat_hit_rate' as TKey, descKey: 'desc_hit_rate' as TKey, value: `${result.hitRate.toFixed(1)}%`, color: 'var(--fps-accent)', delay: 240 },
    { labelKey: 'stat_avg_reaction' as TKey, descKey: 'desc_avg_reaction' as TKey, value: `${result.avgReactionTime.toFixed(2)}s`, color: 'var(--fps-accent)', delay: 320 },
    { labelKey: 'stat_hits_per_sec' as TKey, descKey: 'desc_hits_per_sec' as TKey, value: `${result.hitsPerSecond.toFixed(1)}`, color: 'var(--fps-accent)', delay: 400 },
  ];
}