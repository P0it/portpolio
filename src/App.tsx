import MenuBar from './components/MenuBar/MenuBar';
import Desktop from './components/Desktop/Desktop';
import Dock from './components/Dock/Dock';
import AppWindow from './components/Window/AppWindow';
import Finder from './components/Finder/Finder';
import PDFViewer from './components/PDFViewer/PDFViewer';
import { useWindowStore } from './stores/windowStore';

export default function App() {
  const windows = useWindowStore((s) => s.windows);

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
        </AppWindow>
      ))}

      {/* Dock */}
      <Dock />
    </div>
  );
}
