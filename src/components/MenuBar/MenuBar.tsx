import { useState, useEffect } from 'react';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (appleMenuOpen) {
      const handler = () => setAppleMenuOpen(false);
      window.addEventListener('click', handler);
      return () => window.removeEventListener('click', handler);
    }
  }, [appleMenuOpen]);

  const formattedTime = time.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="menu-bar fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-4">
      {/* Left side */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <button
            className="flex items-center opacity-90 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setAppleMenuOpen(!appleMenuOpen);
            }}
          >
            <svg width="14" height="17" viewBox="0 0 814 1000" fill="white">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.3-105.9-207.4-105.9-329.5C0 383.2 65.3 230 177.6 153.2c56.3-38.5 124.7-63.2 197.8-63.2 67.4 0 126.2 42.8 170 42.8 42.2 0 108.2-45.4 184-45.4 29.7 0 136.4 1.8 207.1 70.5zM571 0c11.5 47.9-13.4 97.2-44.1 133.2-30.7 36.1-81.6 64.2-130.6 64.2-5.8-40.8 14.7-97.8 44.1-133.2C470.1 27.3 525.9 0 571 0z" />
            </svg>
          </button>
          {appleMenuOpen && (
            <div className="context-menu absolute top-[25px] left-0">
              <div className="context-menu-item font-semibold">About This Mac</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item">System Settings...</div>
              <div className="context-menu-item">App Store...</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item">Recent Items</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item">Force Quit...</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item">Sleep</div>
              <div className="context-menu-item">Restart...</div>
              <div className="context-menu-item">Shut Down...</div>
            </div>
          )}
        </div>
        <span className="font-semibold text-[13px]">Finder</span>
        <span className="text-[13px] opacity-80">File</span>
        <span className="text-[13px] opacity-80">Edit</span>
        <span className="text-[13px] opacity-80">View</span>
        <span className="text-[13px] opacity-80">Go</span>
        <span className="text-[13px] opacity-80">Window</span>
        <span className="text-[13px] opacity-80">Help</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Battery */}
        <svg width="22" height="12" viewBox="0 0 25 12" fill="none" className="opacity-80">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="white" strokeWidth="1" />
          <rect x="22" y="3.5" width="2" height="5" rx="1" fill="white" fillOpacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="1" fill="white" fillOpacity="0.8" />
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white" className="opacity-80">
          <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.76 7.28a6.014 6.014 0 018.49 0l-.71.71a5.013 5.013 0 00-7.07 0l-.71-.71zM1.4 4.9a9.02 9.02 0 0113.2 0l-.71.71a8.017 8.017 0 00-11.78 0L1.4 4.9z" transform="translate(0, -3)" />
        </svg>

        {/* Search/Spotlight */}
        <svg width="14" height="14" viewBox="0 0 20 20" fill="white" className="opacity-80">
          <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z" />
        </svg>

        {/* Control Center */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="opacity-80">
          <path d="M12 3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1V4c0-.55.45-1 1-1zm0 14c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1zm9-5c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1zM7 12c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1z" />
        </svg>

        {/* Date & Time */}
        <span className="text-[12.5px] tracking-tight">{formattedTime}</span>
      </div>
    </div>
  );
}
