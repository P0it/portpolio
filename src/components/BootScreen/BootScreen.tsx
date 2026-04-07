import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

type Phase = 'boot' | 'login' | 'done';

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>('boot');
  const [progress, setProgress] = useState(0);
  const [loginFading, setLoginFading] = useState(false);

  // Boot progress
  useEffect(() => {
    if (phase !== 'boot') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('login'), 300);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  const handleLogin = () => {
    setLoginFading(true);
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 800);
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase === 'boot' && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#000' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Apple Logo */}
          <img
            src="/icons/apple-logo.png"
            alt="Apple"
            style={{ width: 56, height: 68, filter: 'brightness(0) invert(1)', marginBottom: 40, opacity: 0.9 }}
            draggable={false}
          />

          {/* Progress Bar */}
          <div style={{ width: 200, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }}>
            <div style={{ height: '100%', borderRadius: 2, background: 'rgba(255,255,255,0.8)', width: `${progress}%`, transition: 'width 0.05s linear' }} />
          </div>
        </motion.div>
      )}

      {phase === 'login' && (
        <motion.div
          key="login"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{
            backgroundImage: 'url(/wallpaper-sonoma.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loginFading ? 0 : 1 }}
          transition={{ duration: loginFading ? 0.8 : 0.5 }}
        >
          {/* Blur overlay */}
          <div
            className="absolute inset-0"
            style={{ backdropFilter: 'blur(40px) brightness(0.7)', WebkitBackdropFilter: 'blur(40px) brightness(0.7)' }}
          />

          {/* Login Content */}
          <div className="relative flex flex-col items-center" style={{ zIndex: 1 }}>
            {/* User Avatar */}
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.2)',
                marginBottom: 16,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            {/* User Name */}
            <div style={{ fontSize: 18, color: 'white', fontWeight: 500, marginBottom: 16 }}>
              JUNG, HYUNWOO
            </div>

            {/* Password field (fake) */}
            <div
              className="flex items-center rounded-full cursor-pointer hover:opacity-90"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 20px',
                width: 200,
                justifyContent: 'center',
                gap: 8,
              }}
              onClick={handleLogin}
            >
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Click to enter</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>→</span>
            </div>

            {/* Hint */}
            <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              Welcome to my portfolio
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
