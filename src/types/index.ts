export interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string;
  content: string;
  links?: { label: string; url: string }[];
}

export interface FileSystemNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon?: string;
  parentId: string | null;
  children?: string[];
  projectData?: ProjectData;
}

export interface WindowState {
  id: string;
  appId: 'finder' | 'pdf-viewer' | 'about' | 'iterm' | 'resume';
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  props?: Record<string, unknown>;
}
