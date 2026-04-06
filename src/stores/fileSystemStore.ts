import { create } from 'zustand';
import type { FileSystemNode } from '../types';
import { fileSystemData } from '../data/projects';

interface FileSystemStore {
  nodes: Record<string, FileSystemNode>;
  getNode: (id: string) => FileSystemNode | undefined;
  getChildren: (parentId: string) => FileSystemNode[];
  getRootChildren: () => FileSystemNode[];
  getDesktopFolders: () => FileSystemNode[];
}

export const useFileSystemStore = create<FileSystemStore>((_, get) => ({
  nodes: fileSystemData,

  getNode: (id) => get().nodes[id],

  getChildren: (parentId) => {
    const parent = get().nodes[parentId];
    if (!parent?.children) return [];
    return parent.children
      .map((childId) => get().nodes[childId])
      .filter(Boolean);
  },

  getRootChildren: () => {
    return Object.values(get().nodes).filter((n) => n.parentId === null);
  },

  getDesktopFolders: () => {
    const desktop = Object.values(get().nodes).find(
      (n) => n.id === 'desktop'
    );
    if (!desktop?.children) return [];
    return desktop.children
      .map((childId) => get().nodes[childId])
      .filter(Boolean);
  },
}));
