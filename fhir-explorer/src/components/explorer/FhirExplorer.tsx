import { useState } from 'react';
import { Play, Book, Server, AlertCircle } from 'lucide-react';
import { fhirClient } from '../../services/fhirClient';
import { COMMON_RESOURCE_TYPES } from '../../types/fhir-helpers';
import { JsonViewer } from '../common/JsonViewer';
import { LoadingSpinner } from '../common/LoadingSpinner';

const EXAMPLE_QUERIES = [
  { label: 'Get Server Capabilities', path: '/metadata', description: 'CapabilityStatement - what the server can do' },
  { label: 'Search All Patients', path: '/Patient?_count=5', description: 'Returns a Bundle of Patient resources' },
  { label: 'Search Patients by Name', path: '/Patient?name=Smith&_count=5', description: 'Search with name parameter' },
  { label: 'Get Patient by ID', path: '/Patient/example', description: 'Read a specific Patient resource' },
  { label: 'Search Observations', path: '/Observation?_count=5', description: 'Returns Observation resources' },
  { label: 'Search Conditions', path: '/Condition?_count=5', description: 'Returns Condition resources' },
  { label: 'Search Medications', path: '/MedicationRequest?_count=5', description: 'Returns MedicationRequest resources' },
  { label: 'Search Practitioners', path: '/Practitioner?_count=5', description: 'Returns Practitioner resources' },
];

export function FhirExplorer() {
  const [query, setQuery] = useState('/Patient?_count=5');
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpInfo, setHttpInfo] = useState<{ method: string; url: string; status?: number } | null>(null);

  const executeQuery = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const fullUrl = `${fhirClient.getBaseUrl()}${query}`;
    setHttpInfo({ method: 'GET', url: fullUrl });

    try {
      const data = await fhirClient.rawQuery(query);
      setResult(data);
      setHttpInfo(prev => prev ? { ...prev, status: 200 } : null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setHttpInfo(prev => prev ? { ...prev, status: 400 } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (path: string) => {
    setQuery(path);
  };

  return (
    <div className="fhir-explorer">
      <div className="page-header">
        <div>
          <h1>FHIR API Explorer</h1>
          <p className="subtitle">
            Execute FHIR queries and see the raw responses. Learn how FHIR RESTful APIs work.
          </p>
        </div>
      </div>

      {/* Learning Card */}
      <div className="learn-card">
        <h3><Book size={20} /> Understanding FHIR RESTful API</h3>
        <p>
          FHIR uses standard HTTP methods for operations:
        </p>
        <ul className="api-methods">
          <li><code>GET /[type]</code> - Search resources</li>
          <li><code>GET /[type]/[id]</code> - Read a specific resource</li>
          <li><code>POST /[type]</code> - Create a new resource</li>
          <li><code>PUT /[type]/[id]</code> - Update a resource</li>
          <li><code>DELETE /[type]/[id]</code> - Delete a resource</li>
        </ul>
        <p>
          Search results return a <code>Bundle</code> resource containing matched resources in the <code>entry</code> array.
        </p>
      </div>

      {/* Server Info */}
      <div className="server-info">
        <Server size={16} />
        <span>Connected to: <strong>{fhirClient.getBaseUrl()}</strong></span>
      </div>

      {/* Query Builder */}
      <div className="query-builder">
        <div className="query-input-group">
          <span className="base-url">{fhirClient.getBaseUrl()}</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="/Patient?name=Smith"
            className="query-input"
          />
          <button onClick={executeQuery} disabled={isLoading} className="btn-primary">
            <Play size={16} />
            Execute
          </button>
        </div>
      </div>

      {/* Example Queries */}
      <div className="example-queries">
        <h3>Example Queries</h3>
        <div className="examples-grid">
          {EXAMPLE_QUERIES.map((example, i) => (
            <button
              key={i}
              onClick={() => handleExampleClick(example.path)}
              className="example-btn"
            >
              <span className="example-label">{example.label}</span>
              <code className="example-path">{example.path}</code>
              <span className="example-desc">{example.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resource Types Reference */}
      <div className="resource-types-ref">
        <h3>Common Resource Types</h3>
        <div className="resource-chips">
          {COMMON_RESOURCE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setQuery(`/${type}?_count=5`)}
              className="resource-chip"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* HTTP Info */}
      {httpInfo && (
        <div className="http-info">
          <span className="http-method">{httpInfo.method}</span>
          <span className="http-url">{httpInfo.url}</span>
          {httpInfo.status && (
            <span className={`http-status ${httpInfo.status < 400 ? 'success' : 'error'}`}>
              {httpInfo.status}
            </span>
          )}
        </div>
      )}

      {/* Results */}
      <div className="query-results">
        {isLoading && <LoadingSpinner message="Executing FHIR query..." />}

        {error && (
          <div className="error-result">
            <AlertCircle size={20} />
            <div>
              <strong>Error:</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {result !== null && (
          <div className="result-container">
            <ResultSummary data={result} />
            <JsonViewer data={result} title="Response Body" />
          </div>
        )}
      </div>
    </div>
  );
}

function ResultSummary({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') return null;

  const resource = data as Record<string, unknown>;
  const resourceType = resource.resourceType as string;

  if (resourceType === 'Bundle') {
    const bundle = data as fhir4.Bundle;
    return (
      <div className="result-summary">
        <h4>Bundle Summary</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Type</span>
            <span className="summary-value">{bundle.type}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total</span>
            <span className="summary-value">{bundle.total ?? 'N/A'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Entries</span>
            <span className="summary-value">{bundle.entry?.length ?? 0}</span>
          </div>
        </div>
        {bundle.entry && bundle.entry.length > 0 && (
          <div className="entry-types">
            <strong>Resource types in this bundle:</strong>
            <div className="resource-chips">
              {[...new Set(bundle.entry.map((e: fhir4.BundleEntry) => e.resource?.resourceType))].map((type: string | undefined) => (
                <span key={type} className="resource-chip-small">{type}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (resourceType === 'CapabilityStatement') {
    const cap = data as fhir4.CapabilityStatement;
    return (
      <div className="result-summary">
        <h4>Server Capabilities</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">FHIR Version</span>
            <span className="summary-value">{cap.fhirVersion}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Software</span>
            <span className="summary-value">{cap.software?.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Supported Resources</span>
            <span className="summary-value">
              {cap.rest?.[0]?.resource?.length ?? 0}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Single resource
  return (
    <div className="result-summary">
      <h4>{resourceType} Resource</h4>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">ID</span>
          <span className="summary-value">{resource.id as string}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Resource Type</span>
          <span className="summary-value">{resourceType}</span>
        </div>
      </div>
    </div>
  );
}
