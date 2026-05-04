import { useState, useRef } from 'react';
import { User, Crosshair } from 'lucide-react';
import { MAX_NICKNAME_LENGTH } from '../utils/constants';
import { useLang } from '../i18n/LangContext';

export function LoginPage({ onStart }: { onStart: (nickname: string) => void }) {
  const [nickname, setNickname] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang, setLang, t } = useLang();

  const handleStart = () => {
    if (!nickname.trim()) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      inputRef.current?.focus();
      return;
    }
    onStart(nickname.trim());
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'var(--fps-bg-dark)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Percentage-based grid lines */}
        {[25, 50, 75].map(pct => (
          <div key={`h${pct}`} style={{ position:'absolute', left:0, top:`${pct}%`, width:'100%', height:1, background:'rgba(26,26,26,0.15)' }} />
        ))}
        {[25, 50, 75].map(pct => (
          <div key={`v${pct}`} style={{ position:'absolute', left:`${pct}%`, top:0, width:1, height:'100%', background:'rgba(26,26,26,0.15)' }} />
        ))}
        <div style={{
          position: 'absolute', left: '30%', top: '22%',
          width: '40%', height: '56%',
          background: 'radial-gradient(ellipse, rgba(74,222,128,0.03), transparent)',
          opacity: 0.5,
        }} />
      </div>

      {/* Language selector */}
      <div style={{
        position: 'absolute', right: 20, top: 16, zIndex: 1,
        display: 'flex',
        border: '1px solid var(--fps-accent)',
        borderRadius: 'var(--fps-rounded-sm)',
        overflow: 'hidden',
        zIndex: 10,
      }}>
        <button
          onClick={() => setLang('zh')}
          style={{
            padding: '8px 16px',
            background: lang === 'zh' ? 'var(--fps-accent)' : 'var(--fps-bg-card)',
            color: lang === 'zh' ? 'var(--fps-bg-dark)' : 'var(--fps-accent)',
            fontFamily: 'var(--fps-font-captions)',
            fontSize: 13,
            letterSpacing: 2,
            cursor: 'pointer',
            border: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          中
        </button>
        <button
          onClick={() => setLang('en')}
          style={{
            padding: '8px 16px',
            background: lang === 'en' ? 'var(--fps-accent)' : 'var(--fps-bg-card)',
            color: lang === 'en' ? 'var(--fps-bg-dark)' : 'var(--fps-accent)',
            fontFamily: 'var(--fps-font-captions)',
            fontSize: 13,
            letterSpacing: 2,
            cursor: 'pointer',
            border: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          EN
        </button>
      </div>

      {/* Centered content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 480, maxWidth: '90vw', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 32,
        }}>
          <span style={{
            fontFamily: 'var(--fps-font-heading)', fontSize: 72, fontWeight: 'bold',
            letterSpacing: -2, color: 'var(--fps-accent)',
            textShadow: '0 0 12px rgba(74,222,128,0.25)',
          }}>
            CURSOR STRIKE
          </span>

          <div style={{ width: 200, height: 2, background: 'var(--fps-accent)', opacity: 0.6, borderRadius: 1 }} />

          <span style={{
            fontFamily: 'var(--fps-font-captions)', fontSize: 14,
            letterSpacing: 4, color: 'var(--fps-text-light)',
          }}>
            {t('login_subtitle')}
          </span>

          <div style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 20px',
            background: 'var(--fps-bg-card)',
            border: shaking ? '1px solid var(--fps-error)' : '1px solid var(--fps-border)',
            borderRadius: 'var(--fps-rounded-md)',
            animation: shaking ? 'shake 400ms' : undefined,
          }}>
            <User size={20} color="var(--fps-text-muted)" />
            <input
              ref={inputRef}
              value={nickname}
              onChange={e => setNickname(e.target.value.slice(0, MAX_NICKNAME_LENGTH))}
              placeholder={t('login_placeholder')}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              style={{
                flex: 1, background: 'transparent', border: 'none',
                fontFamily: 'var(--fps-font-body)', fontSize: 16,
                color: 'var(--fps-text-primary)',
              }}
            />
          </div>

          <button
            onClick={handleStart}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10,
              padding: '16px 32px',
              background: 'var(--fps-accent)',
              borderRadius: 'var(--fps-rounded-md)',
              boxShadow: '0 0 8px rgba(74,222,128,0.38)',
              cursor: 'pointer',
              color: 'var(--fps-bg-dark)',
            }}
          >
            <Crosshair size={20} />
            <span style={{ fontFamily: 'var(--fps-font-heading)', fontSize: 22, letterSpacing: 1 }}>
              {t('login_start')}
            </span>
          </button>

          <span style={{
            fontFamily: 'var(--fps-font-captions)', fontSize: 11,
            letterSpacing: 2, color: 'var(--fps-text-dim)', opacity: 0.5,
          }}>
            {t('login_version')}
          </span>
        </div>
      </div>
    </div>
  );
}