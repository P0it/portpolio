import { useState, useEffect, useRef } from 'react';

const playlist = [
  { title: 'npm install', artist: 'The Dependencies', duration: '3:42', bpm: 120 },
  { title: 'git push --force', artist: 'Dangerous Commits', duration: '2:18', bpm: 140 },
  { title: 'undefined is not a function', artist: 'Runtime Error', duration: '4:04', bpm: 90 },
  { title: 'It Works On My Machine', artist: 'Docker & The Containers', duration: '3:15', bpm: 110 },
  { title: 'Async Await', artist: 'Promise Fulfilled', duration: '5:00', bpm: 100 },
  { title: '404 Not Found', artist: 'Missing Routes', duration: '0:00', bpm: 0 },
  { title: 'Stack Overflow (ft. Copy Paste)', artist: 'Every Developer', duration: '2:30', bpm: 130 },
  { title: 'Merge Conflicts', artist: 'Team Collaboration', duration: '99:99', bpm: 160 },
];

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setCurrentTrack((t) => (t + 1) % playlist.length);
            return 0;
          }
          return p + 0.5;
        });
      }, 100);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const track = playlist[currentTrack];

  return (
    <div className="h-full flex flex-col rounded-b-[10px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      {/* Now Playing */}
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '24px 32px' }}>
        {/* Album Art */}
        <div
          className="w-48 h-48 rounded-lg mb-6 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, hsl(${currentTrack * 45}, 70%, 40%), hsl(${currentTrack * 45 + 60}, 70%, 30%))`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          }}
        >
          <span className="text-6xl">
            {['🎵', '🎸', '💥', '🐳', '⏳', '🔍', '📋', '💀'][currentTrack]}
          </span>
        </div>

        <div className="text-center mb-4">
          <div className="text-white text-[15px] font-semibold">{track.title}</div>
          <div className="text-white/50 text-[12px] mt-1">{track.artist}</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-white/60 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-white/30">
            <span>{Math.floor(progress / 100 * 3)}:{String(Math.floor((progress / 100 * 222) % 60)).padStart(2, '0')}</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 mt-4">
          <button
            className="text-white/60 hover:text-white text-lg"
            onClick={() => { setCurrentTrack((t) => (t - 1 + playlist.length) % playlist.length); setProgress(0); }}
          >
            ⏮
          </button>
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <span className="text-black text-lg">{isPlaying ? '⏸' : '▶'}</span>
          </button>
          <button
            className="text-white/60 hover:text-white text-lg"
            onClick={() => { setCurrentTrack((t) => (t + 1) % playlist.length); setProgress(0); }}
          >
            ⏭
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="border-t border-white/10 overflow-y-auto" style={{ maxHeight: 160 }}>
        {playlist.map((t, i) => (
          <div
            key={i}
            className="flex items-center hover:bg-white/5 transition-colors"
            style={{ padding: '10px 24px', cursor: 'default', background: i === currentTrack ? 'rgba(255,255,255,0.05)' : undefined }}
            onClick={() => { setCurrentTrack(i); setProgress(0); }}
          >
            <span className="text-[11px] text-white/30" style={{ width: 20 }}>{i === currentTrack && isPlaying ? '♪' : i + 1}</span>
            <div className="flex-1" style={{ marginLeft: 12 }}>
              <div className={`text-[12px] ${i === currentTrack ? 'text-blue-400' : 'text-white/80'}`}>{t.title}</div>
              <div className="text-[10px] text-white/40">{t.artist}</div>
            </div>
            <span className="text-[10px] text-white/30">{t.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
