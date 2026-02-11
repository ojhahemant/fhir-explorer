import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

interface JsonViewerProps {
  data: unknown;
  title?: string;
  collapsed?: boolean;
}

export function JsonViewer({ data, title, collapsed = false }: JsonViewerProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="json-viewer">
      <div className="json-viewer-header">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="json-toggle"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          <span>{title || 'FHIR Resource (JSON)'}</span>
        </button>
        <button onClick={handleCopy} className="copy-btn" title="Copy JSON">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      {!isCollapsed && (
        <pre className="json-content">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}

// Inline syntax-highlighted JSON viewer
export function JsonHighlighter({ data }: { data: unknown }) {
  const highlightJson = (obj: unknown, indent: number = 0): ReactNode[] => {
    const elements: ReactNode[] = [];
    const spaces = '  '.repeat(indent);

    if (obj === null) {
      return [<span key="null" className="json-null">null</span>];
    }

    if (typeof obj === 'boolean') {
      return [<span key="bool" className="json-boolean">{obj.toString()}</span>];
    }

    if (typeof obj === 'number') {
      return [<span key="num" className="json-number">{obj}</span>];
    }

    if (typeof obj === 'string') {
      return [<span key="str" className="json-string">"{obj}"</span>];
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return [<span key="empty-arr">[]</span>];
      }
      elements.push(<span key="arr-open">[</span>);
      obj.forEach((item, i) => {
        elements.push(<br key={`br-${i}`} />);
        elements.push(<span key={`space-${i}`}>{spaces}  </span>);
        elements.push(...highlightJson(item, indent + 1));
        if (i < obj.length - 1) {
          elements.push(<span key={`comma-${i}`}>,</span>);
        }
      });
      elements.push(<br key="arr-close-br" />);
      elements.push(<span key="arr-close">{spaces}]</span>);
      return elements;
    }

    if (typeof obj === 'object') {
      const keys = Object.keys(obj as object);
      if (keys.length === 0) {
        return [<span key="empty-obj">{'{}'}</span>];
      }
      elements.push(<span key="obj-open">{'{'}</span>);
      keys.forEach((key, i) => {
        elements.push(<br key={`br-${key}`} />);
        elements.push(<span key={`space-${key}`}>{spaces}  </span>);
        elements.push(<span key={`key-${key}`} className="json-key">"{key}"</span>);
        elements.push(<span key={`colon-${key}`}>: </span>);
        elements.push(...highlightJson((obj as Record<string, unknown>)[key], indent + 1));
        if (i < keys.length - 1) {
          elements.push(<span key={`comma-${key}`}>,</span>);
        }
      });
      elements.push(<br key="obj-close-br" />);
      elements.push(<span key="obj-close">{spaces}{'}'}</span>);
      return elements;
    }

    return [<span key="unknown">{String(obj)}</span>];
  };

  return (
    <pre className="json-highlighted">
      <code>{highlightJson(data)}</code>
    </pre>
  );
}
