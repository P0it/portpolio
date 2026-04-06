import { useState, useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import type { WindowState } from '../../types';

interface AppWindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function AppWindow({ window: win, children }: AppWindowProps) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize } =
    useWindowStore();
  const [trafficHover, setTrafficHover] = useState(false);
  const rndRef = useRef<Rnd>(null);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeWindow(win.id);
    },
    [closeWindow, win.id]
  );

  const handleMinimize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      minimizeWindow(win.id);
    },
    [minimizeWindow, win.id]
  );

  const handleMaximize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      maximizeWindow(win.id);
    },
    [maximizeWindow, win.id]
  );

  if (!win.isOpen) return null;

  const menuBarHeight = 25;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: win.zIndex,
            pointerEvents: 'none',
          }}
        >
          <Rnd
            ref={rndRef}
            default={{
              x: win.position.x,
              y: win.position.y,
              width: win.size.width,
              height: win.size.height,
            }}
            position={win.isMaximized ? { x: 0, y: menuBarHeight } : undefined}
            size={
              win.isMaximized
                ? { width: globalThis.innerWidth, height: globalThis.innerHeight - menuBarHeight }
                : undefined
            }
            minWidth={400}
            minHeight={300}
            dragHandleClassName="window-drag-handle"
            disableDragging={win.isMaximized}
            enableResizing={!win.isMaximized}
            bounds="parent"
            onDragStop={(_e, d) => {
              updateWindowPosition(win.id, { x: d.x, y: d.y });
            }}
            onResizeStop={(_e, _dir, ref, _delta, position) => {
              updateWindowSize(win.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              });
              updateWindowPosition(win.id, position);
            }}
            onMouseDown={() => focusWindow(win.id)}
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="window-frame flex flex-col h-full"
              style={{
                borderRadius: win.isMaximized ? 0 : undefined,
              }}
            >
              {/* Title Bar */}
              <div
                className="window-titlebar window-drag-handle shrink-0"
                onDoubleClick={() => maximizeWindow(win.id)}
              >
                {/* Traffic Lights */}
                <div
                  className="traffic-lights flex items-center gap-2 mr-4"
                  onMouseEnter={() => setTrafficHover(true)}
                  onMouseLeave={() => setTrafficHover(false)}
                >
                  <button className="traffic-light traffic-light-close" onClick={handleClose}>
                    {trafficHover && (
                      <svg viewBox="0 0 12 12" fill="none" stroke="#4d0000" strokeWidth="1.5">
                        <path d="M3 3l6 6M9 3l-6 6" />
                      </svg>
                    )}
                  </button>
                  <button className="traffic-light traffic-light-minimize" onClick={handleMinimize}>
                    {trafficHover && (
                      <svg viewBox="0 0 12 12" fill="none" stroke="#995700" strokeWidth="1.5">
                        <path d="M2 6h8" />
                      </svg>
                    )}
                  </button>
                  <button className="traffic-light traffic-light-maximize" onClick={handleMaximize}>
                    {trafficHover && (
                      <svg viewBox="0 0 12 12" fill="none" stroke="#006500" strokeWidth="1.5">
                        <path d="M2 3l4-1 4 1v5l-4 4-4-4z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Window Title */}
                <div className="absolute left-1/2 -translate-x-1/2 text-[13px] text-white/80 font-normal">
                  {win.title}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">{children}</div>
            </div>
          </Rnd>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
