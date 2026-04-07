const photos = [
  { color: '#ff6b6b', label: 'React', icon: '⚛️' },
  { color: '#4ecdc4', label: 'Node.js', icon: '🟢' },
  { color: '#45b7d1', label: 'TypeScript', icon: '🔷' },
  { color: '#96ceb4', label: 'Docker', icon: '🐳' },
  { color: '#ffeaa7', label: 'Python', icon: '🐍' },
  { color: '#dfe6e9', label: 'Go', icon: '🔵' },
  { color: '#a29bfe', label: 'GraphQL', icon: '◈' },
  { color: '#fd79a8', label: 'Redis', icon: '🔴' },
  { color: '#00b894', label: 'MongoDB', icon: '🍃' },
  { color: '#e17055', label: 'Rust', icon: '🦀' },
  { color: '#0984e3', label: 'PostgreSQL', icon: '🐘' },
  { color: '#6c5ce7', label: 'Kubernetes', icon: '☸️' },
];

export default function Photos() {
  return (
    <div className="h-full flex flex-col" style={{ background: '#1e1e1e' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-center gap-6 px-4 py-2 border-b border-white/10" style={{ background: 'rgba(45,45,45,0.95)' }}>
        {['Years', 'Months', 'Days', 'All Photos'].map((tab, i) => (
          <span
            key={tab}
            className="text-[12px] px-2 py-0.5 rounded"
            style={i === 3 ? { background: 'rgba(255,255,255,0.12)', color: 'white' } : { color: 'rgba(255,255,255,0.5)' }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-[11px] text-white/40 mb-2 px-1">My Tech Stack Gallery</div>
        <div className="grid grid-cols-4 gap-1">
          {photos.map((photo) => (
            <div
              key={photo.label}
              className="aspect-square rounded-sm flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity"
              style={{ background: photo.color + '33', cursor: 'default' }}
            >
              <span className="text-3xl">{photo.icon}</span>
              <span className="text-[10px] text-white/70">{photo.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-[11px] text-white/20">
          {photos.length} Technologies · All Time
        </div>
      </div>
    </div>
  );
}
