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
  { num: 20, text: '    ship();  // 🚀', color: '#dcdcaa' },
  { num: 21, text: '    if (motivation < threshold) coffee++;', color: '#c586c0' },
  { num: 22, text: '  }', color: '#c586c0' },
  { num: 23, text: '}', color: '#dcdcaa' },
];

export default function VSCode() {
  return (
    <div className="h-full flex rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Sidebar - File Explorer */}
      <div className="w-[220px] border-r border-[#333] py-2" style={{ background: '#252526' }}>
        <div className="text-[11px] uppercase tracking-wider text-white/40 px-5 py-2">Explorer</div>
        <div className="text-[13px]">
          <div className="px-5 py-1 text-white/60">▼ src</div>
          <div className="px-7 py-1 text-white/60">  ▼ components</div>
          <div className="px-9 py-1 text-white/90" style={{ background: '#37373d' }}>developer.tsx</div>
          <div className="px-9 py-1 text-white/40">  portfolio.tsx</div>
          <div className="px-9 py-1 text-white/40">  skills.ts</div>
          <div className="px-7 py-1 text-white/60">  ▶ data</div>
          <div className="px-7 py-1 text-white/60">  ▶ stores</div>
          <div className="px-5 py-1 text-white/40">package.json</div>
          <div className="px-5 py-1 text-white/40">tsconfig.json</div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-[#333]" style={{ background: '#252526' }}>
          <div className="px-5 py-2 text-[13px] text-white/80 border-b-2 border-blue-500" style={{ background: '#1e1e1e' }}>
            developer.tsx
          </div>
          <div className="px-5 py-2 text-[13px] text-white/40">
            portfolio.tsx
          </div>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-y-auto font-mono text-[13px] leading-6 py-3">
          {codeLines.map((line) => (
            <div key={line.num} className="flex hover:bg-white/3 px-4">
              <span className="w-12 text-right pr-5 select-none" style={{ color: '#858585' }}>
                {line.num}
              </span>
              <span style={{ color: line.color || '#d4d4d4' }}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 py-1 text-[11px]" style={{ background: '#007acc', color: 'white' }}>
          <div className="flex items-center gap-3">
            <span>main</span>
            <span>0 errors</span>
            <span>0 warnings</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TypeScript React</span>
            <span>UTF-8</span>
            <span>Ln 20, Col 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
