import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, Phone, Mail, Activity, FileText, Pill } from 'lucide-react';
import { usePatient, useObservationSearch, useConditions, useMedicationRequests } from '../../hooks/useFhir';
import {
  getPatientDisplayName,
  getPatientAge,
  formatAddress,
  getGenderDisplay,
  formatFhirDate,
  getObservationValue,
  getCodeableConceptDisplay,
  formatFhirDateTime,
} from '../../types/fhir-helpers';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { JsonViewer } from '../common/JsonViewer';
import { useState } from 'react';

export function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'observations' | 'conditions' | 'medications' | 'json'>('overview');

  const { data: patient, isLoading, error } = usePatient(id);
  const { data: observationsBundle } = useObservationSearch(id);
  const { data: conditionsBundle } = useConditions(id);
  const { data: medicationsBundle } = useMedicationRequests(id);

  if (isLoading) return <LoadingSpinner message="Loading patient data..." />;
  if (error) return <ErrorMessage message={`Failed to load patient: ${(error as Error).message}`} />;
  if (!patient) return <ErrorMessage message="Patient not found" />;

  const observations = observationsBundle?.entry?.map((e: fhir4.BundleEntry) => e.resource as fhir4.Observation) || [];
  const conditions = conditionsBundle?.entry?.map((e: fhir4.BundleEntry) => e.resource as fhir4.Condition) || [];
  const medications = medicationsBundle?.entry?.map((e: fhir4.BundleEntry) => e.resource as fhir4.MedicationRequest) || [];

  return (
    <div className="patient-detail">
      <Link to="/patients" className="back-link">
        <ArrowLeft size={20} />
        Back to Patients
      </Link>

      {/* Patient Header */}
      <div className="patient-header">
        <div className="patient-avatar-large">
          <User size={48} />
        </div>
        <div className="patient-header-info">
          <h1>{getPatientDisplayName(patient)}</h1>
          <div className="patient-meta">
            <span className="badge">{patient.resourceType}</span>
            <span>ID: {patient.id}</span>
            <span>{getGenderDisplay(patient.gender)}</span>
            {patient.birthDate && (
              <span>
                <Calendar size={14} />
                {formatFhirDate(patient.birthDate)} ({getPatientAge(patient.birthDate)} years)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Learning Card */}
      <div className="learn-card">
        <h3>Patient Resource Structure</h3>
        <p>
          This patient has linked resources: <strong>{observations.length}</strong> Observations,{' '}
          <strong>{conditions.length}</strong> Conditions, and <strong>{medications.length}</strong> Medication Requests.
          In FHIR, resources are linked using <code>Reference</code> fields (e.g., <code>Observation.subject</code> → <code>Patient/{id}</code>).
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'observations' ? 'active' : ''}`}
          onClick={() => setActiveTab('observations')}
        >
          <Activity size={16} />
          Observations ({observations.length})
        </button>
        <button
          className={`tab ${activeTab === 'conditions' ? 'active' : ''}`}
          onClick={() => setActiveTab('conditions')}
        >
          <FileText size={16} />
          Conditions ({conditions.length})
        </button>
        <button
          className={`tab ${activeTab === 'medications' ? 'active' : ''}`}
          onClick={() => setActiveTab('medications')}
        >
          <Pill size={16} />
          Medications ({medications.length})
        </button>
        <button
          className={`tab ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          {'{ }'} Raw JSON
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <OverviewTab patient={patient} />
        )}

        {activeTab === 'observations' && (
          <ObservationsTab observations={observations} />
        )}

        {activeTab === 'conditions' && (
          <ConditionsTab conditions={conditions} />
        )}

        {activeTab === 'medications' && (
          <MedicationsTab medications={medications} />
        )}

        {activeTab === 'json' && (
          <div className="json-tab">
            <p className="json-tab-description">
              This is the raw FHIR Patient resource as returned by the server.
              Notice the standard structure: <code>resourceType</code>, <code>id</code>, <code>meta</code>, and domain-specific fields.
            </p>
            <JsonViewer data={patient} title="Patient Resource JSON" />
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewTab({ patient }: { patient: fhir4.Patient }) {
  return (
    <div className="overview-grid">
      {/* Contact Information */}
      <div className="info-card">
        <h3>Contact Information</h3>
        <div className="info-list">
          {patient.telecom?.map((t: fhir4.ContactPoint, i: number) => (
            <div key={i} className="info-item">
              {t.system === 'phone' && <Phone size={16} />}
              {t.system === 'email' && <Mail size={16} />}
              <span>{t.value || 'N/A'}</span>
              {t.use && <span className="badge-small">{t.use}</span>}
            </div>
          ))}
          {(!patient.telecom || patient.telecom.length === 0) && (
            <p className="text-muted">No contact information available</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="info-card">
        <h3>Address</h3>
        <div className="info-list">
          {patient.address?.map((addr: fhir4.Address, i: number) => (
            <div key={i} className="info-item">
              <MapPin size={16} />
              <div>
                <span>{formatAddress(addr)}</span>
                {addr.use && <span className="badge-small">{addr.use}</span>}
              </div>
            </div>
          ))}
          {(!patient.address || patient.address.length === 0) && (
            <p className="text-muted">No address available</p>
          )}
        </div>
      </div>

      {/* Identifiers */}
      <div className="info-card">
        <h3>Identifiers</h3>
        <p className="info-description">
          FHIR uses identifiers to link patients across systems (MRN, SSN, etc.)
        </p>
        <div className="info-list">
          {patient.identifier?.map((id: fhir4.Identifier, i: number) => (
            <div key={i} className="info-item">
              <code>{id.system || 'Unknown system'}</code>
              <span>{id.value}</span>
            </div>
          ))}
          {(!patient.identifier || patient.identifier.length === 0) && (
            <p className="text-muted">No identifiers available</p>
          )}
        </div>
      </div>

      {/* Names */}
      <div className="info-card">
        <h3>Names</h3>
        <p className="info-description">
          Patients can have multiple names (official, nickname, maiden name, etc.)
        </p>
        <div className="info-list">
          {patient.name?.map((name: fhir4.HumanName, i: number) => (
            <div key={i} className="info-item">
              <User size={16} />
              <span>
                {name.given?.join(' ')} {name.family}
              </span>
              {name.use && <span className="badge-small">{name.use}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ObservationsTab({ observations }: { observations: fhir4.Observation[] }) {
  const [selectedObs, setSelectedObs] = useState<fhir4.Observation | null>(null);

  return (
    <div className="observations-tab">
      <div className="learn-card-small">
        <strong>Observations</strong> are measurements, findings, or simple assertions about a patient.
        Common examples include vital signs, lab results, and clinical assessments.
        They're linked to patients via the <code>subject</code> reference field.
      </div>

      {observations.length === 0 ? (
        <div className="empty-state">
          <Activity size={48} />
          <p>No observations found for this patient</p>
        </div>
      ) : (
        <div className="observations-layout">
          <div className="observations-list">
            {observations.map((obs) => (
              <div
                key={obs.id}
                className={`observation-item ${selectedObs?.id === obs.id ? 'selected' : ''}`}
                onClick={() => setSelectedObs(obs)}
              >
                <div className="obs-header">
                  <span className="obs-code">{getCodeableConceptDisplay(obs.code)}</span>
                  <span className="obs-value">{getObservationValue(obs)}</span>
                </div>
                <div className="obs-meta">
                  <span>{formatFhirDateTime(obs.effectiveDateTime)}</span>
                  <span className={`status-badge status-${obs.status}`}>{obs.status}</span>
                </div>
              </div>
            ))}
          </div>
          {selectedObs && (
            <div className="observation-detail">
              <h4>Observation Detail</h4>
              <JsonViewer data={selectedObs} collapsed={false} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ConditionsTab({ conditions }: { conditions: fhir4.Condition[] }) {
  return (
    <div className="conditions-tab">
      <div className="learn-card-small">
        <strong>Conditions</strong> represent clinical conditions, problems, or diagnoses.
        They capture what's clinically wrong with the patient and can include severity, onset, and clinical status.
      </div>

      {conditions.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} />
          <p>No conditions found for this patient</p>
        </div>
      ) : (
        <div className="conditions-list">
          {conditions.map((condition) => (
            <div key={condition.id} className="condition-item">
              <div className="condition-header">
                <h4>{getCodeableConceptDisplay(condition.code)}</h4>
                <span className={`status-badge status-${condition.clinicalStatus?.coding?.[0]?.code}`}>
                  {condition.clinicalStatus?.coding?.[0]?.code || 'unknown'}
                </span>
              </div>
              <div className="condition-meta">
                {condition.onsetDateTime && (
                  <span>Onset: {formatFhirDate(condition.onsetDateTime)}</span>
                )}
                {condition.recordedDate && (
                  <span>Recorded: {formatFhirDate(condition.recordedDate)}</span>
                )}
              </div>
              <JsonViewer data={condition} title="Condition JSON" collapsed />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MedicationsTab({ medications }: { medications: fhir4.MedicationRequest[] }) {
  return (
    <div className="medications-tab">
      <div className="learn-card-small">
        <strong>MedicationRequest</strong> represents an order or request for medication.
        It includes what medication, for whom, the dosage instructions, and prescriber information.
      </div>

      {medications.length === 0 ? (
        <div className="empty-state">
          <Pill size={48} />
          <p>No medication requests found for this patient</p>
        </div>
      ) : (
        <div className="medications-list">
          {medications.map((med) => (
            <div key={med.id} className="medication-item">
              <div className="medication-header">
                <h4>{getCodeableConceptDisplay(med.medicationCodeableConcept)}</h4>
                <span className={`status-badge status-${med.status}`}>{med.status}</span>
              </div>
              <div className="medication-meta">
                {med.authoredOn && <span>Authored: {formatFhirDate(med.authoredOn)}</span>}
                {med.intent && <span>Intent: {med.intent}</span>}
              </div>
              {med.dosageInstruction?.[0]?.text && (
                <p className="dosage-text">{med.dosageInstruction[0].text}</p>
              )}
              <JsonViewer data={med} title="MedicationRequest JSON" collapsed />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
