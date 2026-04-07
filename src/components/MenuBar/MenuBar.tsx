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
    <div className="menu-bar fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between" style={{ padding: '0 20px' }}>
      {/* Left side */}
      <div className="flex items-center" style={{ gap: 20 }}>
        <div className="relative">
          <button
            className="flex items-center opacity-90 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setAppleMenuOpen(!appleMenuOpen);
            }}
          >
            <img src="/icons/apple-logo.png" alt="Apple" width={14} height={17} style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} draggable={false} />
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
      <div className="flex items-center shrink-0" style={{ gap: 18 }}>
        {/* Battery */}
        <img src="/icons/battery.png" alt="Battery" className="opacity-80" style={{ height: 12, width: 'auto', filter: 'brightness(0) invert(1)' }} draggable={false} />

        {/* WiFi */}
        <img src="/icons/wifi.png" alt="WiFi" className="opacity-80" style={{ height: 12, width: 12, filter: 'brightness(0) invert(1)' }} draggable={false} />

        {/* Search/Spotlight */}
        <img src="/icons/search.png" alt="Spotlight" className="opacity-80" style={{ height: 14, width: 14, filter: 'brightness(0) invert(1)' }} draggable={false} />

        {/* Control Center */}
        <img src="/icons/control-center.png" alt="Control Center" className="opacity-80" style={{ height: 14, width: 14, filter: 'brightness(0) invert(1)' }} draggable={false} />

        {/* Date & Time */}
        <span className="text-[12.5px] tracking-tight whitespace-nowrap">{formattedTime}</span>
      </div>
    </div>
  );
}
