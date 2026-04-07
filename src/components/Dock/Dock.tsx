import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import type { WindowState } from '../../types';

interface DockApp {
  id: string;
  name: string;
  icon: string;
  action: 'window' | 'link' | 'bounce';
  appId?: string;
  url?: string;
  windowConfig?: {
    title: string;
    size: { width: number; height: number };
    props?: Record<string, unknown>;
  };
}

const apps: DockApp[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: '/icons/finder.png',
    action: 'window',
    appId: 'finder',
    windowConfig: {
      title: 'Desktop',
      size: { width: 800, height: 500 },
      props: { currentPath: 'desktop' },
    },
  },
  { id: 'safari', name: 'Safari', icon: '/icons/safari.png', action: 'window', appId: 'safari', windowConfig: { title: 'Safari', size: { width: 850, height: 550 } } },
  { id: 'messages', name: 'Messages', icon: '/icons/messages.png', action: 'window', appId: 'messages', windowConfig: { title: 'Messages', size: { width: 700, height: 480 } } },
  { id: 'mail', name: 'Mail', icon: '/icons/mail.png', action: 'window', appId: 'mail', windowConfig: { title: 'Mail', size: { width: 1050, height: 600 } } },
  { id: 'photos', name: 'Photos', icon: '/icons/photos.png', action: 'window', appId: 'photos', windowConfig: { title: 'Photos', size: { width: 650, height: 500 } } },
  { id: 'music', name: 'Music', icon: '/icons/music.png', action: 'window', appId: 'music', windowConfig: { title: 'Music', size: { width: 500, height: 600 } } },
  { id: 'vscode', name: 'Visual Studio Code', icon: '/icons/vscode.png', action: 'window', appId: 'vscode', windowConfig: { title: 'Visual Studio Code', size: { width: 900, height: 600 } } },
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/github.png',
    action: 'link',
    url: 'https://github.com/P0it',
  },
  {
    id: 'iterm',
    name: 'iTerm',
    icon: '/icons/iterm.png',
    action: 'window',
    appId: 'iterm',
    windowConfig: {
      title: 'hyunwoo@portfolio ~ %',
      size: { width: 750, height: 620 },
    },
  },
];

const docItems: DockApp[] = [
  {
    id: 'readme',
    name: 'README.md',
    icon: '/icons/readme-file.png',
    action: 'window',
    appId: 'resume',
    windowConfig: {
      title: 'README.md',
      size: { width: 900, height: 600 },
    },
  },
];

export default function Dock() {
  const { windows, openWindow } = useWindowStore();
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const isRunning = (appId: string) =>
    windows.some((w) => w.appId === appId);

  const handleClick = (app: DockApp) => {
    if (app.action === 'window' && app.appId && app.windowConfig) {
      openWindow({
        id: `${app.appId}-main`,
        appId: app.appId as WindowState['appId'],
        title: app.windowConfig.title,
        position: {
          x: Math.round((window.innerWidth - app.windowConfig.size.width) / 2),
          y: Math.round((window.innerHeight - app.windowConfig.size.height) / 2) - 20,
        },
        size: app.windowConfig.size,
        props: app.windowConfig.props,
      });
    } else if (app.action === 'link' && app.url) {
      window.open(app.url, '_blank');
    } else if (app.action === 'bounce') {
      setBouncingId(app.id);
      setTimeout(() => setBouncingId(null), 600);
    }
  };

  const renderIcon = (app: DockApp) => (
    <div
      key={app.id}
      className="dock-item flex flex-col items-center cursor-default"
      onClick={() => handleClick(app)}
      title={app.name}
    >
      <motion.div
        className="w-[54px] h-[54px] flex items-center justify-center"
        animate={
          bouncingId === app.id
            ? { y: [0, -30, 0, -15, 0, -5, 0] }
            : { y: 0 }
        }
        transition={
          bouncingId === app.id
            ? { duration: 0.6, ease: 'easeInOut' }
            : undefined
        }
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-[50px] h-[50px] rounded-[12px]"
          style={{ objectFit: 'contain' }}
          draggable={false}
        />
      </motion.div>
      {isRunning(app.appId || app.id) && (
        <div className="w-1 h-1 rounded-full bg-white/80 mt-[1px]" />
      )}
    </div>
  );

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div className="dock-container flex items-end" style={{ gap: 4 }}>
        {apps.map(renderIcon)}

        {/* Separator */}
        <div className="self-center" style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.25)', margin: '0 6px' }} />

        {docItems.map(renderIcon)}
      </div>
    </div>
  );
}
