import { useState, useEffect } from 'react';
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
import BootScreen from './components/BootScreen/BootScreen';
import NotificationCenter from './components/Notification/Notification';
import { useWindowStore } from './stores/windowStore';

function getTopWindow() {
  const { windows } = useWindowStore.getState();
  const sorted = [...windows].sort((a, b) => b.zIndex - a.zIndex);
  return sorted.find((w) => w.isOpen && !w.isMinimized);
}

export default function App() {
  const windows = useWindowStore((s) => s.windows);
  const [booted, setBooted] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const top = getTopWindow();
        if (top) useWindowStore.getState().closeWindow(top.id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Boot & Login Screen */}
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      {/* Desktop Background + Icons */}
      <Desktop />

      {/* Menu Bar */}
      <MenuBar />

      {/* Notifications */}
      {booted && <NotificationCenter />}

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
