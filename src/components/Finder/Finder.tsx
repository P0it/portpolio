import { useState, useCallback } from 'react';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import { useWindowStore } from '../../stores/windowStore';
import type { FileSystemNode } from '../../types';

interface FinderProps {
  initialPath: string;
  windowId: string;
}

export default function Finder({ initialPath, windowId }: FinderProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const nodes = useFileSystemStore((s) => s.nodes);
  const { openWindow } = useWindowStore();
  const windows = useWindowStore((s) => s.windows);

  const currentNode = nodes[currentPath];
  const children = currentNode?.children
    ? currentNode.children.map((childId) => nodes[childId]).filter(Boolean)
    : [];

  const navigateTo = useCallback(
    (nodeId: string) => {
      setCurrentPath(nodeId);
      setSelectedItem(null);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(nodeId);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      // Update window title
      const win = windows.find((w) => w.id === windowId);
      if (win) {
        const node = nodes[nodeId];
        useWindowStore.setState({
          windows: windows.map((w) =>
            w.id === windowId ? { ...w, title: node?.name || 'Finder' } : w
          ),
        });
      }
    },
    [history, historyIndex, windowId, windows, nodes]
  );

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedItem(null);
    }
  }, [historyIndex, history]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedItem(null);
    }
  }, [historyIndex, history]);

  const handleDoubleClick = useCallback(
    (node: FileSystemNode) => {
      if (node.type === 'folder') {
        navigateTo(node.id);
      } else if (node.type === 'file' && node.projectData) {
        openWindow({
          id: `pdf-${node.id}`,
          appId: 'pdf-viewer',
          title: node.name,
          position: { x: 200 + Math.random() * 100, y: 80 + Math.random() * 50 },
          size: { width: 750, height: 600 },
          props: { fileId: node.id },
        });
      }
    },
    [navigateTo, openWindow]
  );

  const sidebarItems = [
    { label: 'Favorites', type: 'label' as const },
    { id: 'desktop', label: 'Desktop', icon: 'desktop' },
    { id: 'documents', label: 'Documents', icon: 'folder' },
    { id: 'downloads', label: 'Downloads', icon: 'download' },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="finder-sidebar">
        {sidebarItems.map((item, i) => {
          if (item.type === 'label') {
            return (
              <div key={i} className="finder-sidebar-label">
                {item.label}
              </div>
            );
          }
          return (
            <div
              key={item.id}
              className={`finder-sidebar-item ${currentPath === item.id ? 'active' : ''}`}
              onClick={() => item.id && navigateTo(item.id)}
            >
              <SidebarIcon type={item.icon || 'folder'} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="finder-toolbar">
          <button
            className={`p-1 rounded ${historyIndex > 0 ? 'hover:bg-white/10' : 'opacity-30'}`}
            onClick={goBack}
            disabled={historyIndex <= 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.7">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            className={`p-1 rounded ${
              historyIndex < history.length - 1 ? 'hover:bg-white/10' : 'opacity-30'
            }`}
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.7">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
          <div className="flex-1 text-center text-[13px] text-white/70 font-medium">
            {currentNode?.name || 'Finder'}
          </div>
        </div>

        {/* File Grid */}
        <div className="finder-content" onClick={() => setSelectedItem(null)}>
          {children.map((node) => (
            <div
              key={node.id}
              className={`finder-item ${selectedItem === node.id ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(node.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleDoubleClick(node);
              }}
            >
              <FileIcon node={node} />
              <span className="finder-item-name">{node.name}</span>
            </div>
          ))}
          {children.length === 0 && (
            <div className="col-span-full flex items-center justify-center h-32 text-white/30 text-sm">
              This folder is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ type }: { type: string }) {
  if (type === 'desktop') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#4fc3f7">
        <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
      </svg>
    );
  }
  if (type === 'download') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#90caf9">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#90caf9">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  );
}

function FileIcon({ node }: { node: FileSystemNode }) {
  if (node.type === 'folder') {
    return (
      <img src="/icons/folder.png" alt={node.name} width={56} height={48} style={{ objectFit: 'contain' }} draggable={false} />
    );
  }

  // File (PDF-like)
  return (
    <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
      <path d="M4 4C4 1.79 5.79 0 8 0H28L40 12V52C40 54.21 38.21 56 36 56H8C5.79 56 4 54.21 4 52V4Z" fill="#e8e8e8" />
      <path d="M28 0L40 12H32C29.79 12 28 10.21 28 8V0Z" fill="#ccc" />
      <rect x="10" y="20" width="20" height="2" rx="1" fill="#999" />
      <rect x="10" y="26" width="16" height="2" rx="1" fill="#999" />
      <rect x="10" y="32" width="18" height="2" rx="1" fill="#999" />
      <rect x="10" y="38" width="12" height="2" rx="1" fill="#999" />
      <text x="10" y="50" fontSize="7" fill="#FF3B30" fontWeight="600" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}
