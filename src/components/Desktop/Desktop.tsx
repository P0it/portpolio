import { useState, useCallback, useMemo, useRef } from 'react';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import { useWindowStore } from '../../stores/windowStore';
import ContextMenu from '../ContextMenu/ContextMenu';

export default function Desktop() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [folderPositions, setFolderPositions] = useState<Record<string, { x: number; y: number }>>({});
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
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

  const handleMouseDown = useCallback((e: React.MouseEvent, folderId: string) => {
    e.preventDefault();
    const pos = folderPositions[folderId] || { x: 0, y: 0 };
    dragRef.current = { id: folderId, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };

    const handleMouseMove = (ev: MouseEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = ev.clientX - drag.startX;
      const dy = ev.clientY - drag.startY;
      setFolderPositions((prev) => ({
        ...prev,
        [drag.id]: { x: drag.origX + dx, y: drag.origY + dy },
      }));
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [folderPositions]);

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
      {/* Desktop Folders - centered, draggable */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex gap-6 pointer-events-auto">
          {desktopFolders.map((folder) => {
            const pos = folderPositions[folder.id];
            return (
              <div
                key={folder.id}
                className={`desktop-icon ${selectedFolder === folder.id ? 'selected' : ''}`}
                style={pos ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFolder(folder.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleDoubleClick(folder.id, folder.name);
                }}
                onMouseDown={(e) => handleMouseDown(e, folder.id)}
              >
                <img src="/icons/folder.png" alt={folder.name} width={64} height={54} style={{ objectFit: 'contain' }} draggable={false} />
                <span className="desktop-icon-label">{folder.name}</span>
              </div>
            );
          })}
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
