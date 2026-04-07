import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';

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
  { id: 'safari', name: 'Safari', icon: '/icons/safari.png', action: 'bounce' },
  { id: 'messages', name: 'Messages', icon: '/icons/messages.png', action: 'bounce' },
  { id: 'mail', name: 'Mail', icon: '/icons/mail.png', action: 'bounce' },
  { id: 'photos', name: 'Photos', icon: '/icons/photos.png', action: 'bounce' },
  { id: 'music', name: 'Music', icon: '/icons/music.png', action: 'bounce' },
  { id: 'vscode', name: 'Visual Studio Code', icon: '/icons/vscode.png', action: 'bounce' },
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/github.png',
    action: 'link',
    url: 'https://github.com/Xv-Hyunwoo',
  },
  {
    id: 'iterm',
    name: 'iTerm',
    icon: '/icons/iterm.png',
    action: 'window',
    appId: 'iterm',
    windowConfig: {
      title: 'hyunwoo@portfolio ~ %',
      size: { width: 700, height: 450 },
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
        appId: app.appId as 'finder' | 'iterm' | 'resume',
        title: app.windowConfig.title,
        position: { x: 100 + Math.random() * 80, y: 60 + Math.random() * 40 },
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
        className="w-[48px] h-[48px] flex items-center justify-center"
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
          className="w-[46px] h-[46px] rounded-[11px]"
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
      <div className="dock-container flex items-end gap-[2px]">
        {apps.map(renderIcon)}

        {/* Separator */}
        <div className="w-[1px] h-[40px] bg-white/20 mx-1 self-center" />

        {docItems.map(renderIcon)}
      </div>
    </div>
  );
}
