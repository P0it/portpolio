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
