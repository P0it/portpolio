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

const appNames: Record<string, string> = {
  finder: 'Finder',
  'pdf-viewer': 'Preview',
  iterm: 'iTerm2',
  resume: 'Pages',
  safari: 'Safari',
  messages: 'Messages',
  mail: 'Mail',
  photos: 'Photos',
  music: 'Music',
  vscode: 'Code',
};

function useActiveApp(): string {
  const windows = useWindowStore((s) => s.windows);
  const sorted = [...windows].sort((a, b) => b.zIndex - a.zIndex);
  const top = sorted.find((w) => w.isOpen && !w.isMinimized);
  return top?.appId || 'finder';
}

function useMenus(activeApp: string): Menu[] {
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

  const name = appNames[activeApp] || 'Finder';

  // Common menus shared by most apps
  const windowMenu: Menu = {
    label: 'Window',
    items: [
      { label: 'Minimize', shortcut: '⌘M', action: minimizeTopWindow },
      { label: 'Zoom', action: maximizeTopWindow },
      { label: '', separator: true },
      { label: 'Close Window', shortcut: '⌘W', action: closeTopWindow },
    ],
  };

  const helpMenu: Menu = {
    label: 'Help',
    items: [
      { label: `${name} Help` },
      { label: '', separator: true },
      { label: 'Portfolio by JUNG, HYUNWOO', disabled: true },
      { label: 'Built with React + TypeScript', disabled: true },
    ],
  };

  const editMenuDisabled: Menu = {
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
  };

  // App-specific menus
  const appMenus: Record<string, Menu[]> = {
    finder: [
      { label: name, bold: true, items: [
        { label: `About ${name}`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'New Finder Window', shortcut: '⌘N', action: () => openFinder('desktop', 'Desktop') },
        { label: '', separator: true },
        { label: 'Close Window', shortcut: '⌘W', action: closeTopWindow },
        { label: '', separator: true },
        { label: 'Get Info', shortcut: '⌘I' },
      ]},
      editMenuDisabled,
      { label: 'View', items: [
        { label: 'as Icons', shortcut: '⌘1' },
        { label: 'as List', shortcut: '⌘2' },
        { label: 'as Columns', shortcut: '⌘3' },
        { label: '', separator: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: maximizeTopWindow },
      ]},
      { label: 'Go', items: [
        { label: 'Desktop', shortcut: '⇧⌘D', action: () => openFinder('desktop', 'Desktop') },
        { label: 'Documents', shortcut: '⇧⌘O', action: () => openFinder('documents', 'Documents') },
        { label: 'Downloads', shortcut: '⌥⌘L', action: () => openFinder('downloads', 'Downloads') },
      ]},
      windowMenu,
      helpMenu,
    ],
    safari: [
      { label: name, bold: true, items: [
        { label: `About ${name}`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'New Window', shortcut: '⌘N' },
        { label: 'New Tab', shortcut: '⌘T' },
        { label: '', separator: true },
        { label: 'Close Tab', shortcut: '⌘W', action: closeTopWindow },
      ]},
      editMenuDisabled,
      { label: 'View', items: [
        { label: 'Show Reader', shortcut: '⇧⌘R' },
        { label: 'Show Sidebar', shortcut: '⇧⌘L' },
        { label: '', separator: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: maximizeTopWindow },
      ]},
      { label: 'History', items: [
        { label: 'Show All History', shortcut: '⌘Y' },
        { label: '', separator: true },
        { label: 'Recently Closed', disabled: true },
      ]},
      { label: 'Bookmarks', items: [
        { label: 'Show Bookmarks', shortcut: '⌘B' },
        { label: 'Add Bookmark...', shortcut: '⌘D' },
      ]},
      windowMenu,
      helpMenu,
    ],
    mail: [
      { label: name, bold: true, items: [
        { label: `About ${name}`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'New Message', shortcut: '⌘N' },
        { label: '', separator: true },
        { label: 'Close', shortcut: '⌘W', action: closeTopWindow },
      ]},
      editMenuDisabled,
      { label: 'View', items: [
        { label: 'Show Mailbox List' },
        { label: 'Show Favorites Bar', shortcut: '⇧⌘F' },
        { label: '', separator: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: maximizeTopWindow },
      ]},
      { label: 'Mailbox', items: [
        { label: 'Get New Mail', shortcut: '⇧⌘N' },
        { label: '', separator: true },
        { label: 'Inbox' },
        { label: 'Sent' },
        { label: 'Drafts' },
        { label: 'Trash' },
      ]},
      { label: 'Message', items: [
        { label: 'Reply', shortcut: '⌘R' },
        { label: 'Reply All', shortcut: '⇧⌘R' },
        { label: 'Forward', shortcut: '⇧⌘F' },
        { label: '', separator: true },
        { label: 'Mark as Read', shortcut: '⌘⇧U' },
        { label: 'Move to Trash', shortcut: '⌘⌫' },
      ]},
      windowMenu,
      helpMenu,
    ],
    messages: [
      { label: name, bold: true, items: [
        { label: `About ${name}`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'New Message', shortcut: '⌘N' },
        { label: '', separator: true },
        { label: 'Close', shortcut: '⌘W', action: closeTopWindow },
      ]},
      editMenuDisabled,
      { label: 'Conversation', items: [
        { label: 'Send', shortcut: '↩' },
        { label: '', separator: true },
        { label: 'Delete Conversation...' },
      ]},
      windowMenu,
      helpMenu,
    ],
    music: [
      { label: name, bold: true, items: [
        { label: `About ${name}`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'New Playlist', shortcut: '⌘N' },
        { label: '', separator: true },
        { label: 'Close', shortcut: '⌘W', action: closeTopWindow },
      ]},
      editMenuDisabled,
      { label: 'Controls', items: [
        { label: 'Play / Pause', shortcut: 'Space' },
        { label: 'Next', shortcut: '⌘→' },
        { label: 'Previous', shortcut: '⌘←' },
        { label: '', separator: true },
        { label: 'Increase Volume', shortcut: '⌘↑' },
        { label: 'Decrease Volume', shortcut: '⌘↓' },
      ]},
      windowMenu,
      helpMenu,
    ],
    vscode: [
      { label: name, bold: true, items: [
        { label: `About Visual Studio Code`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'New File', shortcut: '⌘N' },
        { label: 'Open File...', shortcut: '⌘O' },
        { label: '', separator: true },
        { label: 'Save', shortcut: '⌘S' },
        { label: 'Save As...', shortcut: '⇧⌘S' },
        { label: '', separator: true },
        { label: 'Close Editor', shortcut: '⌘W', action: closeTopWindow },
      ]},
      editMenuDisabled,
      { label: 'Selection', items: [
        { label: 'Select All', shortcut: '⌘A' },
        { label: 'Expand Selection', shortcut: '⇧⌥→' },
        { label: 'Shrink Selection', shortcut: '⇧⌥←' },
      ]},
      { label: 'View', items: [
        { label: 'Command Palette...', shortcut: '⇧⌘P' },
        { label: 'Explorer', shortcut: '⇧⌘E' },
        { label: 'Search', shortcut: '⇧⌘F' },
        { label: 'Terminal', shortcut: '⌃`' },
        { label: '', separator: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: maximizeTopWindow },
      ]},
      { label: 'Go', items: [
        { label: 'Go to File...', shortcut: '⌘P' },
        { label: 'Go to Line...', shortcut: '⌃G' },
        { label: 'Go to Symbol...', shortcut: '⇧⌘O' },
      ]},
      { label: 'Terminal', items: [
        { label: 'New Terminal', shortcut: '⌃`' },
        { label: 'Split Terminal' },
      ]},
      windowMenu,
      helpMenu,
    ],
    photos: [
      { label: name, bold: true, items: [
        { label: `About ${name}`, bold: true },
        { label: '', separator: true },
        { label: 'Settings...', shortcut: '⌘,' },
        { label: '', separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H' },
      ]},
      { label: 'File', items: [
        { label: 'Import...', shortcut: '⇧⌘I' },
        { label: '', separator: true },
        { label: 'Close', shortcut: '⌘W', action: closeTopWindow },
      ]},
      editMenuDisabled,
      { label: 'Image', items: [
        { label: 'Rotate Clockwise', shortcut: '⌘R' },
        { label: 'Rotate Counter Clockwise', shortcut: '⌥⌘R' },
        { label: '', separator: true },
        { label: 'Duplicate', shortcut: '⌘D' },
      ]},
      windowMenu,
      helpMenu,
    ],
  };

  // Default menu for apps without specific menus
  const defaultMenus: Menu[] = [
    { label: name, bold: true, items: [
      { label: `About ${name}`, bold: true },
      { label: '', separator: true },
      { label: 'Settings...', shortcut: '⌘,' },
      { label: '', separator: true },
      { label: `Hide ${name}`, shortcut: '⌘H' },
    ]},
    { label: 'File', items: [
      { label: 'Close', shortcut: '⌘W', action: closeTopWindow },
    ]},
    editMenuDisabled,
    { label: 'View', items: [
      { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: maximizeTopWindow },
    ]},
    windowMenu,
    helpMenu,
  ];

  return appMenus[activeApp] || defaultMenus;
}

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const activeApp = useActiveApp();
  const menus = useMenus(activeApp);

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

  // Close menu when active app changes
  useEffect(() => {
    setOpenMenu(null);
  }, [activeApp]);

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

        {/* App Menus — changes based on active app */}
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
      <div className="flex items-center shrink-0" style={{ gap: 4 }}>
        {/* Battery */}
        <div className="relative">
          <button
            className="flex items-center justify-center opacity-80 hover:opacity-100"
            style={{ padding: '0 8px', height: 25, borderRadius: 4, background: openMenu === 'battery' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={(e) => toggleMenu('battery', e)}
            onMouseEnter={() => handleMenuHover('battery')}
          >
            <img src="/icons/battery.png" alt="Battery" style={{ height: 12, width: 'auto', filter: 'brightness(0) invert(1)' }} draggable={false} />
          </button>
          {openMenu === 'battery' && (
            <div className="context-menu absolute top-[25px] right-0" style={{ minWidth: 220 }}>
              <div className="context-menu-item" style={{ opacity: 0.5, pointerEvents: 'none' }}>Battery: 100%</div>
              <div className="context-menu-item" style={{ opacity: 0.5, pointerEvents: 'none' }}>Power Source: Charger</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item" style={{ opacity: 0.5, pointerEvents: 'none' }}>This is a simulated macOS</div>
            </div>
          )}
        </div>

        {/* WiFi */}
        <div className="relative">
          <button
            className="flex items-center justify-center opacity-80 hover:opacity-100"
            style={{ padding: '0 8px', height: 25, borderRadius: 4, background: openMenu === 'wifi' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={(e) => toggleMenu('wifi', e)}
            onMouseEnter={() => handleMenuHover('wifi')}
          >
            <img src="/icons/wifi.png" alt="WiFi" style={{ height: 12, width: 12, filter: 'brightness(0) invert(1)' }} draggable={false} />
          </button>
          {openMenu === 'wifi' && (
            <div className="context-menu absolute top-[25px] right-0" style={{ minWidth: 220 }}>
              <div className="context-menu-item font-semibold">Wi-Fi</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Portfolio-Network</span><span style={{ opacity: 0.4 }}>✓</span>
              </div>
              <div className="context-menu-item" style={{ opacity: 0.4, pointerEvents: 'none' }}>Developer-5G</div>
              <div className="context-menu-item" style={{ opacity: 0.4, pointerEvents: 'none' }}>Coffee-Shop-WiFi</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item">Network Settings...</div>
            </div>
          )}
        </div>

        {/* Spotlight */}
        <div className="relative">
          <button
            className="flex items-center justify-center opacity-80 hover:opacity-100"
            style={{ padding: '0 8px', height: 25, borderRadius: 4, background: openMenu === 'spotlight' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={(e) => toggleMenu('spotlight', e)}
            onMouseEnter={() => handleMenuHover('spotlight')}
          >
            <img src="/icons/search.png" alt="Spotlight" style={{ height: 14, width: 14, filter: 'brightness(0) invert(1)' }} draggable={false} />
          </button>
          {openMenu === 'spotlight' && (
            <div className="context-menu absolute top-[25px] right-0" style={{ minWidth: 260 }}>
              <div className="context-menu-item" style={{ opacity: 0.5, pointerEvents: 'none' }}>Spotlight Search</div>
              <div className="context-menu-separator" />
              <div className="context-menu-item" style={{ opacity: 0.4, pointerEvents: 'none', fontSize: 12 }}>
                Try clicking the apps in the Dock!
              </div>
            </div>
          )}
        </div>

        {/* Control Center */}
        <div className="relative">
          <button
            className="flex items-center justify-center opacity-80 hover:opacity-100"
            style={{ padding: '0 8px', height: 25, borderRadius: 4, background: openMenu === 'controlcenter' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={(e) => toggleMenu('controlcenter', e)}
            onMouseEnter={() => handleMenuHover('controlcenter')}
          >
            <img src="/icons/control-center.png" alt="Control Center" style={{ height: 14, width: 14, filter: 'brightness(0) invert(1)' }} draggable={false} />
          </button>
          {openMenu === 'controlcenter' && (
            <div className="context-menu absolute top-[25px] right-0" style={{ minWidth: 260, padding: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Wi-Fi</div>
                  <div style={{ fontSize: 13, color: 'white' }}>Connected</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Bluetooth</div>
                  <div style={{ fontSize: 13, color: 'white' }}>On</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>AirDrop</div>
                  <div style={{ fontSize: 13, color: 'white' }}>Everyone</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Focus</div>
                  <div style={{ fontSize: 13, color: 'white' }}>Off</div>
                </div>
              </div>
              <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Display</div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }}>
                  <div style={{ height: '100%', width: '75%', borderRadius: 2, background: 'white' }} />
                </div>
              </div>
              <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Sound</div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }}>
                  <div style={{ height: '100%', width: '50%', borderRadius: 2, background: 'white' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <span className="text-[12.5px] tracking-tight whitespace-nowrap" style={{ padding: '0 4px' }}>{formattedTime}</span>
      </div>
    </div>
  );
}
