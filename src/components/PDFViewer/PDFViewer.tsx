import { useFileSystemStore } from '../../stores/fileSystemStore';

interface PDFViewerProps {
  fileId: string;
}

export default function PDFViewer({ fileId }: PDFViewerProps) {
  const { getNode } = useFileSystemStore();
  const node = getNode(fileId);

  if (!node?.projectData) {
    return (
      <div className="pdf-viewer flex items-center justify-center text-white/50">
        File not found
      </div>
    );
  }

  const { projectData } = node;

  return (
    <div className="pdf-viewer overflow-y-auto">
      {/* Toolbar */}
      <div className="h-8 bg-[#2d2d2d] border-b border-white/10 flex items-center px-4 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" fillOpacity="0.5">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" fillOpacity="0.5">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
        <div className="flex-1 text-center text-[12px] text-white/50">
          {node.name}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-6" style={{ background: '#1e1e1e' }}>
        <div className="pdf-page">
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {projectData.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
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
            <div className="mt-8 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white/70 mb-2">Links</h3>
              <div className="flex gap-3">
                {projectData.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline"
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
