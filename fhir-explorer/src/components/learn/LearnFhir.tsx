import { useState } from 'react';
import { Book, Database, Link2, FileJson, Search, Shield, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function LearnFhir() {
  const [expandedSection, setExpandedSection] = useState<string | null>('what-is-fhir');

  const sections: Section[] = [
    {
      id: 'what-is-fhir',
      title: 'What is FHIR?',
      icon: <Book size={20} />,
      content: <WhatIsFhirSection />,
    },
    {
      id: 'resources',
      title: 'FHIR Resources',
      icon: <Database size={20} />,
      content: <ResourcesSection />,
    },
    {
      id: 'references',
      title: 'References & Linking',
      icon: <Link2 size={20} />,
      content: <ReferencesSection />,
    },
    {
      id: 'data-types',
      title: 'Data Types',
      icon: <FileJson size={20} />,
      content: <DataTypesSection />,
    },
    {
      id: 'search',
      title: 'Searching Resources',
      icon: <Search size={20} />,
      content: <SearchSection />,
    },
    {
      id: 'security',
      title: 'Security & SMART on FHIR',
      icon: <Shield size={20} />,
      content: <SecuritySection />,
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="learn-fhir">
      <div className="page-header">
        <div>
          <h1>Learn FHIR</h1>
          <p className="subtitle">
            A comprehensive guide to understanding FHIR (Fast Healthcare Interoperability Resources)
            for building healthcare applications.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <a href="https://www.hl7.org/fhir/" target="_blank" rel="noopener noreferrer" className="quick-link">
          <ExternalLink size={16} />
          Official FHIR Spec
        </a>
        <a href="https://www.hl7.org/fhir/resourcelist.html" target="_blank" rel="noopener noreferrer" className="quick-link">
          <ExternalLink size={16} />
          Resource Index
        </a>
        <a href="https://docs.smarthealthit.org/" target="_blank" rel="noopener noreferrer" className="quick-link">
          <ExternalLink size={16} />
          SMART on FHIR Docs
        </a>
      </div>

      {/* Accordion Sections */}
      <div className="learn-sections">
        {sections.map((section) => (
          <div key={section.id} className="learn-section">
            <button
              className={`section-header ${expandedSection === section.id ? 'expanded' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <span className="section-icon">{section.icon}</span>
              <span className="section-title">{section.title}</span>
              {expandedSection === section.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {expandedSection === section.id && (
              <div className="section-content">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatIsFhirSection() {
  return (
    <div className="content-section">
      <p>
        <strong>FHIR</strong> (Fast Healthcare Interoperability Resources, pronounced "fire") is a standard
        for exchanging healthcare information electronically. It was developed by HL7 International and
        combines the best features of HL7 v2, v3, and CDA while being much easier to implement.
      </p>

      <h4>Key Benefits</h4>
      <ul>
        <li><strong>Modern Web Standards</strong> - Uses RESTful APIs, JSON, and XML</li>
        <li><strong>Developer Friendly</strong> - Easy to learn and implement</li>
        <li><strong>Flexible</strong> - Works with mobile, web, and server applications</li>
        <li><strong>Extensible</strong> - Can be customized while maintaining interoperability</li>
      </ul>

      <h4>FHIR Versions</h4>
      <div className="version-table">
        <div className="version-row">
          <span className="version-name">R4 (4.0.1)</span>
          <span className="version-status current">Current</span>
          <span>Most widely adopted, normative content</span>
        </div>
        <div className="version-row">
          <span className="version-name">R5 (5.0.0)</span>
          <span className="version-status">Latest</span>
          <span>Newest version with additional features</span>
        </div>
        <div className="version-row">
          <span className="version-name">STU3 (3.0.2)</span>
          <span className="version-status legacy">Legacy</span>
          <span>Still used in some systems</span>
        </div>
      </div>

      <div className="code-block">
        <h5>Example Patient Resource (JSON)</h5>
        <pre>{`{
  "resourceType": "Patient",
  "id": "example",
  "name": [{
    "use": "official",
    "family": "Smith",
    "given": ["John", "Jacob"]
  }],
  "gender": "male",
  "birthDate": "1974-12-25"
}`}</pre>
      </div>
    </div>
  );
}

function ResourcesSection() {
  return (
    <div className="content-section">
      <p>
        Everything in FHIR is a <strong>Resource</strong>. Resources are the building blocks that
        represent different types of healthcare information. Each resource has a defined structure
        and standard fields.
      </p>

      <h4>Resource Categories</h4>

      <div className="resource-category">
        <h5>Foundation</h5>
        <p>Core infrastructure resources</p>
        <div className="resource-list">
          <span className="resource-badge">Bundle</span>
          <span className="resource-badge">CapabilityStatement</span>
          <span className="resource-badge">OperationOutcome</span>
        </div>
      </div>

      <div className="resource-category">
        <h5>Administration</h5>
        <p>People and organizations</p>
        <div className="resource-list">
          <span className="resource-badge">Patient</span>
          <span className="resource-badge">Practitioner</span>
          <span className="resource-badge">Organization</span>
          <span className="resource-badge">Location</span>
        </div>
      </div>

      <div className="resource-category">
        <h5>Clinical</h5>
        <p>Clinical data and findings</p>
        <div className="resource-list">
          <span className="resource-badge">Observation</span>
          <span className="resource-badge">Condition</span>
          <span className="resource-badge">Procedure</span>
          <span className="resource-badge">AllergyIntolerance</span>
          <span className="resource-badge">DiagnosticReport</span>
        </div>
      </div>

      <div className="resource-category">
        <h5>Medications</h5>
        <p>Medication-related resources</p>
        <div className="resource-list">
          <span className="resource-badge">Medication</span>
          <span className="resource-badge">MedicationRequest</span>
          <span className="resource-badge">MedicationAdministration</span>
          <span className="resource-badge">Immunization</span>
        </div>
      </div>

      <h4>Common Resource Structure</h4>
      <p>All resources share a common structure:</p>
      <div className="code-block">
        <pre>{`{
  "resourceType": "Patient",    // Type identifier
  "id": "123",                  // Logical ID
  "meta": {                     // Metadata
    "versionId": "1",
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "text": {                     // Human-readable narrative
    "status": "generated",
    "div": "<div>...</div>"
  },
  // ... resource-specific fields
}`}</pre>
      </div>
    </div>
  );
}

function ReferencesSection() {
  return (
    <div className="content-section">
      <p>
        Resources are linked together using <strong>References</strong>. This is how FHIR creates
        relationships between different pieces of healthcare data.
      </p>

      <h4>Reference Format</h4>
      <div className="code-block">
        <pre>{`// Simple reference
{
  "reference": "Patient/123"
}

// Reference with display
{
  "reference": "Patient/123",
  "display": "John Smith"
}

// Full URL reference
{
  "reference": "https://fhir.example.com/Patient/123"
}`}</pre>
      </div>

      <h4>Example: Linking Resources</h4>
      <p>An Observation links to the Patient it's about:</p>
      <div className="code-block">
        <pre>{`{
  "resourceType": "Observation",
  "id": "blood-pressure-1",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "85354-9",
      "display": "Blood pressure panel"
    }]
  },
  "subject": {
    "reference": "Patient/123",
    "display": "John Smith"
  },
  "effectiveDateTime": "2024-01-15T10:30:00Z"
}`}</pre>
      </div>

      <h4>Reference Types</h4>
      <ul>
        <li><strong>subject</strong> - Who/what the resource is about</li>
        <li><strong>patient</strong> - The patient (in some resources)</li>
        <li><strong>performer</strong> - Who did the action</li>
        <li><strong>encounter</strong> - The encounter during which this occurred</li>
        <li><strong>basedOn</strong> - What this fulfills</li>
      </ul>
    </div>
  );
}

function DataTypesSection() {
  return (
    <div className="content-section">
      <p>
        FHIR defines specific data types used across resources. Understanding these helps you
        work with FHIR data correctly.
      </p>

      <h4>Primitive Types</h4>
      <table className="data-types-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>string</code></td>
            <td>Unicode text</td>
            <td><code>"John Smith"</code></td>
          </tr>
          <tr>
            <td><code>boolean</code></td>
            <td>true or false</td>
            <td><code>true</code></td>
          </tr>
          <tr>
            <td><code>integer</code></td>
            <td>Whole number</td>
            <td><code>42</code></td>
          </tr>
          <tr>
            <td><code>decimal</code></td>
            <td>Decimal number</td>
            <td><code>98.6</code></td>
          </tr>
          <tr>
            <td><code>date</code></td>
            <td>Date (no time)</td>
            <td><code>"2024-01-15"</code></td>
          </tr>
          <tr>
            <td><code>dateTime</code></td>
            <td>Date and time</td>
            <td><code>"2024-01-15T10:30:00Z"</code></td>
          </tr>
          <tr>
            <td><code>uri</code></td>
            <td>Universal Resource Identifier</td>
            <td><code>"http://example.com"</code></td>
          </tr>
        </tbody>
      </table>

      <h4>Complex Types</h4>

      <div className="complex-type">
        <h5>HumanName</h5>
        <div className="code-block">
          <pre>{`{
  "use": "official",
  "family": "Smith",
  "given": ["John", "Jacob"],
  "prefix": ["Mr."],
  "suffix": ["Jr."]
}`}</pre>
        </div>
      </div>

      <div className="complex-type">
        <h5>CodeableConcept</h5>
        <p>Represents coded values with optional text:</p>
        <div className="code-block">
          <pre>{`{
  "coding": [{
    "system": "http://loinc.org",
    "code": "8867-4",
    "display": "Heart rate"
  }],
  "text": "Heart rate"
}`}</pre>
        </div>
      </div>

      <div className="complex-type">
        <h5>Quantity</h5>
        <p>A measured amount with unit:</p>
        <div className="code-block">
          <pre>{`{
  "value": 72,
  "unit": "beats/min",
  "system": "http://unitsofmeasure.org",
  "code": "/min"
}`}</pre>
        </div>
      </div>
    </div>
  );
}

function SearchSection() {
  return (
    <div className="content-section">
      <p>
        FHIR provides a powerful search API. Understanding search parameters is key to building
        effective healthcare applications.
      </p>

      <h4>Basic Search</h4>
      <div className="code-block">
        <pre>{`GET /Patient?name=Smith
GET /Patient?birthdate=1974-12-25
GET /Observation?patient=Patient/123`}</pre>
      </div>

      <h4>Search Modifiers</h4>
      <table className="search-table">
        <thead>
          <tr>
            <th>Modifier</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>:exact</code></td>
            <td>Exact match</td>
            <td><code>name:exact=Smith</code></td>
          </tr>
          <tr>
            <td><code>:contains</code></td>
            <td>Contains string</td>
            <td><code>name:contains=mit</code></td>
          </tr>
          <tr>
            <td><code>:missing</code></td>
            <td>Has/lacks value</td>
            <td><code>birthdate:missing=true</code></td>
          </tr>
        </tbody>
      </table>

      <h4>Date Comparisons</h4>
      <div className="code-block">
        <pre>{`GET /Observation?date=gt2024-01-01    // After
GET /Observation?date=lt2024-12-31    // Before
GET /Observation?date=ge2024-01-01    // On or after
GET /Observation?date=le2024-12-31    // On or before`}</pre>
      </div>

      <h4>Pagination</h4>
      <div className="code-block">
        <pre>{`GET /Patient?_count=20              // Results per page
GET /Patient?_offset=40             // Skip results
GET /Patient?_count=20&_offset=40   // Page 3`}</pre>
      </div>

      <h4>Including Related Resources</h4>
      <div className="code-block">
        <pre>{`// Include referenced resources
GET /Observation?patient=123&_include=Observation:patient

// Reverse include
GET /Patient?_id=123&_revinclude=Observation:patient`}</pre>
      </div>

      <h4>Sorting</h4>
      <div className="code-block">
        <pre>{`GET /Patient?_sort=birthdate        // Ascending
GET /Patient?_sort=-birthdate       // Descending
GET /Patient?_sort=family,given     // Multiple fields`}</pre>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="content-section">
      <p>
        Healthcare data requires strong security. <strong>SMART on FHIR</strong> is the standard
        for securing FHIR APIs using OAuth 2.0.
      </p>

      <h4>SMART on FHIR</h4>
      <p>
        SMART (Substitutable Medical Applications and Reusable Technologies) provides:
      </p>
      <ul>
        <li>OAuth 2.0-based authorization</li>
        <li>Patient/provider app launch sequences</li>
        <li>Scoped access to FHIR resources</li>
        <li>Single sign-on with EHR systems</li>
      </ul>

      <h4>Authorization Scopes</h4>
      <p>Scopes define what resources an app can access:</p>
      <div className="code-block">
        <pre>{`// Read patient data
patient/Patient.read

// Read and write observations
patient/Observation.read patient/Observation.write

// Read all patient data
patient/*.read

// System-level access
system/Patient.read`}</pre>
      </div>

      <h4>Launch Sequences</h4>

      <div className="launch-type">
        <h5>EHR Launch</h5>
        <p>App is launched from within the EHR:</p>
        <ol>
          <li>EHR launches app with launch token</li>
          <li>App requests authorization</li>
          <li>User authenticates and authorizes</li>
          <li>App receives access token</li>
          <li>App accesses FHIR data</li>
        </ol>
      </div>

      <div className="launch-type">
        <h5>Standalone Launch</h5>
        <p>App launches independently:</p>
        <ol>
          <li>App redirects to authorization server</li>
          <li>User selects patient context</li>
          <li>User authorizes access</li>
          <li>App receives access token</li>
        </ol>
      </div>

      <h4>Example Token Request</h4>
      <div className="code-block">
        <pre>{`POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=abc123
&redirect_uri=https://myapp.example.com/callback
&client_id=my-app-id`}</pre>
      </div>
    </div>
  );
}
