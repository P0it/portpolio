import { useState, useCallback, useMemo } from 'react';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import { useWindowStore } from '../../stores/windowStore';
import ContextMenu from '../ContextMenu/ContextMenu';

export default function Desktop() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const nodes = useFileSystemStore((s) => s.nodes);
  const desktopFolders = useMemo(() => {
    const desktop = nodes['desktop'];
    if (!desktop?.children) return [];
    return desktop.children
      .map((childId) => nodes[childId])
      .filter(Boolean);
  }, [nodes]);
  const { openWindow } = useWindowStore();

  const handleDoubleClick = useCallback(
    (folderId: string, folderName: string) => {
      openWindow({
        id: `finder-${folderId}`,
        appId: 'finder',
        title: folderName,
        position: {
          x: Math.round((window.innerWidth - 800) / 2),
          y: Math.round((window.innerHeight - 500) / 2) - 20,
        },
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
        backgroundImage: 'url(/wallpaper-sonoma.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => {
        setSelectedFolder(null);
        setContextMenu(null);
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Folders - centered, horizontal row */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex gap-6 pointer-events-auto">
          {desktopFolders.map((folder) => (
            <div
              key={folder.id}
              className={`desktop-icon ${selectedFolder === folder.id ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFolder(folder.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleDoubleClick(folder.id, folder.name);
              }}
            >
              <img src="/icons/folder.png" alt={folder.name} width={64} height={54} style={{ objectFit: 'contain' }} draggable={false} />
              <span className="desktop-icon-label">{folder.name}</span>
            </div>
          ))}
        </div>
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
