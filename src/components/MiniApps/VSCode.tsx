import { useState } from 'react';
import { profile } from '../../data/profile';

interface CodeLine {
  num: number;
  text: string;
  color: string;
}

interface CodeFile {
  name: string;
  language: string;
  lines: CodeLine[];
}

const files: Record<string, CodeFile> = {
  'developer.tsx': {
    name: 'developer.tsx',
    language: 'TypeScript React',
    lines: [
      { num: 1, text: 'import { passion, creativity, coffee } from "developer";', color: '#c586c0' },
      { num: 2, text: 'import { React, TypeScript, Tailwind } from "favorites";', color: '#c586c0' },
      { num: 3, text: '', color: '' },
      { num: 4, text: '/**', color: '#6a9955' },
      { num: 5, text: ` * @author ${profile.name}`, color: '#6a9955' },
      { num: 6, text: ` * @description ${profile.title} who loves clean code`, color: '#6a9955' },
      { num: 7, text: ' */', color: '#6a9955' },
      { num: 8, text: 'export default function Developer() {', color: '#dcdcaa' },
      { num: 9, text: '  const skills = {', color: '#9cdcfe' },
      ...profile.skills.map((s, i) => ({
        num: 10 + i,
        text: `    ${s.category.toLowerCase().padEnd(10)}: [${s.items.map(x => `"${x}"`).join(', ')}],`,
        color: '#ce9178',
      })),
      { num: 15, text: '  };', color: '#9cdcfe' },
      { num: 16, text: '', color: '' },
      { num: 17, text: '  const motivation = passion * coffee;', color: '#9cdcfe' },
      { num: 18, text: '', color: '' },
      { num: 19, text: '  while (true) {', color: '#c586c0' },
      { num: 20, text: '    learn();', color: '#dcdcaa' },
      { num: 21, text: '    build();', color: '#dcdcaa' },
      { num: 22, text: '    ship();  // \u{1F680}', color: '#dcdcaa' },
      { num: 23, text: '    if (motivation < threshold) coffee++;', color: '#c586c0' },
      { num: 24, text: '  }', color: '#c586c0' },
      { num: 25, text: '}', color: '#dcdcaa' },
    ],
  },
  'portfolio.tsx': {
    name: 'portfolio.tsx',
    language: 'TypeScript React',
    lines: [
      { num: 1, text: 'import { Desktop, Dock, MenuBar } from "./components";', color: '#c586c0' },
      { num: 2, text: 'import { WindowManager } from "./stores/windowStore";', color: '#c586c0' },
      { num: 3, text: '', color: '' },
      { num: 4, text: '// This portfolio is a macOS desktop simulator', color: '#6a9955' },
      { num: 5, text: '// Built entirely with React + TypeScript + Tailwind', color: '#6a9955' },
      { num: 6, text: '// Every app in the Dock is interactive!', color: '#6a9955' },
      { num: 7, text: '', color: '' },
      { num: 8, text: 'export default function Portfolio() {', color: '#dcdcaa' },
      { num: 9, text: '  return (', color: '#d4d4d4' },
      { num: 10, text: '    <MacOS>', color: '#569cd6' },
      { num: 11, text: '      <MenuBar />', color: '#569cd6' },
      { num: 12, text: '      <Desktop folders={projects} />', color: '#569cd6' },
      { num: 13, text: '      <WindowManager />', color: '#569cd6' },
      { num: 14, text: '      <Dock apps={apps} />', color: '#569cd6' },
      { num: 15, text: '    </MacOS>', color: '#569cd6' },
      { num: 16, text: '  );', color: '#d4d4d4' },
      { num: 17, text: '}', color: '#dcdcaa' },
    ],
  },
  'skills.ts': {
    name: 'skills.ts',
    language: 'TypeScript',
    lines: [
      { num: 1, text: 'export interface Skill {', color: '#569cd6' },
      { num: 2, text: '  name: string;', color: '#9cdcfe' },
      { num: 3, text: '  level: "beginner" | "intermediate" | "advanced" | "expert";', color: '#9cdcfe' },
      { num: 4, text: '  yearsOfExperience: number;', color: '#9cdcfe' },
      { num: 5, text: '}', color: '#569cd6' },
      { num: 6, text: '', color: '' },
      { num: 7, text: 'export const skills: Skill[] = [', color: '#9cdcfe' },
      ...profile.skills.flatMap((cat) =>
        cat.items.map((item, i) => ({
          num: 8 + i,
          text: `  { name: "${item}", level: "expert", yearsOfExperience: ${Math.floor(Math.random() * 4) + 2} },`,
          color: '#ce9178',
        }))
      ).map((line, i) => ({ ...line, num: 8 + i })),
      { num: 30, text: '];', color: '#9cdcfe' },
    ],
  },
  'package.json': {
    name: 'package.json',
    language: 'JSON',
    lines: [
      { num: 1, text: '{', color: '#d4d4d4' },
      { num: 2, text: '  "name": "macos-portfolio",', color: '#9cdcfe' },
      { num: 3, text: '  "version": "1.0.0",', color: '#9cdcfe' },
      { num: 4, text: `  "author": "${profile.name}",`, color: '#ce9178' },
      { num: 5, text: '  "dependencies": {', color: '#9cdcfe' },
      { num: 6, text: '    "react": "^19.2.4",', color: '#ce9178' },
      { num: 7, text: '    "typescript": "~6.0.2",', color: '#ce9178' },
      { num: 8, text: '    "tailwindcss": "^4.2.2",', color: '#ce9178' },
      { num: 9, text: '    "framer-motion": "^12.38.0",', color: '#ce9178' },
      { num: 10, text: '    "zustand": "^5.0.12",', color: '#ce9178' },
      { num: 11, text: '    "vite": "^8.0.4"', color: '#ce9178' },
      { num: 12, text: '  },', color: '#9cdcfe' },
      { num: 13, text: '  "scripts": {', color: '#9cdcfe' },
      { num: 14, text: '    "dev": "vite",', color: '#ce9178' },
      { num: 15, text: '    "build": "tsc -b && vite build"', color: '#ce9178' },
      { num: 16, text: '  }', color: '#9cdcfe' },
      { num: 17, text: '}', color: '#d4d4d4' },
    ],
  },
};

interface SidebarEntry {
  name: string;
  indent: number;
  type: 'folder-open' | 'folder-closed' | 'file';
  fileKey?: string;
  children?: string[];
}

const initialSidebar: SidebarEntry[] = [
  { name: 'src', indent: 0, type: 'folder-open', children: ['components', 'data', 'stores'] },
  { name: 'components', indent: 1, type: 'folder-open', children: ['developer.tsx', 'portfolio.tsx', 'skills.ts'] },
  { name: 'developer.tsx', indent: 2, type: 'file', fileKey: 'developer.tsx' },
  { name: 'portfolio.tsx', indent: 2, type: 'file', fileKey: 'portfolio.tsx' },
  { name: 'skills.ts', indent: 2, type: 'file', fileKey: 'skills.ts' },
  { name: 'data', indent: 1, type: 'folder-closed' },
  { name: 'stores', indent: 1, type: 'folder-closed' },
  { name: 'package.json', indent: 0, type: 'file', fileKey: 'package.json' },
  { name: 'tsconfig.json', indent: 0, type: 'file' },
];

function FileIcon({ type }: { type: SidebarEntry['type'] }) {
  if (type === 'folder-open') return <span style={{ marginRight: 6, fontSize: 14 }}>📂</span>;
  if (type === 'folder-closed') return <span style={{ marginRight: 6, fontSize: 14 }}>📁</span>;
  return <span style={{ marginRight: 6, fontSize: 12 }}>📄</span>;
}

export default function VSCode() {
  const [activeFile, setActiveFile] = useState('developer.tsx');
  const [openTabs, setOpenTabs] = useState(['developer.tsx']);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set());

  const currentFile = files[activeFile];

  const openFile = (fileKey: string) => {
    if (!files[fileKey]) return;
    setActiveFile(fileKey);
    setActiveLine(null);
    if (!openTabs.includes(fileKey)) {
      setOpenTabs((prev) => [...prev, fileKey]);
    }
  };

  const closeTab = (fileKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((t) => t !== fileKey);
    setOpenTabs(newTabs);
    if (activeFile === fileKey) {
      setActiveFile(newTabs[newTabs.length - 1] || 'developer.tsx');
    }
  };

  const toggleFolder = (name: string) => {
    setCollapsedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const isVisible = (entry: SidebarEntry) => {
    if (entry.indent === 0) return true;
    // Check if any parent folder is collapsed
    if (entry.indent >= 2 && collapsedFolders.has('components')) return false;
    if (entry.indent >= 1 && collapsedFolders.has('src')) return false;
    return true;
  };

  return (
    <div className="h-full flex rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Sidebar */}
      <div className="w-[240px] border-r border-[#333] shrink-0 overflow-y-auto" style={{ background: '#252526' }}>
        <div className="text-[11px] uppercase tracking-wider text-white/40" style={{ padding: '14px 20px 8px' }}>Explorer</div>
        <div className="text-[13px]" style={{ lineHeight: 1.8 }}>
          {initialSidebar.filter(isVisible).map((entry, i) => (
            <div
              key={i}
              className="flex items-center hover:bg-white/5"
              style={{
                paddingLeft: 20 + entry.indent * 16,
                paddingRight: 16,
                paddingTop: 2,
                paddingBottom: 2,
                background: entry.fileKey === activeFile ? '#37373d' : undefined,
                color: entry.fileKey === activeFile ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
                cursor: 'default',
              }}
              onClick={() => {
                if (entry.type === 'file' && entry.fileKey) openFile(entry.fileKey);
                else if (entry.type === 'folder-open' || entry.type === 'folder-closed') toggleFolder(entry.name);
              }}
            >
              <FileIcon type={collapsedFolders.has(entry.name) ? 'folder-closed' : entry.type} />
              <span className="truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex border-b border-[#333] shrink-0 overflow-x-auto" style={{ background: '#252526' }}>
          {openTabs.map((tab) => (
            <div
              key={tab}
              className="flex items-center text-[13px] shrink-0"
              style={{
                padding: '6px 12px',
                gap: 8,
                background: tab === activeFile ? '#1e1e1e' : undefined,
                color: tab === activeFile ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                borderBottom: tab === activeFile ? '2px solid #007acc' : '2px solid transparent',
                cursor: 'default',
              }}
              onClick={() => { setActiveFile(tab); setActiveLine(null); }}
            >
              <span style={{ fontSize: 12 }}>📄</span>
              <span>{tab}</span>
              <span
                className="hover:bg-white/10 rounded"
                style={{ padding: '0 4px', fontSize: 14, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', lineHeight: 1 }}
                onClick={(e) => closeTab(tab, e)}
              >
                ×
              </span>
            </div>
          ))}
        </div>

        {/* Code */}
        {currentFile ? (
          <div className="flex-1 overflow-y-auto font-mono text-[13px]" style={{ lineHeight: 1.8, padding: '12px 0' }}>
            {currentFile.lines.map((line) => (
              <div
                key={line.num}
                className="flex"
                style={{
                  padding: '0 16px',
                  background: activeLine === line.num ? 'rgba(255,255,255,0.04)' : undefined,
                  borderLeft: activeLine === line.num ? '2px solid #007acc' : '2px solid transparent',
                  cursor: 'default',
                }}
                onClick={() => setActiveLine(line.num)}
              >
                <span className="text-right select-none shrink-0" style={{ color: '#858585', width: 44, paddingRight: 20 }}>
                  {line.num}
                </span>
                <span className="whitespace-pre" style={{ color: line.color || '#d4d4d4' }}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>Select a file to view</div>
          </div>
        )}

        {/* Status Bar */}
        <div
          className="flex items-center justify-between text-[11px] shrink-0 whitespace-nowrap overflow-hidden"
          style={{ background: '#007acc', color: 'white', padding: '4px 20px' }}
        >
          <div className="flex items-center" style={{ gap: 16 }}>
            <span>main</span>
            <span>0 errors</span>
            <span>0 warnings</span>
          </div>
          <div className="flex items-center" style={{ gap: 16 }}>
            <span>{currentFile?.language || 'Plain Text'}</span>
            <span>UTF-8</span>
            <span>Ln {activeLine || 1}, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
