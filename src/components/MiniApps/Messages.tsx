import { useState, useEffect } from 'react';

interface Message {
  from: 'visitor' | 'me';
  text: string;
  delay: number;
}

const conversation: Message[] = [
  { from: 'visitor', text: 'Hey! Nice portfolio 👋', delay: 300 },
  { from: 'me', text: 'Thanks! Glad you like it', delay: 800 },
  { from: 'visitor', text: 'Is this actually macOS? 😮', delay: 1500 },
  { from: 'me', text: 'Haha no, it\'s all React + TypeScript + Tailwind CSS', delay: 2400 },
  { from: 'visitor', text: 'Wait... even the Dock animation?', delay: 3200 },
  { from: 'me', text: 'Yep! Framer Motion + pure CSS for the magnification effect', delay: 4000 },
  { from: 'visitor', text: 'That\'s actually impressive. How long did it take?', delay: 5000 },
  { from: 'me', text: 'Built it with Claude Code in one session 🚀', delay: 5800 },
  { from: 'visitor', text: 'No way 🤯', delay: 6500 },
  { from: 'me', text: 'Way. Check out the GitHub for the source!', delay: 7200 },
];

export default function Messages() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= conversation.length) return;
    const next = conversation[visibleCount];
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), next.delay);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="h-full flex rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Sidebar */}
      <div className="w-[240px] shrink-0 border-r border-white/10 pt-4 px-3" style={{ background: 'rgba(45,45,45,0.9)' }}>
        <div className="text-[10px] font-semibold uppercase text-white/30 px-3 mb-2">Messages</div>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: 'rgba(0,110,255,0.5)' }}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-sm text-white font-bold shrink-0">V</div>
          <div className="min-w-0">
            <div className="text-[13px] text-white font-medium">Visitor</div>
            <div className="text-[11px] text-white/50 truncate">Nice portfolio 👋</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">
          {conversation.slice(0, visibleCount).map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px 20px',
                  borderRadius: 20,
                  fontSize: 15,
                  lineHeight: 1.5,
                  background: msg.from === 'me' ? '#0b84fe' : 'rgba(255,255,255,0.12)',
                  color: 'white',
                  borderBottomRightRadius: msg.from === 'me' ? 4 : 20,
                  borderBottomLeftRadius: msg.from === 'me' ? 20 : 4,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {visibleCount < conversation.length && (
            <div className="flex justify-start">
              <div style={{ padding: '12px 20px', borderRadius: 20, fontSize: 15, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="px-5 py-3 rounded-full text-[13px] text-white/30" style={{ background: 'rgba(255,255,255,0.08)' }}>
            iMessage
          </div>
        </div>
      </div>
    </div>
  );
}
