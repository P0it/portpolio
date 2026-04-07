import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationData {
  app: string;
  icon: string;
  title: string;
  body: string;
  delay: number;
}

const notifications: NotificationData[] = [
  {
    app: 'Finder',
    icon: '/icons/finder.png',
    title: 'Welcome!',
    body: 'Try double-clicking the year folders on the desktop.',
    delay: 3000,
  },
  {
    app: 'Mail',
    icon: '/icons/mail.png',
    title: '2 new emails',
    body: 'A recruiter is impressed by your portfolio!',
    delay: 8000,
  },
  {
    app: 'GitHub',
    icon: '/icons/github.png',
    title: 'New star on macOS-portfolio',
    body: 'Your repository just got another star.',
    delay: 15000,
  },
];

export default function NotificationCenter() {
  const [visible, setVisible] = useState<NotificationData[]>([]);

  useEffect(() => {
    const timers = notifications.map((notif) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, notif]);
        // Auto-dismiss after 5s
        setTimeout(() => {
          setVisible((prev) => prev.filter((n) => n !== notif));
        }, 5000);
      }, notif.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (notif: NotificationData) => {
    setVisible((prev) => prev.filter((n) => n !== notif));
  };

  return (
    <div className="fixed z-[99998]" style={{ top: 32, right: 12, width: 340 }}>
      <AnimatePresence>
        {visible.map((notif) => (
          <motion.div
            key={`${notif.app}-${notif.delay}`}
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="cursor-default"
            style={{
              background: 'rgba(50,50,50,0.9)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: 14,
              padding: '12px 16px',
              marginBottom: 8,
              border: '0.5px solid rgba(255,255,255,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
            onClick={() => dismiss(notif)}
          >
            <div className="flex items-start" style={{ gap: 12 }}>
              <img
                src={notif.icon}
                alt={notif.app}
                style={{ width: 32, height: 32, borderRadius: 7, objectFit: 'contain' }}
                draggable={false}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                    {notif.app}
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>now</span>
                </div>
                <div style={{ fontSize: 13, color: 'white', fontWeight: 500, marginTop: 2 }}>
                  {notif.title}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  {notif.body}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
