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
    <div className="h-full flex flex-col rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-center border-b border-white/10 shrink-0" style={{ background: 'rgba(45,45,45,0.95)', padding: '10px 24px', gap: 32 }}>
        {['Years', 'Months', 'Days', 'All Photos'].map((tab, i) => (
          <span
            key={tab}
            className="text-[13px] rounded"
            style={{ padding: '4px 12px', ...(i === 3 ? { background: 'rgba(255,255,255,0.12)', color: 'white' } : { color: 'rgba(255,255,255,0.5)' }) }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 28px' }}>
        <div className="text-[12px] text-white/40" style={{ marginBottom: 12 }}>My Tech Stack Gallery</div>
        <div className="grid grid-cols-4" style={{ gap: 12 }}>
          {photos.map((photo) => (
            <div
              key={photo.label}
              className="aspect-square rounded-lg flex flex-col items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: photo.color + '33', cursor: 'default', gap: 8 }}
            >
              <span style={{ fontSize: 32 }}>{photo.icon}</span>
              <span className="text-[11px] text-white/70">{photo.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center text-[12px] text-white/20" style={{ marginTop: 28 }}>
          {photos.length} Technologies · All Time
        </div>
      </div>
    </div>
  );
}
