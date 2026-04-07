import { profile } from '../../data/profile';

const emails = [
  {
    from: 'GitHub',
    subject: '🎉 Your repository got a new star!',
    preview: 'Someone starred your macOS-portfolio project...',
    time: 'Just now',
    unread: true,
  },
  {
    from: 'Recruiter',
    subject: 'Impressed by your portfolio!',
    preview: `Hi ${profile.name}, I came across your portfolio and...`,
    time: '2h ago',
    unread: true,
  },
  {
    from: 'Vercel',
    subject: 'Deployment successful ✅',
    preview: 'Your project macos-portfolio has been deployed to...',
    time: '5h ago',
    unread: false,
  },
  {
    from: 'npm',
    subject: 'Weekly download report',
    preview: 'Your packages received 1,234 downloads this week...',
    time: 'Yesterday',
    unread: false,
  },
  {
    from: 'Claude Code',
    subject: 'Session summary',
    preview: '10 tasks completed, 0 failed. All tests passing...',
    time: 'Yesterday',
    unread: false,
  },
  {
    from: 'Stack Overflow',
    subject: 'Your answer was accepted!',
    preview: 'Your answer to "How to fix useSyncExternalStore..."',
    time: '2 days ago',
    unread: false,
  },
];

export default function Mail() {
  return (
    <div className="h-full flex rounded-b-[10px] overflow-hidden" style={{ background: '#1e1e1e' }}>
      {/* Sidebar */}
      <div className="w-[180px] border-r border-white/10 p-3" style={{ background: 'rgba(45,45,45,0.9)' }}>
        <div className="text-[10px] font-semibold uppercase text-white/40 mb-2 px-2">Mailboxes</div>
        {['Inbox', 'Drafts', 'Sent', 'Junk', 'Trash'].map((box, i) => (
          <div
            key={box}
            className="px-2 py-1.5 rounded-md text-[12px] text-white/80 flex items-center justify-between"
            style={i === 0 ? { background: 'rgba(0,110,255,0.5)' } : undefined}
          >
            <span>{box}</span>
            {i === 0 && <span className="text-[10px] bg-blue-500 rounded-full px-1.5 text-white">2</span>}
          </div>
        ))}
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.map((email, i) => (
          <div
            key={i}
            className="px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
            style={{ cursor: 'default' }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[13px] ${email.unread ? 'text-white font-semibold' : 'text-white/70'}`}>
                {email.unread && <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2" />}
                {email.from}
              </span>
              <span className="text-[10px] text-white/40">{email.time}</span>
            </div>
            <div className={`text-[12px] ${email.unread ? 'text-white/90' : 'text-white/60'}`}>
              {email.subject}
            </div>
            <div className="text-[11px] text-white/30 mt-0.5 truncate">
              {email.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
