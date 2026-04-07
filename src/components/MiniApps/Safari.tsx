import { useState, useCallback } from 'react';
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
  let u = input.trim();
  if (!u) return '';
  // If it looks like a URL (has dot), add https://
  if (/^[a-zA-Z0-9].*\..+/.test(u) && !u.startsWith('http')) {
    u = 'https://' + u;
  }
  // If it doesn't look like a URL, treat as Google search
  if (!u.startsWith('http://') && !u.startsWith('https://')) {
    u = `https://www.google.com/search?igu=1&q=${encodeURIComponent(u)}`;
  }
  return u;
}

export default function Safari() {
  const [inputValue, setInputValue] = useState('');
  const [activeUrl, setActiveUrl] = useState(''); // empty = show favorites
  const [loading, setLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const navigate = useCallback((url: string) => {
    const normalized = normalizeUrl(url);
    if (!normalized) return;
    setActiveUrl(normalized);
    setInputValue(normalized);
    setLoading(true);
    setIframeError(false);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputValue);
  }, [inputValue, navigate]);

  const goHome = useCallback(() => {
    setActiveUrl('');
    setInputValue('');
    setIframeError(false);
  }, []);

  return (
    <div className="h-full flex flex-col rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* URL Bar */}
      <div className="flex items-center shrink-0" style={{ background: 'rgba(45,45,45,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '8px 16px', gap: 10 }}>
        {/* Navigation Buttons */}
        <div className="flex items-center shrink-0" style={{ gap: 6 }}>
          <button
            onClick={goHome}
            className="hover:bg-white/10 rounded"
            style={{ padding: '4px 8px', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
          >
            ◁
          </button>
          <button
            className="rounded"
            style={{ padding: '4px 8px', color: 'rgba(255,255,255,0.25)', fontSize: 14 }}
          >
            ▷
          </button>
        </div>

        {/* URL Input */}
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search or enter website name"
            className="w-full rounded-lg text-[13px] outline-none"
            style={{
              background: 'rgba(0,0,0,0.3)',
              color: 'rgba(255,255,255,0.8)',
              padding: '8px 16px',
              border: '1px solid transparent',
              textAlign: activeUrl ? 'left' : 'center',
            }}
            onFocus={(e) => e.target.select()}
          />
        </form>

        {/* Share button */}
        <button
          className="hover:bg-white/10 rounded shrink-0"
          style={{ padding: '4px 8px', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
          onClick={() => {
            if (activeUrl) window.open(activeUrl, '_blank');
          }}
          title="Open in new tab"
        >
          ↗
        </button>
      </div>

      {/* Content */}
      {activeUrl ? (
        <div className="flex-1 relative" style={{ background: 'white' }}>
          {loading && !iframeError && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#f5f5f5', zIndex: 1 }}>
              <div className="text-center">
                <div className="animate-spin" style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13, color: '#888' }}>Loading...</div>
              </div>
            </div>
          )}
          {iframeError ? (
            <div className="h-full flex items-center justify-center" style={{ background: '#2a2a2a' }}>
              <div className="text-center" style={{ maxWidth: 400 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontWeight: 600 }}>
                  Cannot Display This Page
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 20 }}>
                  This website doesn't allow being displayed in an embedded frame. This is a security feature used by most websites.
                </div>
                <div className="flex justify-center" style={{ gap: 12 }}>
                  <button
                    onClick={() => window.open(activeUrl, '_blank')}
                    className="rounded-lg hover:opacity-90"
                    style={{ background: '#007aff', color: 'white', padding: '8px 20px', fontSize: 13, cursor: 'pointer' }}
                  >
                    Open in Real Browser ↗
                  </button>
                  <button
                    onClick={goHome}
                    className="rounded-lg hover:opacity-90"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '8px 20px', fontSize: 13, cursor: 'pointer' }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={activeUrl}
              className="w-full h-full border-none"
              title="Safari Browser"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setLoading(false)}
              onError={() => { setLoading(false); setIframeError(true); }}
            />
          )}
        </div>
      ) : (
        /* Favorites Page */
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center" style={{ background: '#2a2a2a' }}>
          <div className="w-full max-w-xl px-8">
            <h2 className="text-center text-white/40 text-sm mb-8">Favorites</h2>
            <div className="grid grid-cols-4 gap-4">
              {bookmarks.map((b) => (
                <div
                  key={b.name}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(b.url)}
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
                {profile.name}'s Developer Bookmarks
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
