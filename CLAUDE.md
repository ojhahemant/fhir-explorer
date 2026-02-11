# FHIR Explorer - Learning Application

## Project Overview

This is a comprehensive FHIR (Fast Healthcare Interoperability Resources) learning application built with React. It connects to a live FHIR server (HAPI FHIR R4) and provides interactive tools to explore and understand FHIR concepts.

## Running the Application

```bash
cd fhir-explorer
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Application Features

### 1. Dashboard
- Server status and capabilities overview
- Quick links to all features
- Recent patients list
- FHIR quick reference cards

### 2. Patient Browser (`/patients`)
- Search patients by name
- View patient cards with demographics
- Toggle raw FHIR JSON view
- Educational cards explaining Patient resources

### 3. Patient Detail (`/patients/:id`)
- Full patient information with tabs:
  - **Overview**: Contact info, addresses, identifiers, names
  - **Observations**: Linked vital signs and lab results
  - **Conditions**: Diagnoses and problems
  - **Medications**: Prescription requests
  - **Raw JSON**: Complete FHIR resource

### 4. FHIR API Explorer (`/explorer`)
- Execute any FHIR query directly
- Pre-built example queries
- HTTP request/response visualization
- Response summary with resource counts
- Raw JSON viewer with copy functionality

### 5. Learn FHIR (`/learn`)
- Expandable sections covering:
  - What is FHIR?
  - FHIR Resources
  - References & Linking
  - Data Types
  - Searching Resources
  - Security & SMART on FHIR

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **Lucide React** - Icons
- **@types/fhir** - FHIR TypeScript types

## Project Structure

```
fhir-explorer/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── JsonViewer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── explorer/
│   │   │   └── FhirExplorer.tsx
│   │   ├── learn/
│   │   │   └── LearnFhir.tsx
│   │   ├── patients/
│   │   │   ├── PatientDetail.tsx
│   │   │   └── PatientList.tsx
│   │   └── Dashboard.tsx
│   ├── hooks/
│   │   └── useFhir.ts
│   ├── services/
│   │   └── fhirClient.ts
│   ├── types/
│   │   └── fhir-helpers.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
└── package.json
```

## FHIR Fundamentals

### What is FHIR?
- Modern standard for electronic healthcare data exchange by HL7
- RESTful API-based approach
- Supports JSON and XML data formats
- Built on the concept of "Resources" as core data units

### Core FHIR Resources
| Resource | Description |
|----------|-------------|
| Patient | Demographics and administrative information |
| Observation | Measurements, vitals, lab results |
| Condition | Problems and diagnoses |
| MedicationRequest | Prescriptions |
| Encounter | Healthcare visit/interaction |
| Practitioner | Healthcare provider |

### FHIR RESTful Operations
| Operation | HTTP Method | Example |
|-----------|-------------|---------|
| Read | GET | `GET /Patient/123` |
| Search | GET | `GET /Patient?name=Smith` |
| Create | POST | `POST /Patient` |
| Update | PUT | `PUT /Patient/123` |
| Delete | DELETE | `DELETE /Patient/123` |

## Key Concepts Demonstrated

### 1. FHIR Client Setup
```typescript
// services/fhirClient.ts
const fhirClient = new FhirClient({
  baseUrl: 'https://hapi.fhir.org/baseR4',
});

// Read a patient
await fhirClient.read('Patient', '123');

// Search patients
await fhirClient.search('Patient', { name: 'Smith' });
```

### 2. Resource References
Resources link to each other via references:
```json
{
  "resourceType": "Observation",
  "subject": {
    "reference": "Patient/123",
    "display": "John Smith"
  }
}
```

### 3. Search Parameters
```
GET /Patient?name=Smith
GET /Observation?patient=123&code=http://loinc.org|8867-4
GET /Condition?clinical-status=active
```

### 4. Bundle Responses
Search results return a Bundle containing matching resources:
```json
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 42,
  "entry": [
    { "resource": { "resourceType": "Patient", ... } }
  ]
}
```

## FHIR Test Servers

- **HAPI FHIR R4** (used by this app): `https://hapi.fhir.org/baseR4`
- **Firely Server**: `https://server.fire.ly/r4`
- **SMART Health IT**: `https://launch.smarthealthit.org`

## Next Steps for Building Healthcare Apps

1. **SMART on FHIR**: Add OAuth2 authentication for production EHR integrations
2. **Profiles**: Implement US Core or other FHIR profiles for compliance
3. **Validation**: Use FHIR validators to ensure resource conformance
4. **Subscriptions**: Implement real-time updates with FHIR Subscriptions
5. **Bulk Data**: Add support for FHIR Bulk Data Access for analytics

## Useful Links

- [FHIR Specification](https://www.hl7.org/fhir/)
- [FHIR Resource Index](https://www.hl7.org/fhir/resourcelist.html)
- [SMART on FHIR Docs](https://docs.smarthealthit.org/)
- [US Core Profiles](https://www.hl7.org/fhir/us/core/)
