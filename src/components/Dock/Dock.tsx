import { useWindowStore } from '../../stores/windowStore';

interface DockApp {
  id: string;
  name: string;
  icon: string;
  action?: () => void;
}

export default function Dock() {
  const { windows, openWindow } = useWindowStore();

  const apps: DockApp[] = [
    {
      id: 'finder',
      name: 'Finder',
      icon: 'finder',
      action: () => {
        openWindow({
          id: 'finder-desktop',
          appId: 'finder',
          title: 'Desktop',
          position: { x: 100, y: 60 },
          size: { width: 800, height: 500 },
          props: { currentPath: 'desktop' },
        });
      },
    },
    { id: 'safari', name: 'Safari', icon: 'safari' },
    { id: 'messages', name: 'Messages', icon: 'messages' },
    { id: 'mail', name: 'Mail', icon: 'mail' },
    { id: 'maps', name: 'Maps', icon: 'maps' },
    { id: 'photos', name: 'Photos', icon: 'photos' },
    { id: 'notes', name: 'Notes', icon: 'notes' },
    { id: 'music', name: 'Music', icon: 'music' },
    { id: 'settings', name: 'System Settings', icon: 'settings' },
  ];

  const isRunning = (appId: string) =>
    windows.some((w) => w.appId === appId || (appId === 'finder' && w.appId === 'finder'));

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div className="dock-container flex items-end gap-[2px]">
        {apps.map((app, index) => (
          <div key={app.id}>
            <div
              className="dock-item flex flex-col items-center cursor-default"
              onClick={app.action}
              title={app.name}
            >
              <div className="w-[48px] h-[48px] flex items-center justify-center">
                <DockIcon icon={app.icon} />
              </div>
              {isRunning(app.id) && (
                <div className="w-1 h-1 rounded-full bg-white/80 mt-[1px]" />
              )}
            </div>
            {index === 0 && (
              <div className="hidden" /> /* Separator after Finder could go here */
            )}
          </div>
        ))}

        {/* Separator */}
        <div className="w-[1px] h-[40px] bg-white/20 mx-1 self-center" />

        {/* Trash */}
        <div className="dock-item flex flex-col items-center cursor-default" title="Trash">
          <div className="w-[48px] h-[48px] flex items-center justify-center">
            <DockIcon icon="trash" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DockIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, { bg: string; emoji: string }> = {
    finder: { bg: 'linear-gradient(135deg, #1a9fff, #0066ff)', emoji: '' },
    safari: { bg: 'linear-gradient(135deg, #00d4ff, #0066ff)', emoji: '' },
    messages: { bg: 'linear-gradient(135deg, #5cf64a, #05c046)', emoji: '' },
    mail: { bg: 'linear-gradient(135deg, #42a5f5, #1565c0)', emoji: '' },
    maps: { bg: 'linear-gradient(135deg, #66bb6a, #2e7d32)', emoji: '' },
    photos: { bg: 'linear-gradient(135deg, #ff9800, #f44336, #9c27b0, #2196f3)', emoji: '' },
    notes: { bg: 'linear-gradient(135deg, #fff9c4, #fff176)', emoji: '' },
    music: { bg: 'linear-gradient(135deg, #ff5252, #e91e63)', emoji: '' },
    settings: { bg: 'linear-gradient(135deg, #78909c, #546e7a)', emoji: '' },
    trash: { bg: 'linear-gradient(135deg, #9e9e9e, #616161)', emoji: '' },
  };

  const data = iconMap[icon] || { bg: '#666', emoji: '?' };

  // Finder icon - special design
  if (icon === 'finder') {
    return (
      <div
        className="w-[46px] h-[46px] rounded-[11px] flex items-center justify-center"
        style={{ background: data.bg }}
      >
        <svg width="28" height="30" viewBox="0 0 32 34" fill="none">
          {/* Finder face */}
          <rect x="2" y="0" width="28" height="34" rx="4" fill="none" />
          <circle cx="11" cy="14" r="2.5" fill="white" />
          <circle cx="21" cy="14" r="2.5" fill="white" />
          <path d="M10 22 C10 22 12 26 16 26 C20 26 22 22 22 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <line x1="16" y1="4" x2="16" y2="10" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // Trash icon
  if (icon === 'trash') {
    return (
      <div
        className="w-[46px] h-[46px] rounded-[11px] flex items-center justify-center"
        style={{ background: data.bg }}
      >
        <svg width="24" height="28" viewBox="0 0 24 28" fill="white" fillOpacity="0.9">
          <path d="M8 2h8v2H8V2zM3 6h18v1H3V6zm2 2h14l-1.5 18h-11L5 8zm4 2v14h1V10H9zm3 0v14h1V10h-1zm3 0v14h1V10h-1z" />
        </svg>
      </div>
    );
  }

  // Generic app icons
  const symbolMap: Record<string, React.ReactNode> = {
    safari: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" fillOpacity="0.95">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M6.5 17.5l5-10 5 10-10-5z" fillOpacity="0.9" />
      </svg>
    ),
    messages: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" fillOpacity="0.95">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
    mail: (
      <svg width="24" height="20" viewBox="0 0 24 20" fill="white" fillOpacity="0.95">
        <path d="M22 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4l-10 6L2 4V2l10 6 10-6v2z" />
      </svg>
    ),
    maps: (
      <svg width="22" height="26" viewBox="0 0 20 24" fill="white" fillOpacity="0.95">
        <path d="M10 0C4.48 0 0 4.48 0 10c0 7 10 14 10 14s10-7 10-14c0-5.52-4.48-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      </svg>
    ),
    photos: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" fillOpacity="0.95">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
    notes: (
      <svg width="22" height="24" viewBox="0 0 22 24" fill="#8D6E00" fillOpacity="0.8">
        <path d="M2 0h18c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0z" />
        <line x1="5" y1="8" x2="17" y2="8" stroke="#B8860B" strokeWidth="1" />
        <line x1="5" y1="12" x2="17" y2="12" stroke="#B8860B" strokeWidth="1" />
        <line x1="5" y1="16" x2="13" y2="16" stroke="#B8860B" strokeWidth="1" />
      </svg>
    ),
    music: (
      <svg width="22" height="24" viewBox="0 0 24 24" fill="white" fillOpacity="0.95">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
    settings: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" fillOpacity="0.95">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    ),
  };

  return (
    <div
      className="w-[46px] h-[46px] rounded-[11px] flex items-center justify-center"
      style={{ background: data.bg }}
    >
      {symbolMap[icon] || <span className="text-2xl">{data.emoji}</span>}
    </div>
  );
}
