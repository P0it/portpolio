const codeLines = [
  { num: 1, text: 'import { passion, creativity, coffee } from "developer";', color: '#c586c0' },
  { num: 2, text: 'import { React, TypeScript, Tailwind } from "favorites";', color: '#c586c0' },
  { num: 3, text: '', color: '' },
  { num: 4, text: '/**', color: '#6a9955' },
  { num: 5, text: ' * @author JUNG, HYUNWOO', color: '#6a9955' },
  { num: 6, text: ' * @description Full-Stack Developer who loves clean code', color: '#6a9955' },
  { num: 7, text: ' */', color: '#6a9955' },
  { num: 8, text: 'export default function Developer() {', color: '#dcdcaa' },
  { num: 9, text: '  const skills = {', color: '#9cdcfe' },
  { num: 10, text: '    frontend: ["React", "Next.js", "TypeScript"],', color: '#ce9178' },
  { num: 11, text: '    backend:  ["Node.js", "Python", "Go"],', color: '#ce9178' },
  { num: 12, text: '    devops:   ["Docker", "K8s", "AWS"],', color: '#ce9178' },
  { num: 13, text: '  };', color: '#9cdcfe' },
  { num: 14, text: '', color: '' },
  { num: 15, text: '  const motivation = passion * coffee;', color: '#9cdcfe' },
  { num: 16, text: '', color: '' },
  { num: 17, text: '  while (true) {', color: '#c586c0' },
  { num: 18, text: '    learn();', color: '#dcdcaa' },
  { num: 19, text: '    build();', color: '#dcdcaa' },
  { num: 20, text: '    ship();  // \u{1F680}', color: '#dcdcaa' },
  { num: 21, text: '    if (motivation < threshold) coffee++;', color: '#c586c0' },
  { num: 22, text: '  }', color: '#c586c0' },
  { num: 23, text: '}', color: '#dcdcaa' },
];

interface FileEntry {
  name: string;
  indent: number;
  type: 'folder-open' | 'folder-closed' | 'file';
  active?: boolean;
}

const files: FileEntry[] = [
  { name: 'src', indent: 0, type: 'folder-open' },
  { name: 'components', indent: 1, type: 'folder-open' },
  { name: 'developer.tsx', indent: 2, type: 'file', active: true },
  { name: 'portfolio.tsx', indent: 2, type: 'file' },
  { name: 'skills.ts', indent: 2, type: 'file' },
  { name: 'data', indent: 1, type: 'folder-closed' },
  { name: 'stores', indent: 1, type: 'folder-closed' },
  { name: 'package.json', indent: 0, type: 'file' },
  { name: 'tsconfig.json', indent: 0, type: 'file' },
];

function FileIcon({ type }: { type: FileEntry['type'] }) {
  if (type === 'folder-open') {
    return <span style={{ color: '#dcb67a', marginRight: 6, fontSize: 14 }}>📂</span>;
  }
  if (type === 'folder-closed') {
    return <span style={{ color: '#dcb67a', marginRight: 6, fontSize: 14 }}>📁</span>;
  }
  return <span style={{ color: '#519aba', marginRight: 6, fontSize: 12 }}>📄</span>;
}

export default function VSCode() {
  return (
    <div className="h-full flex rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Sidebar - File Explorer */}
      <div className="w-[240px] border-r border-[#333] shrink-0" style={{ background: '#252526' }}>
        <div className="text-[11px] uppercase tracking-wider text-white/40" style={{ padding: '14px 20px 8px' }}>Explorer</div>
        <div className="text-[13px]" style={{ lineHeight: 1.8 }}>
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center hover:bg-white/5"
              style={{
                paddingLeft: 20 + f.indent * 16,
                paddingRight: 16,
                paddingTop: 2,
                paddingBottom: 2,
                background: f.active ? '#37373d' : undefined,
                color: f.active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
              }}
            >
              <FileIcon type={f.type} />
              <span className="truncate">{f.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex border-b border-[#333] shrink-0" style={{ background: '#252526' }}>
          <div
            className="flex items-center text-[13px] text-white/80 border-b-2 border-blue-500 shrink-0"
            style={{ background: '#1e1e1e', padding: '8px 16px', gap: 8 }}
          >
            <span style={{ fontSize: 12 }}>📄</span>
            <span>developer.tsx</span>
          </div>
          <div className="flex items-center text-[13px] text-white/40 shrink-0" style={{ padding: '8px 16px', gap: 8 }}>
            <span style={{ fontSize: 12 }}>📄</span>
            <span>portfolio.tsx</span>
          </div>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-y-auto font-mono text-[13px]" style={{ lineHeight: 1.8, padding: '12px 0' }}>
          {codeLines.map((line) => (
            <div key={line.num} className="flex hover:bg-white/3" style={{ padding: '0 16px' }}>
              <span className="text-right select-none shrink-0" style={{ color: '#858585', width: 44, paddingRight: 20 }}>
                {line.num}
              </span>
              <span className="whitespace-pre" style={{ color: line.color || '#d4d4d4' }}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

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
          <div className="flex items-center gap-4">
            <span>TypeScript React</span>
            <span>UTF-8</span>
            <span>Ln 20, Col 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
