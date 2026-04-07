import { useFileSystemStore } from '../../stores/fileSystemStore';

interface PDFViewerProps {
  fileId: string;
}

export default function PDFViewer({ fileId }: PDFViewerProps) {
  const node = useFileSystemStore((s) => s.nodes[fileId]);

  if (!node?.projectData) {
    return (
      <div className="pdf-viewer flex items-center justify-center text-white/50">
        File not found
      </div>
    );
  }

  const { projectData } = node;

  return (
    <div className="pdf-viewer overflow-y-auto rounded-b-[10px]">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center border-b border-white/10" style={{ height: 36, background: '#2d2d2d', padding: '0 20px' }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" fillOpacity="0.5">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" fillOpacity="0.5">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
        <div className="flex-1 text-center text-white/50" style={{ fontSize: 12 }}>
          {node.name}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto" style={{ background: '#1e1e1e', padding: '24px 28px' }}>
        <div className="pdf-page">
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 24 }}>
            {projectData.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full font-medium border border-blue-500/30"
                style={{ padding: '5px 14px', fontSize: 12, background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Rendered HTML content */}
          <div
            className="pdf-content"
            dangerouslySetInnerHTML={{ __html: projectData.content }}
          />

          {/* Links */}
          {projectData.links && projectData.links.length > 0 && (
            <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Links</h3>
              <div className="flex" style={{ gap: 12 }}>
                {projectData.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: '#60a5fa', fontSize: 14 }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
