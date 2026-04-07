import { useState, useEffect, useCallback } from 'react';
import { useWindowStore } from '../../stores/windowStore';

interface MenuItem {
  label: string;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
  bold?: boolean;
  action?: () => void;
}

interface Menu {
  label: string;
  bold?: boolean;
  items: MenuItem[];
}

function useMenus(): Menu[] {
  const { openWindow, windows } = useWindowStore();

  const openFinder = (path: string, title: string) => {
    openWindow({
      id: `finder-${path}`,
      appId: 'finder',
      title,
      position: { x: Math.round((window.innerWidth - 800) / 2), y: Math.round((window.innerHeight - 500) / 2) - 20 },
      size: { width: 800, height: 500 },
      props: { currentPath: path },
    });
  };

  const closeTopWindow = () => {
    const sorted = [...windows].sort((a, b) => b.zIndex - a.zIndex);
    const top = sorted.find((w) => w.isOpen && !w.isMinimized);
    if (top) useWindowStore.getState().closeWindow(top.id);
  };

  const minimizeTopWindow = () => {
    const sorted = [...windows].sort((a, b) => b.zIndex - a.zIndex);
    const top = sorted.find((w) => w.isOpen && !w.isMinimized);
    if (top) useWindowStore.getState().minimizeWindow(top.id);
  };

  const maximizeTopWindow = () => {
    const sorted = [...windows].sort((a, b) => b.zIndex - a.zIndex);
    const top = sorted.find((w) => w.isOpen && !w.isMinimized);
    if (top) useWindowStore.getState().maximizeWindow(top.id);
  };

  return [
    {
      label: 'Finder',
      bold: true,
      items: [
        { label: 'About Finder', bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: 'Hide Finder', shortcut: '⌘H' },
        { label: 'Hide Others', shortcut: '⌥⌘H' },
      ],
    },
    {
      label: 'File',
      items: [
        { label: 'New Finder Window', shortcut: '⌘N', action: () => openFinder('desktop', 'Desktop') },
        { label: '', separator: true },
        { label: 'Close Window', shortcut: '⌘W', action: closeTopWindow },
        { label: '', separator: true },
        { label: 'Get Info', shortcut: '⌘I' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', disabled: true },
        { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
        { label: '', separator: true },
        { label: 'Cut', shortcut: '⌘X', disabled: true },
        { label: 'Copy', shortcut: '⌘C', disabled: true },
        { label: 'Paste', shortcut: '⌘V', disabled: true },
        { label: 'Select All', shortcut: '⌘A', disabled: true },
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
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: maximizeTopWindow },
      ],
    },
    {
      label: 'Go',
      items: [
        { label: 'Desktop', shortcut: '⇧⌘D', action: () => openFinder('desktop', 'Desktop') },
        { label: 'Documents', shortcut: '⇧⌘O', action: () => openFinder('documents', 'Documents') },
        { label: 'Downloads', shortcut: '⌥⌘L', action: () => openFinder('downloads', 'Downloads') },
      ],
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', action: minimizeTopWindow },
        { label: 'Zoom', action: maximizeTopWindow },
        { label: '', separator: true },
        { label: 'Close Window', shortcut: '⌘W', action: closeTopWindow },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'macOS Help' },
        { label: '', separator: true },
        { label: 'Portfolio by JUNG, HYUNWOO', disabled: true },
        { label: 'Built with React + TypeScript', disabled: true },
        { label: 'Powered by Claude Code', disabled: true },
      ],
    },
  ];
}

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menus = useMenus();

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

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.disabled) return;
    if (item.action) item.action();
    setOpenMenu(null);
  }, []);

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
                      className="context-menu-item"
                      style={{
                        fontWeight: item.bold ? 600 : 400,
                        opacity: item.disabled ? 0.4 : 1,
                        pointerEvents: item.disabled ? 'none' : undefined,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item);
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
