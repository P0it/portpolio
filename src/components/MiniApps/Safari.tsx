import { useState } from 'react';
import { profile } from '../../data/profile';

const bookmarks = [
  { name: 'GitHub', url: profile.githubUrl, icon: '🐙' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
  { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '📖' },
  { name: 'npm', url: 'https://npmjs.com', icon: '📦' },
  { name: 'TypeScript', url: 'https://typescriptlang.org', icon: '🔷' },
  { name: 'React', url: 'https://react.dev', icon: '⚛️' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com', icon: '🎨' },
  { name: 'Vercel', url: 'https://vercel.com', icon: '▲' },
];

function normalizeUrl(input: string): string {
  const u = input.trim();
  if (!u) return '';
  if (/^[a-zA-Z0-9].*\..+/.test(u) && !u.startsWith('http')) return 'https://' + u;
  if (!u.startsWith('http://') && !u.startsWith('https://')) {
    return `https://www.google.com/search?q=${encodeURIComponent(u)}`;
  }
  return u;
}

export default function Safari() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = normalizeUrl(inputValue);
    if (url) {
      window.open(url, '_blank');
      setInputValue('');
    }
  };

  const openBookmark = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="h-full flex flex-col rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* URL Bar */}
      <div className="flex items-center shrink-0" style={{ background: 'rgba(45,45,45,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '8px 16px', gap: 10 }}>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search or enter website name — opens in new tab"
            className="w-full rounded-lg text-[13px] outline-none"
            style={{
              background: 'rgba(0,0,0,0.3)',
              color: 'rgba(255,255,255,0.8)',
              padding: '8px 16px',
              border: '1px solid transparent',
              textAlign: 'center',
            }}
            onFocus={(e) => e.target.select()}
          />
        </form>
      </div>

      {/* Favorites */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center" style={{ background: '#2a2a2a' }}>
        <div className="w-full max-w-xl px-8">
          <h2 className="text-center text-white/40 text-sm mb-8">Favorites</h2>
          <div className="grid grid-cols-4 gap-4">
            {bookmarks.map((b) => (
              <div
                key={b.name}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
                style={{ cursor: 'pointer' }}
                onClick={() => openBookmark(b.url)}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  {b.icon}
                </div>
                <span className="text-[12px] text-white/60 text-center">{b.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/20 text-[12px]">
              {profile.name}'s Developer Bookmarks — opens in new tab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
