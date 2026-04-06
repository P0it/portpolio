import { useState, useCallback } from 'react';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import { useWindowStore } from '../../stores/windowStore';
import ContextMenu from '../ContextMenu/ContextMenu';

export default function Desktop() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const desktopFolders = useFileSystemStore((s) => s.getDesktopFolders());
  const { openWindow } = useWindowStore();

  const handleDoubleClick = useCallback(
    (folderId: string, folderName: string) => {
      openWindow({
        id: `finder-${folderId}`,
        appId: 'finder',
        title: folderName,
        position: { x: 120 + Math.random() * 80, y: 60 + Math.random() * 40 },
        size: { width: 800, height: 500 },
        props: { currentPath: folderId },
      });
    },
    [openWindow]
  );

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      className="fixed inset-0 pt-[25px] pb-[76px]"
      style={{
        background: `linear-gradient(135deg,
          #ff6b35 0%,
          #ff8c42 15%,
          #ffa726 25%,
          #ffcc02 35%,
          #c5e063 45%,
          #66bb6a 55%,
          #26a69a 65%,
          #42a5f5 75%,
          #5c6bc0 85%,
          #7e57c2 95%
        )`,
      }}
      onClick={() => {
        setSelectedFolder(null);
        setContextMenu(null);
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icon Grid - positioned top-right, column-first */}
      <div
        className="absolute top-2 right-2 grid gap-1"
        style={{
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(auto-fill, 90px)',
          maxHeight: 'calc(100vh - 100px)',
          direction: 'rtl',
        }}
      >
        {desktopFolders.map((folder) => (
          <div
            key={folder.id}
            className={`desktop-icon ${selectedFolder === folder.id ? 'selected' : ''}`}
            style={{ direction: 'ltr' }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFolder(folder.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDoubleClick(folder.id, folder.name);
            }}
          >
            <svg width="56" height="48" viewBox="0 0 56 48" fill="none">
              <path
                d="M4 8C4 5.79 5.79 4 8 4H22L26 8H48C50.21 8 52 9.79 52 12V40C52 42.21 50.21 44 48 44H8C5.79 44 4 42.21 4 40V8Z"
                fill="#5AC8FA"
              />
              <path
                d="M4 16H52V40C52 42.21 50.21 44 48 44H8C5.79 44 4 42.21 4 40V16Z"
                fill="#40A9FF"
              />
            </svg>
            <span className="desktop-icon-label">{folder.name}</span>
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
