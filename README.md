# FHIR Explorer

A comprehensive FHIR (Fast Healthcare Interoperability Resources) learning application built with React and TypeScript. This application connects to a live FHIR server (HAPI FHIR R4) and provides interactive tools to explore and understand FHIR concepts. THIS IS A TEST.

## Features

- **Dashboard**: Server status, capabilities overview, and quick links
- **Patient Browser**: Search and view patient demographics with raw FHIR JSON
- **Patient Detail**: View linked observations, conditions, and medications
- **FHIR API Explorer**: Execute any FHIR query with response visualization
- **Resource Knowledge Base**: Comprehensive documentation for 12 FHIR resources
- **Learn FHIR**: Educational content covering FHIR fundamentals

## Getting Started

```bash
cd fhir-explorer
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Lucide React Icons

## FHIR Resources Covered

| Resource | Description |
|----------|-------------|
| Patient | Demographics and administrative information |
| Observation | Measurements, vitals, lab results |
| Condition | Problems and diagnoses |
| MedicationRequest | Prescriptions |
| Encounter | Healthcare visit/interaction |
| Practitioner | Healthcare provider |
| Organization | Healthcare organizations |
| AllergyIntolerance | Allergies and intolerances |
| Immunization | Vaccination records |
| Procedure | Medical procedures |
| DiagnosticReport | Lab and imaging reports |
| CarePlan | Care plans and goals |

## FHIR Server

This app uses the public HAPI FHIR R4 server: `https://hapi.fhir.org/baseR4`

## License

MIT
