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
    <div className="h-full flex flex-col rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* URL Bar */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ background: 'rgba(45,45,45,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div className="flex-1 flex items-center px-4 py-1.5 rounded-lg text-[13px]" style={{ background: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.5)' }}>
          <span style={{ marginRight: 8 }}>🔒</span>
          <span>{url}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10" style={{ background: '#2a2a2a' }}>
        <h2 className="text-center text-white/40 text-sm mb-8">Favorites</h2>
        <div className="grid grid-cols-4 gap-6 max-w-lg mx-auto">
          {bookmarks.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
              style={{ cursor: 'pointer' }}
              onClick={() => setUrl(b.url)}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                {b.icon}
              </div>
              <span className="text-[12px] text-white/60 text-center">{b.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/20 text-[12px]">
            {profile.name}'s Developer Bookmarks
          </p>
        </div>
      </div>
    </div>
  );
}
