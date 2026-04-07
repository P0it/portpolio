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

export default function Safari() {
  const [url, setUrl] = useState('about:favorites');

  return (
    <div className="h-full flex flex-col" style={{ background: '#1e1e1e' }}>
      {/* URL Bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(45,45,45,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div className="flex-1 flex items-center px-3 py-1 rounded-md text-[12px]" style={{ background: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.5)' }}>
          <span style={{ marginRight: 6 }}>🔒</span>
          <span>{url}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8" style={{ background: '#2a2a2a' }}>
        <h2 className="text-center text-white/40 text-sm mb-6">Favorites</h2>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {bookmarks.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors"
              style={{ cursor: 'pointer' }}
              onClick={() => setUrl(b.url)}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                {b.icon}
              </div>
              <span className="text-[11px] text-white/60 text-center">{b.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/20 text-xs">
            {profile.name}'s Developer Bookmarks
          </p>
        </div>
      </div>
    </div>
  );
}
