import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Calendar, MapPin, RefreshCw } from 'lucide-react';
import { usePatientSearch } from '../../hooks/useFhir';
import { getPatientDisplayName, getPatientAge, formatAddress, getGenderDisplay } from '../../types/fhir-helpers';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { JsonViewer } from '../common/JsonViewer';

export function PatientList() {
  const [searchName, setSearchName] = useState('');
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const [showRawJson, setShowRawJson] = useState(false);

  const { data: bundle, isLoading, error, refetch } = usePatientSearch(searchParams);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchName.trim()) {
      setSearchParams({ name: searchName.trim() });
    } else {
      setSearchParams({});
    }
  };

  const patients = bundle?.entry?.map((e: fhir4.BundleEntry) => e.resource as fhir4.Patient) || [];
  const totalCount = bundle?.total;

  return (
    <div className="patient-list">
      <div className="page-header">
        <div>
          <h1>Patient Resources</h1>
          <p className="subtitle">
            Search and explore Patient resources from the FHIR server.
            Each patient is a FHIR Resource with standardized fields.
          </p>
        </div>
        <button onClick={() => refetch()} className="icon-btn" title="Refresh">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* FHIR Learning Card */}
      <div className="learn-card">
        <h3>Understanding Patient Resources</h3>
        <p>
          The <code>Patient</code> resource is one of the most fundamental resources in FHIR.
          It contains demographics and administrative information about an individual receiving care.
        </p>
        <div className="code-example">
          <strong>Example FHIR Search:</strong>
          <code>GET /Patient?name=Smith&_count=20</code>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Search</button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setSearchName('');
            setSearchParams({});
          }}
        >
          Clear
        </button>
      </form>

      {/* Results */}
      {isLoading && <LoadingSpinner message="Fetching patients from FHIR server..." />}

      {error && (
        <ErrorMessage
          message={`Failed to fetch patients: ${(error as Error).message}`}
          onRetry={() => refetch()}
        />
      )}

      {bundle && (
        <>
          <div className="results-header">
            <span>
              Found {totalCount !== undefined ? totalCount : patients.length} patients
            </span>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showRawJson}
                onChange={(e) => setShowRawJson(e.target.checked)}
              />
              Show Raw FHIR Bundle
            </label>
          </div>

          {showRawJson && (
            <JsonViewer data={bundle} title="FHIR Bundle (Search Result)" />
          )}

          <div className="patient-grid">
            {patients.map((patient: fhir4.Patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>

          {patients.length === 0 && (
            <div className="empty-state">
              <User size={48} />
              <p>No patients found. Try a different search term.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface PatientCardProps {
  patient: fhir4.Patient;
}

function PatientCard({ patient }: PatientCardProps) {
  const name = getPatientDisplayName(patient);
  const age = getPatientAge(patient.birthDate);
  const address = formatAddress(patient.address?.[0]);
  const gender = getGenderDisplay(patient.gender);

  return (
    <Link to={`/patients/${patient.id}`} className="patient-card">
      <div className="patient-card-header">
        <div className="patient-avatar">
          <User size={24} />
        </div>
        <div>
          <h3>{name}</h3>
          <span className="patient-id">ID: {patient.id}</span>
        </div>
      </div>

      <div className="patient-card-details">
        <div className="detail-row">
          <Calendar size={16} />
          <span>
            {patient.birthDate || 'Unknown DOB'}
            {age !== null && ` (${age} years)`}
          </span>
        </div>
        <div className="detail-row">
          <User size={16} />
          <span>{gender}</span>
        </div>
        <div className="detail-row">
          <MapPin size={16} />
          <span className="truncate">{address}</span>
        </div>
      </div>

      <div className="patient-card-footer">
        <span className="resource-type">Patient Resource</span>
      </div>
    </Link>
  );
}
