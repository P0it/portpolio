# macOS Portfolio Visual Upgrade - Design Spec

## Goal

Transform the macOS desktop simulator portfolio from crude inline SVGs and CSS gradients into a high-fidelity macOS experience using real image assets, while adding two new apps (iTerm, ResumeViewer). Priority: first impression > technical showcase.

## Target Audience

- Recruiters / hiring managers (first impression matters most)
- Developers evaluating frontend skills (interaction quality as proof)

## Approach: Hybrid

Real image assets (icons, wallpaper) for instant realism. Code-driven glassmorphism, animations, and interactions for technical showcase.

---

## 1. Asset Replacement

### 1.1 Wallpaper

- **File**: `public/wallpaper-sonoma.jpg` (user-provided macOS Sonoma landscape, 3840x2160)
- **Implementation**: Replace CSS gradient in Desktop.tsx with `background-image: url(/wallpaper-sonoma.jpg); background-size: cover; background-position: center;`

### 1.2 Dock Icons (PNG)

Source: `gianlucajahn/macOS-react` and `soroushchehresa/giant-sur` repos.

Stored in `public/icons/`.

| Icon | Source | Dock Action |
|------|--------|-------------|
| `finder.png` | giant-sur `finder-logo.png` | Opens Finder app |
| `safari.png` | giant-sur `safari-logo.png` | Inactive (bounce animation only) |
| `messages.png` | giant-sur `messages-logo.png` | Inactive |
| `mail.png` | giant-sur `mail-logo.png` | Inactive |
| `photos.png` | giant-sur `photos-logo.png` | Inactive |
| `music.png` | giant-sur `music-logo.png` | Inactive |
| `vscode.png` | macOS-react `vscode.png` | Inactive |
| `github.png` | macOS-react `github.png` | Opens GitHub profile in new tab |
| `iterm.png` | User-provided | Opens iTerm app |
| --- (separator) | | |
| `readme-file.png` | macOS document file icon (white page with folded corner) | Opens ResumeViewer app |

### 1.3 Desktop Folder Icons

- Replace inline SVG folder with `public/icons/folder.png` from giant-sur `folder-icon.png`

### 1.4 Menu Bar Icons

- Apple logo: from giant-sur `apple-logo.png`
- WiFi: from giant-sur `wifi-icon.png`
- Battery: from giant-sur `battery-icon.png`
- Search/Spotlight: from giant-sur `magnifier-icon.png`
- Control Center: from giant-sur `control-center-icon.png`

---

## 2. New Component: iTerm

### Purpose
Terminal-style self-introduction. Same content as ResumeViewer, different presentation.

### Visual Design
- Dark background: `#1d1f21`
- Font: monospace (Menlo, Monaco, or system monospace)
- Green prompt color: `#22c55e`
- White text output

### Behavior
- Opens from Dock icon click
- Line-by-line typing animation (fast, not character-by-character)
- Content auto-plays on open

### Content Structure
```
$ cat about.md

  JUNG, HYUNWOO
  Full-Stack Developer

$ echo $TECH_STACK
  Frontend:  React, Next.js, TypeScript, Tailwind CSS
  Backend:   Node.js, Python, Go, FastAPI
  Database:  PostgreSQL, MongoDB, Redis
  DevOps:    Docker, Kubernetes, AWS
  AI/ML:     Claude API, LangGraph, Vercel AI SDK

$ cat contact.json
  {
    "email": "placeholder@email.com",
    "github": "github.com/Xv-Hyunwoo",
    "linkedin": "linkedin.com/in/placeholder"
  }

$ echo "Thanks for visiting!"
```

- Links are clickable (open in new tab)
- Typing speed: line-by-line, ~50ms between lines for commands, ~30ms for output lines

### Window Config
- Default size: 700x450
- Title: "hyunwoo@portfolio ~ %"

---

## 3. New Component: ResumeViewer

### Purpose
Formatted CV/resume document. Same content as iTerm, presented as a professional document.

### Visual Design
- White background A4-style document
- Subtle drop shadow around document
- Clean typography (system sans-serif)
- Horizontal layout utilizing full window width

### Layout (2-column)
```
+------------------------------------------------------------------+
|                                                                    |
|  [Photo]    JUNG, HYUNWOO                                         |
|  placeholder Full-Stack Developer                                  |
|              email | github | linkedin                             |
|                                                                    |
|  ----------------------------------------------------------       |
|                                                                    |
|  ABOUT                           |  SKILLS                         |
|  Self-intro 2-3 lines            |  Frontend: React, Next.js ...   |
|                                  |  Backend:  Node.js, Go ...      |
|                                  |  DevOps:   Docker, K8s ...      |
|  --------------------------------+-------------------------------   |
|                                                                    |
|  PROJECTS                                    CONTACT               |
|  Project summaries in grid       |  Clickable links                |
|                                                                    |
+------------------------------------------------------------------+
```

- All links clickable (open in new tab)
- Scrollable if content exceeds window height
- Profile photo: gray placeholder circle with camera icon

### Window Config
- Default size: 900x600
- Title: "README.md"

---

## 4. Dock Updates

### Structure
```
[Finder] [Safari] [Messages] [Mail] [Photos] [Music] [VS Code] [GitHub] [iTerm] | [README file]
```

- Separator divides apps (left) from documents (right), matching real macOS behavior
- Each icon: PNG image replacing current inline SVG
- Running indicator (white dot) shown for open apps
- Magnification animation: keep current implementation

### Icon Click Behavior
| Icon | Action |
|------|--------|
| Finder | `openWindow({ appId: 'finder', ... })` |
| Safari | Dock bounce animation, no window |
| Messages | Dock bounce animation, no window |
| Mail | Dock bounce animation, no window |
| Photos | Dock bounce animation, no window |
| Music | Dock bounce animation, no window |
| VS Code | Dock bounce animation, no window |
| GitHub | `window.open('https://github.com/Xv-Hyunwoo', '_blank')` |
| iTerm | `openWindow({ appId: 'iterm', ... })` |
| README | `openWindow({ appId: 'resume', ... })` |

### Bounce Animation (inactive apps)
- 3 bounces using `framer-motion` `animate` with `y` keyframes: `[0, -30, 0, -15, 0, -5, 0]`
- Duration: ~0.6s
- Triggered on click, no window opens

---

## 5. Menu Bar Updates

- Replace inline SVG Apple logo with `apple-logo.png`
- Replace inline SVG system icons with PNGs (WiFi, battery, search, control center)
- Keep existing blur/glass effect (already good)
- Keep existing clock functionality

---

## 6. Window Styling

- Keep current AppWindow component (traffic lights, drag, resize)
- Keep existing glassmorphism and shadow (already adequate)
- No changes needed beyond what new apps require

---

## 7. File Structure Changes

```
public/
  wallpaper-sonoma.jpg          (user-provided, 3840x2160)
  icons/
    finder.png                  (from giant-sur)
    safari.png                  (from giant-sur)
    messages.png                (from giant-sur)
    mail.png                    (from giant-sur)
    photos.png                  (from giant-sur)
    music.png                   (from giant-sur)
    vscode.png                  (from macOS-react)
    github.png                  (from macOS-react)
    iterm.png                   (user-provided)
    readme-file.png             (file document icon)
    folder.png                  (from giant-sur)
    apple-logo.png              (from giant-sur)
    wifi.png                    (from giant-sur)
    battery.png                 (from giant-sur)
    search.png                  (from giant-sur)
    control-center.png          (from giant-sur)
src/
  components/
    iTerm/
      iTerm.tsx                 (new)
    ResumeViewer/
      ResumeViewer.tsx          (new)
```

---

## 8. Data / Content

- iTerm and ResumeViewer share the same personal data
- Create `src/data/profile.ts` with centralized profile info:
  - name, title, email, github, linkedin
  - about text
  - skills (categorized)
  - project summaries
- Both components consume from this single source

---

## Out of Scope

- Boot animation / login screen
- Wallpaper switching UI
- Spotlight search functionality
- Control Center panel
- Notification Center
- Sound effects
- Context menu redesign (keep current)
