import { useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  return (
    <div
      className="context-menu fixed z-[99999]"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="context-menu-item">New Folder</div>
      <div className="context-menu-separator" />
      <div className="context-menu-item">
        Get Info <span className="text-white/30 text-[11px] ml-4">&#8984;I</span>
      </div>
      <div className="context-menu-item">Change Wallpaper...</div>
      <div className="context-menu-separator" />
      <div className="context-menu-item">Use Stacks</div>
      <div className="context-menu-item">
        Sort By <span className="text-white/30 text-[11px] ml-auto">&#9656;</span>
      </div>
      <div className="context-menu-item">
        Clean Up By <span className="text-white/30 text-[11px] ml-auto">&#9656;</span>
      </div>
      <div className="context-menu-separator" />
      <div className="context-menu-item">Show View Options</div>
    </div>
  );
}
