# macOS Portfolio Visual Upgrade - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace crude inline SVGs and CSS gradients with real macOS image assets, and add iTerm + ResumeViewer apps to create a high-fidelity macOS desktop portfolio.

**Architecture:** Asset-first approach — download real PNG icons and wallpaper into `public/`, then update components to use `<img>` tags instead of inline SVGs. Two new components (iTerm, ResumeViewer) consume shared profile data from `src/data/profile.ts`. Dock is restructured with new app list, bounce animation for inactive apps, and separator between apps and documents.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Framer Motion, Zustand 5, Vite 8

---

## File Structure

```
public/
  wallpaper-sonoma.jpg              # User-provided Sonoma wallpaper (already have)
  icons/
    finder.png                      # Dock + Finder app icon
    safari.png                      # Dock icon (inactive)
    messages.png                    # Dock icon (inactive)
    mail.png                        # Dock icon (inactive)
    photos.png                      # Dock icon (inactive)
    music.png                       # Dock icon (inactive)
    vscode.png                      # Dock icon (inactive)
    github.png                      # Dock icon (opens GitHub)
    iterm.png                       # Dock icon (opens iTerm) - user-provided
    readme-file.png                 # Dock document icon (opens ResumeViewer)
    folder.png                      # Desktop folder icon
    apple-logo.png                  # Menu bar Apple logo
    wifi.png                        # Menu bar WiFi icon
    battery.png                     # Menu bar battery icon
    search.png                      # Menu bar search/spotlight icon
    control-center.png              # Menu bar control center icon

src/
  types/index.ts                    # Add 'iterm' | 'resume' to appId union
  data/profile.ts                   # NEW: shared profile data for iTerm + ResumeViewer
  components/
    Desktop/Desktop.tsx             # Replace CSS gradient + SVG folders with images
    Dock/Dock.tsx                   # Full rewrite: PNG icons, bounce animation, new app list
    MenuBar/MenuBar.tsx             # Replace SVG icons with PNG images
    iTerm/iTerm.tsx                 # NEW: terminal-style self-intro
    ResumeViewer/ResumeViewer.tsx   # NEW: formatted CV document
  App.tsx                           # Register iTerm + ResumeViewer in window renderer
```

---

### Task 1: Download and organize image assets

**Files:**
- Create: `public/icons/` directory and all PNG files
- Create: `public/wallpaper-sonoma.jpg`

- [ ] **Step 1: Create the icons directory**

```bash
mkdir -p public/icons
```

- [ ] **Step 2: Download Dock icons from giant-sur repo**

```bash
# From soroushchehresa/giant-sur (main branch)
curl -L -o public/icons/finder.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/finder-logo.png"
curl -L -o public/icons/safari.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/safari-logo.png"
curl -L -o public/icons/messages.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/messages-logo.png"
curl -L -o public/icons/mail.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/mail-logo.png"
curl -L -o public/icons/photos.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/photos-logo.png"
curl -L -o public/icons/music.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/music-logo.png"
curl -L -o public/icons/folder.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/folder-icon.png"
```

- [ ] **Step 3: Download icons from macOS-react repo**

```bash
# From gianlucajahn/macOS-react (main branch)
curl -L -o public/icons/vscode.png "https://raw.githubusercontent.com/gianlucajahn/macOS-react/main/weather-forecast/src/resources/images/webp/vscode.png"
curl -L -o public/icons/github.png "https://raw.githubusercontent.com/gianlucajahn/macOS-react/main/weather-forecast/src/resources/images/webp/github.png"
```

- [ ] **Step 4: Download menu bar icons from giant-sur repo**

```bash
curl -L -o public/icons/apple-logo.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/apple-logo.png"
curl -L -o public/icons/wifi.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/wifi-icon.png"
curl -L -o public/icons/battery.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/battery-icon.png"
curl -L -o public/icons/search.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/magnifier-icon.png"
curl -L -o public/icons/control-center.png "https://raw.githubusercontent.com/soroushchehresa/giant-sur/main/public/images/control-center-icon.png"
```

- [ ] **Step 5: Save user-provided iTerm icon**

The user has provided the iTerm icon image in the conversation. Save it to `public/icons/iterm.png`. If the file is not directly available, create a placeholder and note that it needs to be replaced with the user-provided image.

- [ ] **Step 6: Create a simple document file icon for README**

Create a simple SVG-based document icon and convert or save as `public/icons/readme-file.png`. This should look like a white page with a folded corner — a standard macOS document file icon. If a suitable one exists in the reference repos, download it. Otherwise, create an SVG inline in the ResumeViewer dock entry later.

- [ ] **Step 7: Save the Sonoma wallpaper**

The user has provided the Sonoma wallpaper image in the conversation. Save it to `public/wallpaper-sonoma.jpg`.

- [ ] **Step 8: Verify all assets downloaded successfully**

```bash
ls -la public/icons/
ls -la public/wallpaper-sonoma.jpg
```

Expected: All PNG files present and non-zero size.

- [ ] **Step 9: Commit**

```bash
git add public/icons/ public/wallpaper-sonoma.jpg
git commit -m "feat: add macOS icon assets and Sonoma wallpaper"
```

---

### Task 2: Update types to support new apps

**Files:**
- Modify: `src/types/index.ts:28` (appId union type)

- [ ] **Step 1: Add new app IDs to the WindowState type**

In `src/types/index.ts`, change line 28 from:

```typescript
  appId: 'finder' | 'pdf-viewer' | 'about';
```

to:

```typescript
  appId: 'finder' | 'pdf-viewer' | 'about' | 'iterm' | 'resume';
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add iterm and resume app IDs to WindowState type"
```

---

### Task 3: Create shared profile data

**Files:**
- Create: `src/data/profile.ts`

- [ ] **Step 1: Create the profile data file**

Create `src/data/profile.ts`:

```typescript
export interface ProfileData {
  name: string;
  title: string;
  about: string;
  email: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  skills: { category: string; items: string[] }[];
  projects: { title: string; year: string; techStack: string[] }[];
}

export const profile: ProfileData = {
  name: 'JUNG, HYUNWOO',
  title: 'Full-Stack Developer',
  about:
    'Passionate full-stack developer with experience building scalable web applications, AI-powered platforms, and developer tools. Focused on clean architecture and great user experiences.',
  email: 'placeholder@email.com',
  github: 'Xv-Hyunwoo',
  githubUrl: 'https://github.com/Xv-Hyunwoo',
  linkedin: 'placeholder',
  linkedinUrl: 'https://linkedin.com/in/placeholder',
  skills: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'FastAPI'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS'] },
    { category: 'AI/ML', items: ['Claude API', 'LangGraph', 'Vercel AI SDK'] },
  ],
  projects: [
    { title: 'macOS Desktop Portfolio', year: '2026', techStack: ['React', 'TypeScript', 'Vite'] },
    { title: 'AI Agent Platform', year: '2025', techStack: ['Next.js 15', 'Claude API', 'LangGraph'] },
    { title: 'DevOps Monitoring Dashboard', year: '2025', techStack: ['React', 'Go', 'Prometheus'] },
    { title: 'SaaS Management Platform', year: '2024', techStack: ['Next.js 14', 'tRPC', 'Stripe'] },
    { title: 'Component Design System', year: '2024', techStack: ['React', 'Storybook', 'Radix UI'] },
    { title: 'AI Analytics Dashboard', year: '2023', techStack: ['React', 'Python', 'D3.js'] },
  ],
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add shared profile data for iTerm and ResumeViewer"
```

---

### Task 4: Replace Desktop wallpaper and folder icons

**Files:**
- Modify: `src/components/Desktop/Desktop.tsx`

- [ ] **Step 1: Replace CSS gradient with wallpaper image**

In `src/components/Desktop/Desktop.tsx`, replace the `style` prop on the outer div (lines 42-53):

```typescript
      style={{
        background: `linear-gradient(135deg,
          #ff6b35 0%,
          #ff8c42 15%,
          #ffa726 25%,
          #ffcc02 35%,
          #c5e063 45%,
          #66bb6a 55%,
          #26a69a 65%,
          #42a5f5 75%,
          #5c6bc0 85%,
          #7e57c2 95%
        )`,
      }}
```

with:

```typescript
      style={{
        backgroundImage: 'url(/wallpaper-sonoma.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
```

- [ ] **Step 2: Replace inline SVG folder icon with PNG image**

In the same file, replace the SVG folder icon (lines 85-95):

```tsx
            <svg width="56" height="48" viewBox="0 0 56 48" fill="none">
              <path
                d="M4 8C4 5.79 5.79 4 8 4H22L26 8H48C50.21 8 52 9.79 52 12V40C52 42.21 50.21 44 48 44H8C5.79 44 4 42.21 4 40V8Z"
                fill="#5AC8FA"
              />
              <path
                d="M4 16H52V40C52 42.21 50.21 44 48 44H8C5.79 44 4 42.21 4 40V16Z"
                fill="#40A9FF"
              />
            </svg>
```

with:

```tsx
            <img src="/icons/folder.png" alt={folder.name} width={56} height={48} style={{ objectFit: 'contain' }} draggable={false} />
```

- [ ] **Step 3: Verify the app runs**

```bash
npm run dev
```

Check browser: wallpaper image should show, folder icons should be real PNG.

- [ ] **Step 4: Commit**

```bash
git add src/components/Desktop/Desktop.tsx
git commit -m "feat: replace desktop gradient with Sonoma wallpaper and PNG folder icons"
```

---

### Task 5: Replace Menu Bar icons with PNGs

**Files:**
- Modify: `src/components/MenuBar/MenuBar.tsx`

- [ ] **Step 1: Replace Apple logo SVG with PNG**

In `src/components/MenuBar/MenuBar.tsx`, replace the Apple logo SVG (lines 41-43):

```tsx
            <svg width="14" height="17" viewBox="0 0 814 1000" fill="white">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.3-105.9-207.4-105.9-329.5C0 383.2 65.3 230 177.6 153.2c56.3-38.5 124.7-63.2 197.8-63.2 67.4 0 126.2 42.8 170 42.8 42.2 0 108.2-45.4 184-45.4 29.7 0 136.4 1.8 207.1 70.5zM571 0c11.5 47.9-13.4 97.2-44.1 133.2-30.7 36.1-81.6 64.2-130.6 64.2-5.8-40.8 14.7-97.8 44.1-133.2C470.1 27.3 525.9 0 571 0z" />
            </svg>
```

with:

```tsx
            <img src="/icons/apple-logo.png" alt="Apple" width={14} height={17} style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} draggable={false} />
```

Note: The `filter: brightness(0) invert(1)` makes the icon white to match the menu bar. If the icon is already white, remove the filter. Check after implementation and adjust.

- [ ] **Step 2: Replace right-side SVG icons with PNGs**

Replace the battery SVG (lines 74-78):

```tsx
        {/* Battery */}
        <svg width="22" height="12" viewBox="0 0 25 12" fill="none" className="opacity-80">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="white" strokeWidth="1" />
          <rect x="22" y="3.5" width="2" height="5" rx="1" fill="white" fillOpacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="1" fill="white" fillOpacity="0.8" />
        </svg>
```

with:

```tsx
        {/* Battery */}
        <img src="/icons/battery.png" alt="Battery" className="h-[12px] opacity-80" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
```

Replace the WiFi SVG (lines 81-83):

```tsx
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white" className="opacity-80">
          <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.76 7.28a6.014 6.014 0 018.49 0l-.71.71a5.013 5.013 0 00-7.07 0l-.71-.71zM1.4 4.9a9.02 9.02 0 0113.2 0l-.71.71a8.017 8.017 0 00-11.78 0L1.4 4.9z" transform="translate(0, -3)" />
        </svg>
```

with:

```tsx
        {/* WiFi */}
        <img src="/icons/wifi.png" alt="WiFi" className="h-[12px] opacity-80" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
```

Replace the Search SVG (lines 86-88):

```tsx
        {/* Search/Spotlight */}
        <svg width="14" height="14" viewBox="0 0 20 20" fill="white" className="opacity-80">
          <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z" />
        </svg>
```

with:

```tsx
        {/* Search/Spotlight */}
        <img src="/icons/search.png" alt="Spotlight" className="h-[14px] opacity-80" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
```

Replace the Control Center SVG (lines 91-93):

```tsx
        {/* Control Center */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="opacity-80">
          <path d="M12 3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1V4c0-.55.45-1 1-1zm0 14c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1zm9-5c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1zM7 12c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1z" />
        </svg>
```

with:

```tsx
        {/* Control Center */}
        <img src="/icons/control-center.png" alt="Control Center" className="h-[14px] opacity-80" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
```

- [ ] **Step 3: Visual check — verify icons render white on the menu bar**

```bash
npm run dev
```

Check browser. If any icon appears invisible or wrong color, adjust or remove the `filter` property for that specific icon. The giant-sur icons may already be the correct color.

- [ ] **Step 4: Commit**

```bash
git add src/components/MenuBar/MenuBar.tsx
git commit -m "feat: replace menu bar SVG icons with PNG assets"
```

---

### Task 6: Rewrite Dock with PNG icons, new app list, and bounce animation

**Files:**
- Modify: `src/components/Dock/Dock.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the Dock component**

Replace the entire content of `src/components/Dock/Dock.tsx` with:

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';

interface DockApp {
  id: string;
  name: string;
  icon: string;
  action: 'window' | 'link' | 'bounce';
  appId?: string;
  url?: string;
  windowConfig?: {
    title: string;
    size: { width: number; height: number };
    props?: Record<string, unknown>;
  };
}

const apps: DockApp[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: '/icons/finder.png',
    action: 'window',
    appId: 'finder',
    windowConfig: {
      title: 'Desktop',
      size: { width: 800, height: 500 },
      props: { currentPath: 'desktop' },
    },
  },
  { id: 'safari', name: 'Safari', icon: '/icons/safari.png', action: 'bounce' },
  { id: 'messages', name: 'Messages', icon: '/icons/messages.png', action: 'bounce' },
  { id: 'mail', name: 'Mail', icon: '/icons/mail.png', action: 'bounce' },
  { id: 'photos', name: 'Photos', icon: '/icons/photos.png', action: 'bounce' },
  { id: 'music', name: 'Music', icon: '/icons/music.png', action: 'bounce' },
  { id: 'vscode', name: 'Visual Studio Code', icon: '/icons/vscode.png', action: 'bounce' },
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/github.png',
    action: 'link',
    url: 'https://github.com/Xv-Hyunwoo',
  },
  {
    id: 'iterm',
    name: 'iTerm',
    icon: '/icons/iterm.png',
    action: 'window',
    appId: 'iterm',
    windowConfig: {
      title: 'hyunwoo@portfolio ~ %',
      size: { width: 700, height: 450 },
    },
  },
];

const docItems: DockApp[] = [
  {
    id: 'readme',
    name: 'README.md',
    icon: '/icons/readme-file.png',
    action: 'window',
    appId: 'resume',
    windowConfig: {
      title: 'README.md',
      size: { width: 900, height: 600 },
    },
  },
];

export default function Dock() {
  const { windows, openWindow } = useWindowStore();
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const isRunning = (appId: string) =>
    windows.some((w) => w.appId === appId);

  const handleClick = (app: DockApp) => {
    if (app.action === 'window' && app.appId && app.windowConfig) {
      openWindow({
        id: `${app.appId}-main`,
        appId: app.appId as 'finder' | 'iterm' | 'resume',
        title: app.windowConfig.title,
        position: { x: 100 + Math.random() * 80, y: 60 + Math.random() * 40 },
        size: app.windowConfig.size,
        props: app.windowConfig.props,
      });
    } else if (app.action === 'link' && app.url) {
      window.open(app.url, '_blank');
    } else if (app.action === 'bounce') {
      setBouncingId(app.id);
      setTimeout(() => setBouncingId(null), 600);
    }
  };

  const renderIcon = (app: DockApp) => (
    <div
      key={app.id}
      className="dock-item flex flex-col items-center cursor-default"
      onClick={() => handleClick(app)}
      title={app.name}
    >
      <motion.div
        className="w-[48px] h-[48px] flex items-center justify-center"
        animate={
          bouncingId === app.id
            ? { y: [0, -30, 0, -15, 0, -5, 0] }
            : { y: 0 }
        }
        transition={
          bouncingId === app.id
            ? { duration: 0.6, ease: 'easeInOut' }
            : undefined
        }
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-[46px] h-[46px] rounded-[11px]"
          style={{ objectFit: 'contain' }}
          draggable={false}
        />
      </motion.div>
      {isRunning(app.appId || app.id) && (
        <div className="w-1 h-1 rounded-full bg-white/80 mt-[1px]" />
      )}
    </div>
  );

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div className="dock-container flex items-end gap-[2px]">
        {apps.map(renderIcon)}

        {/* Separator */}
        <div className="w-[1px] h-[40px] bg-white/20 mx-1 self-center" />

        {docItems.map(renderIcon)}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the app runs and Dock shows PNG icons**

```bash
npm run dev
```

Check browser: Dock should show real app icons with the separator before the README document icon. Clicking inactive apps should trigger bounce. Clicking Finder/iTerm/README should open windows. Clicking GitHub should open a new tab.

- [ ] **Step 3: Commit**

```bash
git add src/components/Dock/Dock.tsx
git commit -m "feat: rewrite Dock with PNG icons, bounce animation, and new app list"
```

---

### Task 7: Create iTerm component

**Files:**
- Create: `src/components/iTerm/iTerm.tsx`

- [ ] **Step 1: Create the iTerm component**

Create `src/components/iTerm/iTerm.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/iTerm/iTerm.tsx
git commit -m "feat: create iTerm terminal component with typing animation"
```

---

### Task 8: Create ResumeViewer component

**Files:**
- Create: `src/components/ResumeViewer/ResumeViewer.tsx`

- [ ] **Step 1: Create the ResumeViewer component**

Create `src/components/ResumeViewer/ResumeViewer.tsx`:

```tsx
import { profile } from '../../data/profile';

export default function ResumeViewer() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: '#f5f5f5' }}>
      <div
        className="mx-auto my-6 bg-white rounded-lg"
        style={{
          maxWidth: 860,
          padding: '40px 48px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          color: '#1a1a1a',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          {/* Profile Photo Placeholder */}
          <div
            className="shrink-0 w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: '#e0e0e0' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#999">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* Name & Contact */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#111' }}>
              {profile.name}
            </h1>
            <p className="text-lg mt-1" style={{ color: '#555' }}>
              {profile.title}
            </p>
            <div className="flex items-center gap-3 mt-3 text-sm" style={{ color: '#666' }}>
              <span>{profile.email}</span>
              <span style={{ color: '#ccc' }}>|</span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: '#0066cc', cursor: 'pointer' }}
              >
                GitHub
              </a>
              <span style={{ color: '#ccc' }}>|</span>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: '#0066cc', cursor: 'pointer' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 24px' }} />

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left: About */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#888' }}>
              About
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              {profile.about}
            </p>
          </div>

          {/* Right: Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#888' }}>
              Skills
            </h2>
            <div className="flex flex-col gap-2">
              {profile.skills.map((skill) => (
                <div key={skill.category} className="text-sm">
                  <span className="font-semibold" style={{ color: '#333' }}>
                    {skill.category}:
                  </span>{' '}
                  <span style={{ color: '#555' }}>{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />

        {/* Projects */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#888' }}>
            Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {profile.projects.map((project) => (
              <div
                key={project.title}
                className="p-3 rounded-lg"
                style={{ background: '#fafafa', border: '1px solid #eee' }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold" style={{ color: '#222' }}>
                    {project.title}
                  </span>
                  <span className="text-xs" style={{ color: '#999' }}>
                    {project.year}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: '#eef2ff', color: '#4f46e5' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />

        {/* Contact Footer */}
        <div className="text-center text-sm" style={{ color: '#888' }}>
          <a href={`mailto:${profile.email}`} className="hover:underline" style={{ color: '#0066cc', cursor: 'pointer' }}>
            {profile.email}
          </a>
          {' · '}
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#0066cc', cursor: 'pointer' }}>
            GitHub
          </a>
          {' · '}
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#0066cc', cursor: 'pointer' }}>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ResumeViewer/ResumeViewer.tsx
git commit -m "feat: create ResumeViewer component with horizontal CV layout"
```

---

### Task 9: Register new apps in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import new components and add them to the window renderer**

In `src/App.tsx`, add imports at the top:

```typescript
import ITerm from './components/iTerm/iTerm';
import ResumeViewer from './components/ResumeViewer/ResumeViewer';
```

Then add new app renderers inside the `windows.map()` callback, after the PDFViewer block (after line 31):

```tsx
          {win.appId === 'iterm' && <ITerm />}
          {win.appId === 'resume' && <ResumeViewer />}
```

- [ ] **Step 2: Verify the full app works end to end**

```bash
npm run dev
```

Check:
1. Dock shows all PNG icons
2. Click Finder → Finder window opens with PNG folder icons
3. Click iTerm → iTerm window opens with typing animation
4. Click README file → ResumeViewer opens with formatted CV
5. Click GitHub → opens GitHub profile in new tab
6. Click Safari/Messages/Mail/Photos/Music/VS Code → bounce animation, no window
7. Wallpaper shows Sonoma landscape
8. Menu bar shows PNG icons

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: register iTerm and ResumeViewer apps in main App component"
```

---

### Task 10: Final visual polish and cleanup

**Files:**
- Modify: `src/components/Finder/Finder.tsx` (replace inline SVG folder icons in Finder file grid)

- [ ] **Step 1: Replace Finder's inline SVG folder/file icons with PNGs**

In `src/components/Finder/Finder.tsx`, replace the `FileIcon` component (around line 195-223) with:

```tsx
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
```

- [ ] **Step 2: Visual check — everything looks cohesive**

```bash
npm run dev
```

Walk through the full app. Verify:
- No remaining crude inline SVG icons in the Dock
- Finder folder icons match desktop folder icons
- All windows open/close/drag correctly
- No console errors

- [ ] **Step 3: Final build check**

```bash
npm run build
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Finder/Finder.tsx
git commit -m "feat: replace Finder folder icons with PNG assets"
```
