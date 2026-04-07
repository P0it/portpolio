import { profile } from '../../data/profile';

export default function ResumeViewer() {
  return (
    <div className="h-full overflow-y-auto rounded-b-[10px]" style={{ background: '#f5f5f5' }}>
      <div
        className="mx-auto bg-white rounded-lg"
        style={{
          maxWidth: 860,
          margin: '24px auto',
          padding: '48px 56px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          color: '#1a1a1a',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Header */}
        <div className="flex items-start" style={{ gap: 28, marginBottom: 28 }}>
          {/* Profile Photo Placeholder */}
          <div
            className="shrink-0 rounded-full flex items-center justify-center"
            style={{ width: 100, height: 100, background: '#e0e0e0' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#999">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* Name & Contact */}
          <div className="flex-1">
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#111', margin: 0 }}>
              {profile.name}
            </h1>
            <p style={{ fontSize: 18, color: '#555', marginTop: 4 }}>
              {profile.title}
            </p>
            <div className="flex items-center" style={{ gap: 12, marginTop: 14, fontSize: 14, color: '#666' }}>
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

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 28px' }} />

        {/* Two column layout */}
        <div className="grid grid-cols-2" style={{ gap: 36 }}>
          {/* Left: About */}
          <div>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 14 }}>
              About
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#444' }}>
              {profile.about}
            </p>
          </div>

          {/* Right: Skills */}
          <div>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 14 }}>
              Skills
            </h2>
            <div className="flex flex-col" style={{ gap: 10 }}>
              {profile.skills.map((skill) => (
                <div key={skill.category} style={{ fontSize: 14 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>
                    {skill.category}:
                  </span>{' '}
                  <span style={{ color: '#555' }}>{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '28px 0' }} />

        {/* Projects */}
        <div>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 14 }}>
            Projects
          </h2>
          <div className="grid grid-cols-2" style={{ gap: 16 }}>
            {profile.projects.map((project) => (
              <div
                key={project.title}
                className="rounded-lg"
                style={{ background: '#fafafa', border: '1px solid #eee', padding: '14px 18px' }}
              >
                <div className="flex items-baseline justify-between">
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>
                    {project.title}
                  </span>
                  <span style={{ fontSize: 12, color: '#999' }}>
                    {project.year}
                  </span>
                </div>
                <div className="flex flex-wrap" style={{ gap: 6, marginTop: 10 }}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full"
                      style={{ background: '#eef2ff', color: '#4f46e5', fontSize: 12, padding: '4px 12px' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '28px 0' }} />

        {/* Contact Footer */}
        <div className="text-center" style={{ fontSize: 14, color: '#888' }}>
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
