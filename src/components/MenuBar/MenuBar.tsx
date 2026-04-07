import { useState, useEffect, useCallback } from 'react';

interface MenuItem {
  label: string;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
  bold?: boolean;
}

interface Menu {
  label: string;
  bold?: boolean;
  items: MenuItem[];
}

const menus: Menu[] = [
  {
    label: 'Finder',
    bold: true,
    items: [
      { label: 'About Finder', bold: true },
      { label: '', separator: true },
      { label: 'Settings...', shortcut: '⌘,' },
      { label: '', separator: true },
      { label: 'Empty Trash...', shortcut: '⇧⌘⌫' },
      { label: '', separator: true },
      { label: 'Hide Finder', shortcut: '⌘H' },
      { label: 'Hide Others', shortcut: '⌥⌘H' },
    ],
  },
  {
    label: 'File',
    items: [
      { label: 'New Finder Window', shortcut: '⌘N' },
      { label: 'New Folder', shortcut: '⇧⌘N' },
      { label: 'New Tab', shortcut: '⌘T' },
      { label: '', separator: true },
      { label: 'Open', shortcut: '⌘O' },
      { label: 'Close Window', shortcut: '⌘W' },
      { label: '', separator: true },
      { label: 'Get Info', shortcut: '⌘I' },
      { label: 'Rename' },
      { label: '', separator: true },
      { label: 'Move to Trash', shortcut: '⌘⌫' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: '⌘Z' },
      { label: 'Redo', shortcut: '⇧⌘Z' },
      { label: '', separator: true },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' },
      { label: 'Select All', shortcut: '⌘A' },
      { label: '', separator: true },
      { label: 'Find...', shortcut: '⌘F' },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'as Icons', shortcut: '⌘1' },
      { label: 'as List', shortcut: '⌘2' },
      { label: 'as Columns', shortcut: '⌘3' },
      { label: 'as Gallery', shortcut: '⌘4' },
      { label: '', separator: true },
      { label: 'Show Path Bar', shortcut: '⌥⌘P' },
      { label: 'Show Status Bar', shortcut: '⌘/' },
      { label: 'Show Sidebar', shortcut: '⌥⌘S' },
      { label: '', separator: true },
      { label: 'Enter Full Screen', shortcut: '⌃⌘F' },
    ],
  },
  {
    label: 'Go',
    items: [
      { label: 'Back', shortcut: '⌘[' },
      { label: 'Forward', shortcut: '⌘]' },
      { label: '', separator: true },
      { label: 'Recents', shortcut: '⇧⌘F' },
      { label: 'Documents', shortcut: '⇧⌘O' },
      { label: 'Desktop', shortcut: '⇧⌘D' },
      { label: 'Downloads', shortcut: '⌥⌘L' },
      { label: 'Home', shortcut: '⇧⌘H' },
      { label: '', separator: true },
      { label: 'Go to Folder...', shortcut: '⇧⌘G' },
    ],
  },
  {
    label: 'Window',
    items: [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom' },
      { label: '', separator: true },
      { label: 'Bring All to Front' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'macOS Help' },
      { label: '', separator: true },
      { label: 'This is a portfolio by JUNG, HYUNWOO', disabled: true },
      { label: 'Built with React + TypeScript', disabled: true },
    ],
  },
];

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (openMenu) {
      const handler = () => setOpenMenu(null);
      window.addEventListener('click', handler);
      return () => window.removeEventListener('click', handler);
    }
  }, [openMenu]);

  const toggleMenu = useCallback((label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu((prev) => (prev === label ? null : label));
  }, []);

  const handleMenuHover = useCallback((label: string) => {
    if (openMenu) setOpenMenu(label);
  }, [openMenu]);

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
      <div className="flex items-center" style={{ gap: 0 }}>
        {/* Apple Menu */}
        <div className="relative">
          <button
            className="flex items-center opacity-90 hover:opacity-100"
            style={{ padding: '0 10px', height: 25, borderRadius: 4, background: openMenu === 'apple' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={(e) => toggleMenu('apple', e)}
            onMouseEnter={() => handleMenuHover('apple')}
          >
            <img src="/icons/apple-logo.png" alt="Apple" width={14} height={17} style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} draggable={false} />
          </button>
          {openMenu === 'apple' && (
            <div className="context-menu absolute top-[25px] left-0" style={{ minWidth: 240 }}>
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

        {/* App Menus */}
        {menus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              className="text-[13px] text-white"
              style={{
                padding: '0 10px',
                height: 25,
                borderRadius: 4,
                fontWeight: menu.bold ? 600 : 400,
                opacity: menu.bold ? 1 : 0.85,
                background: openMenu === menu.label ? 'rgba(255,255,255,0.15)' : undefined,
              }}
              onClick={(e) => toggleMenu(menu.label, e)}
              onMouseEnter={() => handleMenuHover(menu.label)}
            >
              {menu.label}
            </button>
            {openMenu === menu.label && (
              <div className="context-menu absolute top-[25px] left-0" style={{ minWidth: 240 }}>
                {menu.items.map((item, i) =>
                  item.separator ? (
                    <div key={i} className="context-menu-separator" />
                  ) : (
                    <div
                      key={i}
                      className={`context-menu-item ${item.disabled ? '' : ''}`}
                      style={{
                        fontWeight: item.bold ? 600 : 400,
                        opacity: item.disabled ? 0.4 : 1,
                        pointerEvents: item.disabled ? 'none' : undefined,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span style={{ fontSize: 12, opacity: 0.5, marginLeft: 24 }}>{item.shortcut}</span>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center shrink-0" style={{ gap: 18 }}>
        <img src="/icons/battery.png" alt="Battery" className="opacity-80" style={{ height: 12, width: 'auto', filter: 'brightness(0) invert(1)' }} draggable={false} />
        <img src="/icons/wifi.png" alt="WiFi" className="opacity-80" style={{ height: 12, width: 12, filter: 'brightness(0) invert(1)' }} draggable={false} />
        <img src="/icons/search.png" alt="Spotlight" className="opacity-80" style={{ height: 14, width: 14, filter: 'brightness(0) invert(1)' }} draggable={false} />
        <img src="/icons/control-center.png" alt="Control Center" className="opacity-80" style={{ height: 14, width: 14, filter: 'brightness(0) invert(1)' }} draggable={false} />
        <span className="text-[12.5px] tracking-tight whitespace-nowrap">{formattedTime}</span>
      </div>
    </div>
  );
}
