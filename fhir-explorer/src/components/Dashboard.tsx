import { Link } from 'react-router-dom';
import { Users, Search, BookOpen, Activity, Database, ArrowRight, Server } from 'lucide-react';
import { useCapabilityStatement, usePatientSearch } from '../hooks/useFhir';

export function Dashboard() {
  const { data: capability, isLoading: capLoading } = useCapabilityStatement();
  const { data: patientsBundle, isLoading: patientsLoading } = usePatientSearch({ _count: 5 });

  const recentPatients = patientsBundle?.entry?.slice(0, 5) || [];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>FHIR Explorer Dashboard</h1>
          <p className="subtitle">
            Welcome! This application helps you learn FHIR by exploring real healthcare data
            from a public test server.
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="welcome-card">
        <div className="welcome-content">
          <h2>Learn FHIR by Doing</h2>
          <p>
            FHIR (Fast Healthcare Interoperability Resources) is the modern standard for
            exchanging healthcare data. This app connects to a live FHIR server so you can
            explore real resources, understand data structures, and learn how to build
            healthcare applications.
          </p>
          <div className="welcome-actions">
            <Link to="/learn" className="btn-primary">
              <BookOpen size={18} />
              Start Learning
            </Link>
            <Link to="/explorer" className="btn-secondary">
              <Search size={18} />
              Try the API
            </Link>
          </div>
        </div>
        <div className="welcome-illustration">
          <Activity size={120} strokeWidth={1} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Server size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">FHIR Server</span>
            <span className="stat-value">
              {capLoading ? 'Loading...' : capability?.software?.name || 'HAPI FHIR'}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">FHIR Version</span>
            <span className="stat-value">
              {capLoading ? 'Loading...' : capability?.fhirVersion || 'R4'}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Database size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Supported Resources</span>
            <span className="stat-value">
              {capLoading ? 'Loading...' : capability?.rest?.[0]?.resource?.length || '0'}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Sample Patients</span>
            <span className="stat-value">
              {patientsLoading ? 'Loading...' : patientsBundle?.total || 'Many'}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <h2 className="section-title">Explore FHIR</h2>
      <div className="feature-grid">
        <Link to="/patients" className="feature-card">
          <div className="feature-icon">
            <Users size={32} />
          </div>
          <h3>Browse Patients</h3>
          <p>
            Explore Patient resources - the core of any healthcare system.
            See demographics, identifiers, and linked clinical data.
          </p>
          <span className="feature-link">
            View Patients <ArrowRight size={16} />
          </span>
        </Link>

        <Link to="/explorer" className="feature-card">
          <div className="feature-icon">
            <Search size={32} />
          </div>
          <h3>API Explorer</h3>
          <p>
            Execute FHIR queries directly and see raw JSON responses.
            Learn the RESTful API patterns.
          </p>
          <span className="feature-link">
            Open Explorer <ArrowRight size={16} />
          </span>
        </Link>

        <Link to="/learn" className="feature-card">
          <div className="feature-icon">
            <BookOpen size={32} />
          </div>
          <h3>Learn FHIR</h3>
          <p>
            Comprehensive guide to FHIR concepts: resources, references,
            data types, search, and security.
          </p>
          <span className="feature-link">
            Start Learning <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      {/* Recent Patients */}
      {recentPatients.length > 0 && (
        <>
          <div className="section-header">
            <h2 className="section-title">Recent Patients</h2>
            <Link to="/patients" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="recent-patients">
            {recentPatients.map((entry: fhir4.BundleEntry) => {
              const patient = entry.resource as fhir4.Patient;
              const name = patient.name?.[0];
              const displayName = name
                ? `${name.given?.join(' ') || ''} ${name.family || ''}`.trim()
                : 'Unknown';

              return (
                <Link
                  key={patient.id}
                  to={`/patients/${patient.id}`}
                  className="recent-patient-card"
                >
                  <div className="patient-avatar-small">
                    <Users size={16} />
                  </div>
                  <div className="patient-info">
                    <span className="patient-name">{displayName}</span>
                    <span className="patient-id">ID: {patient.id}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* FHIR Concepts Quick Reference */}
      <h2 className="section-title">FHIR Quick Reference</h2>
      <div className="quick-ref-grid">
        <div className="quick-ref-card">
          <h4>Common Resource Types</h4>
          <div className="resource-tags">
            <span className="tag">Patient</span>
            <span className="tag">Observation</span>
            <span className="tag">Condition</span>
            <span className="tag">MedicationRequest</span>
            <span className="tag">Encounter</span>
            <span className="tag">Practitioner</span>
          </div>
        </div>

        <div className="quick-ref-card">
          <h4>RESTful Operations</h4>
          <div className="operations-list">
            <code>GET /Patient</code>
            <code>GET /Patient/[id]</code>
            <code>POST /Patient</code>
            <code>PUT /Patient/[id]</code>
          </div>
        </div>

        <div className="quick-ref-card">
          <h4>Search Examples</h4>
          <div className="operations-list">
            <code>/Patient?name=Smith</code>
            <code>/Observation?patient=123</code>
            <code>/Condition?code=http://snomed.info/sct|123456</code>
          </div>
        </div>
      </div>
    </div>
  );
}
