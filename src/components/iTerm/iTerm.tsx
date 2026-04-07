import { useState, useEffect, useRef } from 'react';
import { profile } from '../../data/profile';

interface TerminalLine {
  type: 'command' | 'output' | 'blank';
  text: string;
  link?: string;
}

const terminalContent: TerminalLine[] = [
  { type: 'command', text: '$ cat about.md' },
  { type: 'blank', text: '' },
  { type: 'output', text: `  ${profile.name}` },
  { type: 'output', text: `  ${profile.title}` },
  { type: 'blank', text: '' },
  { type: 'output', text: `  ${profile.about}` },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ echo $TECH_STACK' },
  ...profile.skills.map((s) => ({
    type: 'output' as const,
    text: `  ${s.category.padEnd(12)} ${s.items.join(', ')}`,
  })),
  { type: 'blank', text: '' },
  { type: 'command', text: '$ cat contact.json' },
  { type: 'output', text: '  {' },
  { type: 'output', text: `    "email": "${profile.email}",` },
  {
    type: 'output',
    text: `    "github": "${profile.githubUrl}",`,
    link: profile.githubUrl,
  },
  {
    type: 'output',
    text: `    "linkedin": "${profile.linkedinUrl}"`,
    link: profile.linkedinUrl,
  },
  { type: 'output', text: '  }' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ echo "Thanks for visiting!"' },
  { type: 'output', text: '  Thanks for visiting!' },
];

export default function ITerm() {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= terminalContent.length) return;

    const line = terminalContent[visibleLines];
    const delay = line.type === 'command' ? 50 : 30;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-4 font-mono text-sm leading-6"
      style={{ background: '#1d1f21', color: '#c5c8c6' }}
    >
      {terminalContent.slice(0, visibleLines).map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line.type === 'command' ? (
            <span>
              <span style={{ color: '#22c55e' }}>$ </span>
              <span style={{ color: '#f0c674' }}>{line.text.slice(2)}</span>
            </span>
          ) : line.type === 'blank' ? (
            <br />
          ) : line.link ? (
            <span>
              {line.text.split(line.link)[0]}
              <a
                href={line.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#81a2be', cursor: 'pointer' }}
              >
                {line.link}
              </a>
              {line.text.split(line.link)[1]}
            </span>
          ) : (
            <span>{line.text}</span>
          )}
        </div>
      ))}
      {visibleLines < terminalContent.length && (
        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
      )}
    </div>
  );
}
