import { useState } from 'react';
import { profile } from '../../data/profile';

interface Email {
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  body: string;
}

const emails: Email[] = [
  {
    from: 'GitHub',
    subject: 'Your repository got a new star!',
    preview: 'Someone starred your macOS-portfolio project...',
    time: 'Just now',
    unread: true,
    body: `Hi ${profile.name},\n\nGreat news! Someone just starred your repository macOS-portfolio.\n\nYour project now has a growing community of developers who appreciate your work. Keep building amazing things!\n\nYour current stats:\n- Stars: 42\n- Forks: 7\n- Watchers: 3\n\n— GitHub`,
  },
  {
    from: 'Recruiter @ TechCorp',
    subject: 'Impressed by your portfolio!',
    preview: `Hi ${profile.name}, I came across your portfolio and...`,
    time: '2h ago',
    unread: true,
    body: `Hi ${profile.name},\n\nI came across your macOS desktop portfolio and I have to say — it's one of the most creative developer portfolios I've seen.\n\nThe attention to detail (working menus, draggable folders, the Messages chat animation) really shows your frontend expertise.\n\nWe're looking for a Full-Stack Developer who can bring this level of craft to our product. Would you be open to a conversation?\n\nBest regards,\nSarah Kim\nSenior Recruiter @ TechCorp`,
  },
  {
    from: 'Vercel',
    subject: 'Deployment successful',
    preview: 'Your project macos-portfolio has been deployed to...',
    time: '5h ago',
    unread: false,
    body: `Deployment Summary\n\nProject: macos-portfolio\nStatus: Ready\nURL: https://portfolio.vercel.app\nBranch: main\n\nBuild Duration: 12s\nFramework: Vite\nNode.js: 20.x\n\nAll checks passed. Your site is live!`,
  },
  {
    from: 'npm',
    subject: 'Weekly download report',
    preview: 'Your packages received 1,234 downloads this week...',
    time: 'Yesterday',
    unread: false,
    body: `Weekly Report\n\nYour packages received 1,234 downloads this week.\n\nTop packages:\n- react-glass-ui: 892 downloads\n- zustand-persist: 342 downloads\n\nThat's a 23% increase from last week. Nice work!`,
  },
  {
    from: 'Claude Code',
    subject: 'Session summary',
    preview: '10 tasks completed, 0 failed. All tests passing...',
    time: 'Yesterday',
    unread: false,
    body: `Session Summary\n\nTasks completed: 10\nTasks failed: 0\nFiles created: 12\nFiles modified: 18\nCommits: 15\n\nHighlights:\n- Replaced all SVG icons with PNG assets\n- Created 6 interactive mini apps\n- Added menu bar interactions\n- Implemented keyboard shortcuts\n- Made desktop folders draggable\n\nAll tests passing. Build successful.`,
  },
  {
    from: 'Stack Overflow',
    subject: 'Your answer was accepted!',
    preview: 'Your answer to "How to fix useSyncExternalStore..."',
    time: '2 days ago',
    unread: false,
    body: `Congratulations!\n\nYour answer to "How to fix useSyncExternalStore infinite loop in Zustand?" was accepted by the question author.\n\nYour answer:\n"The selector returns a new array reference every render. Use useMemo to derive the value outside the selector, or select stable state like s.nodes directly."\n\n+15 reputation earned\nTotal reputation: 2,847`,
  },
];

export default function Mail() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedEmail = selectedIndex !== null ? emails[selectedIndex] : null;

  return (
    <div className="h-full flex rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Sidebar */}
      <div className="w-[180px] shrink-0 border-r border-white/10" style={{ background: 'rgba(45,45,45,0.9)' }}>
        <div style={{ padding: '16px 12px 8px' }}>
          <div className="text-[10px] font-semibold uppercase text-white/40" style={{ marginBottom: 12, paddingLeft: 4 }}>Mailboxes</div>
          <div className="flex flex-col" style={{ gap: 2 }}>
            {['Inbox', 'Drafts', 'Sent', 'Junk', 'Trash'].map((box, i) => (
              <div
                key={box}
                className="rounded-md text-[13px] text-white/80 flex items-center justify-between"
                style={{ padding: '6px 10px', background: i === 0 ? 'rgba(0,110,255,0.5)' : undefined }}
              >
                <span>{box}</span>
                {i === 0 && <span className="text-[10px] bg-blue-500 rounded-full text-white" style={{ padding: '1px 7px' }}>2</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="shrink-0 overflow-y-auto border-r border-white/10" style={{ width: 280, padding: '4px 0' }}>
        {emails.map((email, i) => (
          <div
            key={i}
            className="border-b border-white/5 hover:bg-white/5 transition-colors"
            style={{
              padding: '12px 16px',
              cursor: 'default',
              background: selectedIndex === i ? 'rgba(0,110,255,0.3)' : undefined,
            }}
            onClick={() => setSelectedIndex(i)}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
              <span className={`text-[12px] ${email.unread ? 'text-white font-semibold' : 'text-white/70'}`}>
                {email.unread && <span className="inline-block w-2 h-2 rounded-full bg-blue-500" style={{ marginRight: 6 }} />}
                {email.from}
              </span>
              <span className="text-[10px] text-white/40">{email.time}</span>
            </div>
            <div className={`text-[12px] ${email.unread ? 'text-white/90' : 'text-white/60'}`} style={{ marginBottom: 2 }}>
              {email.subject}
            </div>
            <div className="text-[11px] text-white/30 truncate">
              {email.preview}
            </div>
          </div>
        ))}
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 28px' }}>
        {selectedEmail ? (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 8 }}>
                {selectedEmail.subject}
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{selectedEmail.from}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 12 }}>to me</span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{selectedEmail.time}</span>
              </div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }} />
            <div style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap' }}>
              {selectedEmail.body}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>📬</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>Select an email to read</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
