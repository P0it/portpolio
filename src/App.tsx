import { useEffect } from 'react';
import MenuBar from './components/MenuBar/MenuBar';
import Desktop from './components/Desktop/Desktop';
import Dock from './components/Dock/Dock';
import AppWindow from './components/Window/AppWindow';
import Finder from './components/Finder/Finder';
import PDFViewer from './components/PDFViewer/PDFViewer';
import ITerm from './components/iTerm/iTerm';
import ResumeViewer from './components/ResumeViewer/ResumeViewer';
import Safari from './components/MiniApps/Safari';
import Messages from './components/MiniApps/Messages';
import Mail from './components/MiniApps/Mail';
import Photos from './components/MiniApps/Photos';
import Music from './components/MiniApps/Music';
import VSCode from './components/MiniApps/VSCode';
import { useWindowStore } from './stores/windowStore';

function getTopWindow() {
  const { windows } = useWindowStore.getState();
  const sorted = [...windows].sort((a, b) => b.zIndex - a.zIndex);
  return sorted.find((w) => w.isOpen && !w.isMinimized);
}

export default function App() {
  const windows = useWindowStore((s) => s.windows);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;

      // Cmd+W — close top window
      if (meta && e.key === 'w') {
        e.preventDefault();
        const top = getTopWindow();
        if (top) useWindowStore.getState().closeWindow(top.id);
      }

      // Cmd+M — minimize top window
      if (meta && e.key === 'm') {
        e.preventDefault();
        const top = getTopWindow();
        if (top) useWindowStore.getState().minimizeWindow(top.id);
      }

      // Cmd+N — new Finder window
      if (meta && e.key === 'n') {
        e.preventDefault();
        useWindowStore.getState().openWindow({
          id: `finder-desktop-${Date.now()}`,
          appId: 'finder',
          title: 'Desktop',
          position: { x: Math.round((window.innerWidth - 800) / 2), y: Math.round((window.innerHeight - 500) / 2) - 20 },
          size: { width: 800, height: 500 },
          props: { currentPath: 'desktop' },
        });
      }

      // Escape — close top window
      if (e.key === 'Escape') {
        const top = getTopWindow();
        if (top) useWindowStore.getState().closeWindow(top.id);
      }

      // Cmd+Space — open Spotlight (iTerm as substitute)
      if (meta && e.key === ' ') {
        e.preventDefault();
        useWindowStore.getState().openWindow({
          id: 'iterm-main',
          appId: 'iterm',
          title: 'hyunwoo@portfolio ~ %',
          position: { x: Math.round((window.innerWidth - 750) / 2), y: Math.round((window.innerHeight - 620) / 2) - 20 },
          size: { width: 750, height: 620 },
        });
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Desktop Background + Icons */}
      <Desktop />

      {/* Menu Bar */}
      <MenuBar />

      {/* Windows */}
      {windows.map((win) => (
        <AppWindow key={win.id} window={win}>
          {win.appId === 'finder' && (
            <Finder
              initialPath={(win.props?.currentPath as string) || 'desktop'}
              windowId={win.id}
            />
          )}
          {win.appId === 'pdf-viewer' && (
            <PDFViewer fileId={(win.props?.fileId as string) || ''} />
          )}
          {win.appId === 'iterm' && <ITerm />}
          {win.appId === 'resume' && <ResumeViewer />}
          {win.appId === 'safari' && <Safari />}
          {win.appId === 'messages' && <Messages />}
          {win.appId === 'mail' && <Mail />}
          {win.appId === 'photos' && <Photos />}
          {win.appId === 'music' && <Music />}
          {win.appId === 'vscode' && <VSCode />}
        </AppWindow>
      ))}

      {/* Dock */}
      <Dock />
    </div>
  );
}
