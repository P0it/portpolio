import { create } from 'zustand';
import type { WindowState } from '../types';

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (window: Omit<WindowState, 'zIndex' | 'isOpen' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  getActiveWindows: () => WindowState[];
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 100,

  openWindow: (windowConfig) => {
    const { windows, nextZIndex } = get();
    const existing = windows.find((w) => w.id === windowConfig.id);
    if (existing) {
      if (existing.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === windowConfig.id
              ? { ...w, isMinimized: false, isOpen: true, zIndex: nextZIndex }
              : w
          ),
          nextZIndex: nextZIndex + 1,
        });
      } else {
        get().focusWindow(windowConfig.id);
      }
      return;
    }
    set({
      windows: [
        ...windows,
        {
          ...windowConfig,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        },
      ],
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set({ windows: get().windows.filter((w) => w.id !== id) });
  },

  focusWindow: (id) => {
    const { windows, nextZIndex } = get();
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      nextZIndex: nextZIndex + 1,
    });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    });
  },

  maximizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    });
  },

  updateWindowPosition: (id, position) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    });
  },

  updateWindowSize: (id, size) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    });
  },

  getActiveWindows: () => {
    return get().windows.filter((w) => w.isOpen && !w.isMinimized);
  },
}));
