import { useState } from 'react';
import {
  User, Activity, FileText, Pill, Stethoscope, Building2,
  AlertTriangle, Syringe, ClipboardList, Heart, ChevronDown, ChevronRight,
  ExternalLink, Code, Database, BookOpen
} from 'lucide-react';

// Comprehensive FHIR Resource Knowledge Base
export const RESOURCE_KNOWLEDGE = {
  Patient: {
    icon: User,
    color: '#2563eb',
    description: 'Demographics and administrative information about an individual receiving care services.',
    purpose: 'The Patient resource is the central resource in most healthcare systems. It contains information necessary to identify and contact a patient, and links to all clinical data.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'Business identifiers like MRN, SSN, national ID. Should NOT be used as the resource id.' },
      { name: 'active', type: 'boolean', required: false, description: 'Whether this patient record is in active use' },
      { name: 'name', type: 'HumanName[]', required: false, description: 'Names associated with the patient (official, nickname, maiden)' },
      { name: 'telecom', type: 'ContactPoint[]', required: false, description: 'Contact details (phone, email, fax)' },
      { name: 'gender', type: 'code', required: false, description: 'male | female | other | unknown' },
      { name: 'birthDate', type: 'date', required: false, description: 'Date of birth in YYYY-MM-DD format' },
      { name: 'deceased[x]', type: 'boolean | dateTime', required: false, description: 'Indicates if/when the patient died' },
      { name: 'address', type: 'Address[]', required: false, description: 'Addresses for the patient (home, work, temporary)' },
      { name: 'maritalStatus', type: 'CodeableConcept', required: false, description: 'Marital (civil) status using HL7 v3 codes' },
      { name: 'multipleBirth[x]', type: 'boolean | integer', required: false, description: 'Whether patient is part of a multiple birth' },
      { name: 'photo', type: 'Attachment[]', required: false, description: 'Image of the patient' },
      { name: 'contact', type: 'BackboneElement[]', required: false, description: 'Contact party (guardian, partner, friend)' },
      { name: 'communication', type: 'BackboneElement[]', required: false, description: 'Languages the patient can communicate in' },
      { name: 'generalPractitioner', type: 'Reference[]', required: false, description: 'Patient\'s nominated primary care provider' },
      { name: 'managingOrganization', type: 'Reference', required: false, description: 'Organization that is the custodian of the patient record' },
      { name: 'link', type: 'BackboneElement[]', required: false, description: 'Link to another patient resource (merged, replaced)' },
    ],
    searchParams: [
      { name: 'identifier', type: 'token', example: 'identifier=http://hospital.org/mrn|12345' },
      { name: 'name', type: 'string', example: 'name=Smith' },
      { name: 'family', type: 'string', example: 'family=Johnson' },
      { name: 'given', type: 'string', example: 'given=John' },
      { name: 'birthdate', type: 'date', example: 'birthdate=1990-01-01' },
      { name: 'gender', type: 'token', example: 'gender=male' },
      { name: 'address', type: 'string', example: 'address=123 Main St' },
      { name: 'address-city', type: 'string', example: 'address-city=Boston' },
      { name: 'phone', type: 'token', example: 'phone=555-1234' },
      { name: 'email', type: 'token', example: 'email=patient@example.com' },
    ],
    relatedResources: ['Observation', 'Condition', 'MedicationRequest', 'Encounter', 'AllergyIntolerance'],
    exampleJson: {
      resourceType: 'Patient',
      id: 'example',
      identifier: [{ system: 'http://hospital.org/mrn', value: '12345' }],
      active: true,
      name: [{ use: 'official', family: 'Smith', given: ['John', 'Jacob'] }],
      gender: 'male',
      birthDate: '1974-12-25',
      address: [{ use: 'home', city: 'Boston', state: 'MA', postalCode: '02101' }],
    },
    useCases: [
      'Patient registration and demographics management',
      'Identity matching across healthcare systems',
      'Patient portal and engagement applications',
      'Care coordination and referral management',
    ],
  },
  Observation: {
    icon: Activity,
    color: '#22c55e',
    description: 'Measurements, assertions, and findings about a patient or other subject.',
    purpose: 'Observations are central to healthcare - they capture vital signs, lab results, imaging findings, clinical assessments, device measurements, and social history.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'Business identifiers for this observation' },
      { name: 'status', type: 'code', required: true, description: 'registered | preliminary | final | amended | corrected | cancelled | entered-in-error | unknown' },
      { name: 'category', type: 'CodeableConcept[]', required: false, description: 'Classification of observation type (vital-signs, laboratory, etc.)' },
      { name: 'code', type: 'CodeableConcept', required: true, description: 'What was observed - typically LOINC code' },
      { name: 'subject', type: 'Reference', required: false, description: 'Who/what this observation is about (usually Patient)' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Healthcare event during which this observation was made' },
      { name: 'effective[x]', type: 'dateTime | Period | Timing | instant', required: false, description: 'When the observation was made' },
      { name: 'issued', type: 'instant', required: false, description: 'Date/time this version was made available' },
      { name: 'performer', type: 'Reference[]', required: false, description: 'Who performed the observation' },
      { name: 'value[x]', type: 'Quantity | CodeableConcept | string | boolean | integer | Range | Ratio | SampledData | time | dateTime | Period', required: false, description: 'The actual result value' },
      { name: 'interpretation', type: 'CodeableConcept[]', required: false, description: 'High, low, normal, etc.' },
      { name: 'note', type: 'Annotation[]', required: false, description: 'Comments about the observation' },
      { name: 'bodySite', type: 'CodeableConcept', required: false, description: 'Observed body part' },
      { name: 'method', type: 'CodeableConcept', required: false, description: 'How the observation was made' },
      { name: 'specimen', type: 'Reference', required: false, description: 'Specimen used for this observation' },
      { name: 'device', type: 'Reference', required: false, description: 'Device used to generate the observation' },
      { name: 'referenceRange', type: 'BackboneElement[]', required: false, description: 'Normal/reference ranges for interpretation' },
      { name: 'component', type: 'BackboneElement[]', required: false, description: 'Component results (e.g., systolic/diastolic for BP)' },
    ],
    vitalSignsCodes: [
      { name: 'Vital Signs Panel', loinc: '85353-1', unit: 'N/A', description: 'Collection of vital sign measurements' },
      { name: 'Heart Rate', loinc: '8867-4', unit: '/min', description: 'Beats per minute' },
      { name: 'Respiratory Rate', loinc: '9279-1', unit: '/min', description: 'Breaths per minute' },
      { name: 'Body Temperature', loinc: '8310-5', unit: 'Cel or [degF]', description: 'Core body temperature' },
      { name: 'Body Height', loinc: '8302-2', unit: 'cm or [in_i]', description: 'Height measurement' },
      { name: 'Body Weight', loinc: '29463-7', unit: 'kg or [lb_av]', description: 'Weight measurement' },
      { name: 'BMI', loinc: '39156-5', unit: 'kg/m2', description: 'Body Mass Index' },
      { name: 'Blood Pressure Panel', loinc: '85354-9', unit: 'N/A', description: 'Systolic and diastolic measurements' },
      { name: 'Systolic BP', loinc: '8480-6', unit: 'mm[Hg]', description: 'Systolic blood pressure' },
      { name: 'Diastolic BP', loinc: '8462-4', unit: 'mm[Hg]', description: 'Diastolic blood pressure' },
      { name: 'Oxygen Saturation', loinc: '2708-6', unit: '%', description: 'SpO2 measurement' },
      { name: 'Head Circumference', loinc: '9843-4', unit: 'cm', description: 'Typically for infants' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'code', type: 'token', example: 'code=http://loinc.org|8867-4' },
      { name: 'category', type: 'token', example: 'category=vital-signs' },
      { name: 'date', type: 'date', example: 'date=gt2024-01-01' },
      { name: 'status', type: 'token', example: 'status=final' },
      { name: 'value-quantity', type: 'quantity', example: 'value-quantity=gt100' },
    ],
    relatedResources: ['Patient', 'Encounter', 'Practitioner', 'Device', 'Specimen'],
    exampleJson: {
      resourceType: 'Observation',
      id: 'heart-rate',
      status: 'final',
      category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'vital-signs' }] }],
      code: { coding: [{ system: 'http://loinc.org', code: '8867-4', display: 'Heart rate' }] },
      subject: { reference: 'Patient/123' },
      effectiveDateTime: '2024-01-15T10:30:00Z',
      valueQuantity: { value: 72, unit: '/min', system: 'http://unitsofmeasure.org', code: '/min' },
    },
    useCases: [
      'Recording vital signs during patient visits',
      'Storing laboratory test results',
      'Capturing device readings (glucometers, BP monitors)',
      'Social history and lifestyle assessments',
    ],
  },
  Condition: {
    icon: FileText,
    color: '#f59e0b',
    description: 'Clinical condition, problem, diagnosis, or other event, situation, issue, or clinical concept.',
    purpose: 'Condition records information about a patient\'s diagnoses, problems, and health concerns. It supports clinical decision-making and care planning.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'External identifiers for this condition' },
      { name: 'clinicalStatus', type: 'CodeableConcept', required: false, description: 'active | recurrence | relapse | inactive | remission | resolved' },
      { name: 'verificationStatus', type: 'CodeableConcept', required: false, description: 'unconfirmed | provisional | differential | confirmed | refuted | entered-in-error' },
      { name: 'category', type: 'CodeableConcept[]', required: false, description: 'problem-list-item | encounter-diagnosis | health-concern' },
      { name: 'severity', type: 'CodeableConcept', required: false, description: 'Severity of the condition (mild, moderate, severe)' },
      { name: 'code', type: 'CodeableConcept', required: false, description: 'Identification of the condition - SNOMED CT or ICD-10' },
      { name: 'bodySite', type: 'CodeableConcept[]', required: false, description: 'Anatomical location of the condition' },
      { name: 'subject', type: 'Reference', required: true, description: 'Who has the condition (Patient reference)' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Encounter when condition was first asserted' },
      { name: 'onset[x]', type: 'dateTime | Age | Period | Range | string', required: false, description: 'When the condition started' },
      { name: 'abatement[x]', type: 'dateTime | Age | Period | Range | string', required: false, description: 'When condition resolved' },
      { name: 'recordedDate', type: 'dateTime', required: false, description: 'Date record was first recorded' },
      { name: 'recorder', type: 'Reference', required: false, description: 'Who recorded the condition' },
      { name: 'asserter', type: 'Reference', required: false, description: 'Person who asserts this condition' },
      { name: 'stage', type: 'BackboneElement[]', required: false, description: 'Stage/grade of condition (e.g., cancer staging)' },
      { name: 'evidence', type: 'BackboneElement[]', required: false, description: 'Supporting evidence for the condition' },
      { name: 'note', type: 'Annotation[]', required: false, description: 'Additional notes about the condition' },
    ],
    commonCodes: [
      { system: 'SNOMED CT', url: 'http://snomed.info/sct', description: 'Preferred for clinical conditions, most detailed', example: '73211009 (Diabetes mellitus)' },
      { system: 'ICD-10-CM', url: 'http://hl7.org/fhir/sid/icd-10-cm', description: 'Used for billing and reporting in US', example: 'E11.9 (Type 2 diabetes without complications)' },
      { system: 'ICD-10', url: 'http://hl7.org/fhir/sid/icd-10', description: 'International classification', example: 'E11 (Type 2 diabetes mellitus)' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'clinical-status', type: 'token', example: 'clinical-status=active' },
      { name: 'verification-status', type: 'token', example: 'verification-status=confirmed' },
      { name: 'category', type: 'token', example: 'category=problem-list-item' },
      { name: 'code', type: 'token', example: 'code=http://snomed.info/sct|73211009' },
      { name: 'onset-date', type: 'date', example: 'onset-date=gt2020-01-01' },
      { name: 'severity', type: 'token', example: 'severity=severe' },
    ],
    relatedResources: ['Patient', 'Encounter', 'Practitioner', 'Observation', 'Procedure'],
    exampleJson: {
      resourceType: 'Condition',
      id: 'diabetes',
      clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: 'active' }] },
      verificationStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: 'confirmed' }] },
      category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-category', code: 'problem-list-item' }] }],
      code: { coding: [{ system: 'http://snomed.info/sct', code: '73211009', display: 'Diabetes mellitus' }] },
      subject: { reference: 'Patient/123' },
      onsetDateTime: '2015-03-15',
    },
    useCases: [
      'Problem list management',
      'Diagnosis documentation',
      'Care planning and coordination',
      'Clinical decision support triggers',
    ],
  },
  MedicationRequest: {
    icon: Pill,
    color: '#8b5cf6',
    description: 'An order or request for supply of medication and administration instructions.',
    purpose: 'MedicationRequest covers all medication orders including inpatient, outpatient, OTC medications, and nutritional supplements. It captures what medication, for whom, dosing instructions, and prescriber information.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'External identifiers for this request' },
      { name: 'status', type: 'code', required: true, description: 'active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown' },
      { name: 'statusReason', type: 'CodeableConcept', required: false, description: 'Reason for current status' },
      { name: 'intent', type: 'code', required: true, description: 'proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option' },
      { name: 'category', type: 'CodeableConcept[]', required: false, description: 'Type of medication usage (inpatient, outpatient, community)' },
      { name: 'priority', type: 'code', required: false, description: 'routine | urgent | asap | stat' },
      { name: 'doNotPerform', type: 'boolean', required: false, description: 'True if request is prohibiting action' },
      { name: 'medication[x]', type: 'CodeableConcept | Reference', required: true, description: 'Medication to be taken - usually RxNorm code' },
      { name: 'subject', type: 'Reference', required: true, description: 'Who the medication is for (Patient)' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Encounter during which request was created' },
      { name: 'authoredOn', type: 'dateTime', required: false, description: 'When the request was initially authored' },
      { name: 'requester', type: 'Reference', required: false, description: 'Who/what requested the medication' },
      { name: 'performer', type: 'Reference', required: false, description: 'Intended performer of the administration' },
      { name: 'reasonCode', type: 'CodeableConcept[]', required: false, description: 'Reason for the medication order' },
      { name: 'reasonReference', type: 'Reference[]', required: false, description: 'Condition or observation supporting the request' },
      { name: 'dosageInstruction', type: 'Dosage[]', required: false, description: 'How the medication should be taken' },
      { name: 'dispenseRequest', type: 'BackboneElement', required: false, description: 'Medication supply authorization' },
      { name: 'substitution', type: 'BackboneElement', required: false, description: 'Generic substitution preferences' },
    ],
    dosageElements: [
      { name: 'text', description: 'Free text dosage instructions' },
      { name: 'timing', description: 'When medication should be administered' },
      { name: 'asNeeded[x]', description: 'Take "as needed" (PRN) with optional reason' },
      { name: 'site', description: 'Body site to administer to' },
      { name: 'route', description: 'How drug should enter body (oral, IV, topical)' },
      { name: 'method', description: 'Technique for administering medication' },
      { name: 'doseAndRate', description: 'Amount of medication per dose' },
      { name: 'maxDosePerPeriod', description: 'Upper limit on medication per unit of time' },
    ],
    commonRouteCodes: [
      { code: '26643006', display: 'Oral route', system: 'SNOMED CT' },
      { code: '47625008', display: 'Intravenous route', system: 'SNOMED CT' },
      { code: '78421000', display: 'Intramuscular route', system: 'SNOMED CT' },
      { code: '34206005', display: 'Subcutaneous route', system: 'SNOMED CT' },
      { code: '6064005', display: 'Topical route', system: 'SNOMED CT' },
      { code: '46713006', display: 'Nasal route', system: 'SNOMED CT' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'status', type: 'token', example: 'status=active' },
      { name: 'intent', type: 'token', example: 'intent=order' },
      { name: 'medication', type: 'reference', example: 'medication=Medication/456' },
      { name: 'code', type: 'token', example: 'code=http://www.nlm.nih.gov/research/umls/rxnorm|352362' },
      { name: 'authoredon', type: 'date', example: 'authoredon=gt2024-01-01' },
    ],
    relatedResources: ['Patient', 'Medication', 'Practitioner', 'Encounter', 'Condition'],
    exampleJson: {
      resourceType: 'MedicationRequest',
      id: 'example',
      status: 'active',
      intent: 'order',
      medicationCodeableConcept: { coding: [{ system: 'http://www.nlm.nih.gov/research/umls/rxnorm', code: '197361', display: 'Lisinopril 10 MG Oral Tablet' }] },
      subject: { reference: 'Patient/123' },
      authoredOn: '2024-01-15',
      requester: { reference: 'Practitioner/456' },
      dosageInstruction: [{ text: 'Take one tablet by mouth daily', timing: { repeat: { frequency: 1, period: 1, periodUnit: 'd' } }, route: { coding: [{ system: 'http://snomed.info/sct', code: '26643006', display: 'Oral route' }] }, doseAndRate: [{ doseQuantity: { value: 1, unit: 'tablet' } }] }],
    },
    useCases: [
      'Inpatient medication ordering',
      'Outpatient prescriptions',
      'Medication reconciliation',
      'Clinical decision support for drug interactions',
    ],
  },
  Encounter: {
    icon: Stethoscope,
    color: '#ec4899',
    description: 'An interaction between a patient and healthcare provider(s) for the purpose of providing healthcare services.',
    purpose: 'Encounter encompasses the lifecycle from pre-admission through discharge. It groups clinical activities during a healthcare visit and provides context for observations, procedures, and other clinical data.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'External identifiers for this encounter' },
      { name: 'status', type: 'code', required: true, description: 'planned | arrived | triaged | in-progress | onleave | finished | cancelled | entered-in-error | unknown' },
      { name: 'statusHistory', type: 'BackboneElement[]', required: false, description: 'List of past encounter statuses' },
      { name: 'class', type: 'Coding', required: true, description: 'Classification of encounter (ambulatory, emergency, inpatient, etc.)' },
      { name: 'classHistory', type: 'BackboneElement[]', required: false, description: 'List of past encounter classes (for transfers)' },
      { name: 'type', type: 'CodeableConcept[]', required: false, description: 'Specific type of encounter' },
      { name: 'serviceType', type: 'CodeableConcept', required: false, description: 'Specific type of service' },
      { name: 'priority', type: 'CodeableConcept', required: false, description: 'Urgency of the encounter' },
      { name: 'subject', type: 'Reference', required: false, description: 'The patient present at the encounter' },
      { name: 'episodeOfCare', type: 'Reference[]', required: false, description: 'Episode(s) of care that this encounter is part of' },
      { name: 'basedOn', type: 'Reference[]', required: false, description: 'The ServiceRequest that initiated this encounter' },
      { name: 'participant', type: 'BackboneElement[]', required: false, description: 'Healthcare providers involved' },
      { name: 'period', type: 'Period', required: false, description: 'Start and end time of the encounter' },
      { name: 'length', type: 'Duration', required: false, description: 'Quantity of time the encounter lasted' },
      { name: 'reasonCode', type: 'CodeableConcept[]', required: false, description: 'Coded reason for the encounter' },
      { name: 'diagnosis', type: 'BackboneElement[]', required: false, description: 'Diagnoses relevant to this encounter' },
      { name: 'hospitalization', type: 'BackboneElement', required: false, description: 'Admission and discharge details' },
      { name: 'location', type: 'BackboneElement[]', required: false, description: 'Location(s) the patient has been' },
      { name: 'serviceProvider', type: 'Reference', required: false, description: 'Organization responsible for the encounter' },
    ],
    encounterClasses: [
      { code: 'AMB', display: 'Ambulatory', description: 'Outpatient visit' },
      { code: 'EMER', display: 'Emergency', description: 'Emergency room visit' },
      { code: 'IMP', display: 'Inpatient', description: 'Hospital admission' },
      { code: 'OBSENC', display: 'Observation', description: 'Observation stay' },
      { code: 'SS', display: 'Short Stay', description: 'Short stay/same day' },
      { code: 'HH', display: 'Home Health', description: 'Home health visit' },
      { code: 'VR', display: 'Virtual', description: 'Telehealth encounter' },
    ],
    dischargeDispositions: [
      { code: 'home', display: 'Home', description: 'Discharged to home' },
      { code: 'other-hcf', display: 'Other Healthcare Facility', description: 'Transfer to another facility' },
      { code: 'hosp', display: 'Hospice', description: 'Discharged to hospice' },
      { code: 'snf', display: 'Skilled Nursing Facility', description: 'Transfer to SNF' },
      { code: 'rehab', display: 'Rehabilitation', description: 'Transfer to rehab' },
      { code: 'exp', display: 'Expired', description: 'Patient died' },
      { code: 'aadvice', display: 'Left Against Advice', description: 'Left AMA' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'status', type: 'token', example: 'status=finished' },
      { name: 'class', type: 'token', example: 'class=IMP' },
      { name: 'date', type: 'date', example: 'date=ge2024-01-01' },
      { name: 'type', type: 'token', example: 'type=http://snomed.info/sct|308335008' },
      { name: 'location', type: 'reference', example: 'location=Location/456' },
    ],
    relatedResources: ['Patient', 'Practitioner', 'Location', 'Organization', 'Condition', 'Procedure'],
    exampleJson: {
      resourceType: 'Encounter',
      id: 'example',
      status: 'finished',
      class: { system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode', code: 'AMB', display: 'ambulatory' },
      type: [{ coding: [{ system: 'http://snomed.info/sct', code: '308335008', display: 'Patient encounter procedure' }] }],
      subject: { reference: 'Patient/123' },
      period: { start: '2024-01-15T09:00:00Z', end: '2024-01-15T10:30:00Z' },
    },
    useCases: [
      'Tracking patient visits and admissions',
      'Grouping clinical activities by visit',
      'Admission/discharge/transfer workflows',
      'Billing and claims submission',
    ],
  },
  Practitioner: {
    icon: User,
    color: '#06b6d4',
    description: 'A person who is directly or indirectly involved in the provisioning of healthcare.',
    purpose: 'Practitioner includes physicians, nurses, pharmacists, therapists, and other healthcare workers. It captures professional qualifications, identifiers (NPI), and contact information.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'Business identifiers (NPI, DEA, medical license)' },
      { name: 'active', type: 'boolean', required: false, description: 'Whether this practitioner record is active' },
      { name: 'name', type: 'HumanName[]', required: false, description: 'Name(s) of the practitioner' },
      { name: 'telecom', type: 'ContactPoint[]', required: false, description: 'Contact details' },
      { name: 'address', type: 'Address[]', required: false, description: 'Address(es) of the practitioner' },
      { name: 'gender', type: 'code', required: false, description: 'male | female | other | unknown' },
      { name: 'birthDate', type: 'date', required: false, description: 'Date of birth' },
      { name: 'photo', type: 'Attachment[]', required: false, description: 'Image of the practitioner' },
      { name: 'qualification', type: 'BackboneElement[]', required: false, description: 'Certifications, licenses, training' },
      { name: 'communication', type: 'CodeableConcept[]', required: false, description: 'Languages the practitioner can use' },
    ],
    commonIdentifiers: [
      { system: 'http://hl7.org/fhir/sid/us-npi', name: 'NPI', description: 'National Provider Identifier (US)' },
      { system: 'https://usdeaonline.sas.samhsa.gov/', name: 'DEA', description: 'Drug Enforcement Administration Number' },
      { system: 'http://example.org/medical-license', name: 'Medical License', description: 'State medical license number' },
    ],
    searchParams: [
      { name: 'identifier', type: 'token', example: 'identifier=http://hl7.org/fhir/sid/us-npi|1234567890' },
      { name: 'name', type: 'string', example: 'name=Smith' },
      { name: 'family', type: 'string', example: 'family=Johnson' },
      { name: 'given', type: 'string', example: 'given=John' },
    ],
    relatedResources: ['PractitionerRole', 'Organization', 'Encounter', 'MedicationRequest'],
    exampleJson: {
      resourceType: 'Practitioner',
      id: 'example',
      identifier: [{ system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567890' }],
      active: true,
      name: [{ family: 'Smith', given: ['John'], prefix: ['Dr.'] }],
      qualification: [{ code: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0360', code: 'MD' }] } }],
    },
    useCases: [
      'Provider directories',
      'Care team management',
      'Prescribing and ordering workflows',
      'Credentialing and privileging',
    ],
  },
  Organization: {
    icon: Building2,
    color: '#64748b',
    description: 'A formally or informally recognized grouping of people or organizations.',
    purpose: 'Organization represents healthcare facilities, insurance companies, departments, and any other entity involved in healthcare delivery or administration.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'Business identifiers (NPI for organizations)' },
      { name: 'active', type: 'boolean', required: false, description: 'Whether the organization is still active' },
      { name: 'type', type: 'CodeableConcept[]', required: false, description: 'Kind of organization' },
      { name: 'name', type: 'string', required: false, description: 'Name used for the organization' },
      { name: 'alias', type: 'string[]', required: false, description: 'Alternative names' },
      { name: 'telecom', type: 'ContactPoint[]', required: false, description: 'Contact details' },
      { name: 'address', type: 'Address[]', required: false, description: 'Address(es) of the organization' },
      { name: 'partOf', type: 'Reference', required: false, description: 'Parent organization' },
      { name: 'contact', type: 'BackboneElement[]', required: false, description: 'Contact for the organization' },
      { name: 'endpoint', type: 'Reference[]', required: false, description: 'Technical endpoints for this organization' },
    ],
    searchParams: [
      { name: 'identifier', type: 'token', example: 'identifier=http://hl7.org/fhir/sid/us-npi|1234567890' },
      { name: 'name', type: 'string', example: 'name=General Hospital' },
      { name: 'type', type: 'token', example: 'type=prov' },
      { name: 'address', type: 'string', example: 'address=Boston' },
    ],
    relatedResources: ['Location', 'Practitioner', 'PractitionerRole', 'Endpoint'],
    exampleJson: {
      resourceType: 'Organization',
      id: 'example',
      identifier: [{ system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567890' }],
      active: true,
      type: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/organization-type', code: 'prov', display: 'Healthcare Provider' }] }],
      name: 'General Hospital',
      telecom: [{ system: 'phone', value: '555-1234' }],
    },
    useCases: [
      'Healthcare facility directories',
      'Insurance payer management',
      'Department and unit organization',
      'Claims and billing',
    ],
  },
  AllergyIntolerance: {
    icon: AlertTriangle,
    color: '#ef4444',
    description: 'Risk of harmful or undesirable physiological response unique to an individual.',
    purpose: 'AllergyIntolerance captures allergies and intolerances to substances like medications, foods, and environmental factors. It\'s critical for patient safety and clinical decision support.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'External identifiers' },
      { name: 'clinicalStatus', type: 'CodeableConcept', required: false, description: 'active | inactive | resolved' },
      { name: 'verificationStatus', type: 'CodeableConcept', required: false, description: 'unconfirmed | confirmed | refuted | entered-in-error' },
      { name: 'type', type: 'code', required: false, description: 'allergy | intolerance' },
      { name: 'category', type: 'code[]', required: false, description: 'food | medication | environment | biologic' },
      { name: 'criticality', type: 'code', required: false, description: 'low | high | unable-to-assess' },
      { name: 'code', type: 'CodeableConcept', required: false, description: 'Substance causing the allergy' },
      { name: 'patient', type: 'Reference', required: true, description: 'Who has the allergy' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Encounter when allergy was asserted' },
      { name: 'onset[x]', type: 'dateTime | Age | Period | Range | string', required: false, description: 'When allergy began' },
      { name: 'recordedDate', type: 'dateTime', required: false, description: 'Date first recorded' },
      { name: 'recorder', type: 'Reference', required: false, description: 'Who recorded the allergy' },
      { name: 'asserter', type: 'Reference', required: false, description: 'Source of the information' },
      { name: 'lastOccurrence', type: 'dateTime', required: false, description: 'Date of last known reaction' },
      { name: 'note', type: 'Annotation[]', required: false, description: 'Additional notes' },
      { name: 'reaction', type: 'BackboneElement[]', required: false, description: 'Adverse reaction events' },
    ],
    criticalityLevels: [
      { code: 'low', display: 'Low Risk', description: 'Reaction not expected to be life-threatening' },
      { code: 'high', display: 'High Risk', description: 'Reaction could be life-threatening' },
      { code: 'unable-to-assess', display: 'Unable to Assess', description: 'Cannot determine potential for life-threatening reaction' },
    ],
    severityLevels: [
      { code: 'mild', display: 'Mild', description: 'Causes mild symptoms' },
      { code: 'moderate', display: 'Moderate', description: 'Causes moderate symptoms' },
      { code: 'severe', display: 'Severe', description: 'Causes severe symptoms' },
    ],
    categories: [
      { code: 'food', display: 'Food', examples: 'Peanuts, shellfish, eggs, milk' },
      { code: 'medication', display: 'Medication', examples: 'Penicillin, aspirin, sulfa drugs' },
      { code: 'environment', display: 'Environment', examples: 'Pollen, dust, latex, bee stings' },
      { code: 'biologic', display: 'Biologic', examples: 'Blood products, vaccines' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'clinical-status', type: 'token', example: 'clinical-status=active' },
      { name: 'criticality', type: 'token', example: 'criticality=high' },
      { name: 'type', type: 'token', example: 'type=allergy' },
      { name: 'category', type: 'token', example: 'category=medication' },
      { name: 'code', type: 'token', example: 'code=http://snomed.info/sct|91936005' },
    ],
    relatedResources: ['Patient', 'Encounter', 'Practitioner'],
    exampleJson: {
      resourceType: 'AllergyIntolerance',
      id: 'example',
      clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical', code: 'active' }] },
      verificationStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification', code: 'confirmed' }] },
      type: 'allergy',
      category: ['medication'],
      criticality: 'high',
      code: { coding: [{ system: 'http://snomed.info/sct', code: '91936005', display: 'Penicillin allergy' }] },
      patient: { reference: 'Patient/123' },
      reaction: [{ manifestation: [{ coding: [{ system: 'http://snomed.info/sct', code: '39579001', display: 'Anaphylaxis' }] }], severity: 'severe' }],
    },
    useCases: [
      'Medication safety checks',
      'Clinical decision support alerts',
      'Patient allergy documentation',
      'Dietary restriction management',
    ],
  },
  Immunization: {
    icon: Syringe,
    color: '#10b981',
    description: 'Describes an immunization event for a patient.',
    purpose: 'Immunization records vaccinations administered to patients, including vaccine type, date, lot number, and administration details. Essential for public health tracking and patient care.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'Business identifiers' },
      { name: 'status', type: 'code', required: true, description: 'completed | entered-in-error | not-done' },
      { name: 'statusReason', type: 'CodeableConcept', required: false, description: 'Reason not done' },
      { name: 'vaccineCode', type: 'CodeableConcept', required: true, description: 'Vaccine product administered' },
      { name: 'patient', type: 'Reference', required: true, description: 'Who was immunized' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Encounter during immunization' },
      { name: 'occurrence[x]', type: 'dateTime | string', required: true, description: 'When the immunization occurred' },
      { name: 'recorded', type: 'dateTime', required: false, description: 'When the record was captured' },
      { name: 'primarySource', type: 'boolean', required: false, description: 'Whether data from entity administering vaccine' },
      { name: 'location', type: 'Reference', required: false, description: 'Where immunization occurred' },
      { name: 'manufacturer', type: 'Reference', required: false, description: 'Vaccine manufacturer' },
      { name: 'lotNumber', type: 'string', required: false, description: 'Vaccine lot number' },
      { name: 'expirationDate', type: 'date', required: false, description: 'Vaccine expiration date' },
      { name: 'site', type: 'CodeableConcept', required: false, description: 'Body site vaccine was administered' },
      { name: 'route', type: 'CodeableConcept', required: false, description: 'How vaccine entered body' },
      { name: 'doseQuantity', type: 'Quantity', required: false, description: 'Amount of vaccine administered' },
      { name: 'performer', type: 'BackboneElement[]', required: false, description: 'Who performed the immunization' },
      { name: 'note', type: 'Annotation[]', required: false, description: 'Additional notes' },
      { name: 'reasonCode', type: 'CodeableConcept[]', required: false, description: 'Why immunization occurred' },
      { name: 'reaction', type: 'BackboneElement[]', required: false, description: 'Details of reaction' },
      { name: 'protocolApplied', type: 'BackboneElement[]', required: false, description: 'Protocol followed' },
    ],
    commonVaccineCodes: [
      { code: '207', display: 'COVID-19 Moderna', system: 'CVX' },
      { code: '208', display: 'COVID-19 Pfizer-BioNTech', system: 'CVX' },
      { code: '140', display: 'Influenza, seasonal, injectable', system: 'CVX' },
      { code: '03', display: 'MMR', system: 'CVX' },
      { code: '21', display: 'Varicella', system: 'CVX' },
      { code: '115', display: 'Tdap', system: 'CVX' },
      { code: '33', display: 'Pneumococcal polysaccharide', system: 'CVX' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'status', type: 'token', example: 'status=completed' },
      { name: 'vaccine-code', type: 'token', example: 'vaccine-code=http://hl7.org/fhir/sid/cvx|208' },
      { name: 'date', type: 'date', example: 'date=ge2024-01-01' },
    ],
    relatedResources: ['Patient', 'Practitioner', 'Location', 'Organization'],
    exampleJson: {
      resourceType: 'Immunization',
      id: 'example',
      status: 'completed',
      vaccineCode: { coding: [{ system: 'http://hl7.org/fhir/sid/cvx', code: '208', display: 'COVID-19, mRNA, LNP-S, PF, 30 mcg/0.3 mL dose' }] },
      patient: { reference: 'Patient/123' },
      occurrenceDateTime: '2024-01-15',
      lotNumber: 'ABC123',
      site: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite', code: 'LA', display: 'left arm' }] },
      route: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration', code: 'IM', display: 'Injection, intramuscular' }] },
    },
    useCases: [
      'Immunization registry reporting',
      'Vaccine administration documentation',
      'Patient immunization history',
      'Public health surveillance',
    ],
  },
  Procedure: {
    icon: ClipboardList,
    color: '#f97316',
    description: 'An action performed on or for a patient as part of their care.',
    purpose: 'Procedure captures surgical procedures, diagnostic procedures, counseling, and other interventions. It records what was done, when, by whom, and the outcome.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'External identifiers' },
      { name: 'status', type: 'code', required: true, description: 'preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown' },
      { name: 'statusReason', type: 'CodeableConcept', required: false, description: 'Reason for current status' },
      { name: 'category', type: 'CodeableConcept', required: false, description: 'Classification of the procedure' },
      { name: 'code', type: 'CodeableConcept', required: false, description: 'Identification of the procedure' },
      { name: 'subject', type: 'Reference', required: true, description: 'Who the procedure was performed on' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Encounter during which procedure was performed' },
      { name: 'performed[x]', type: 'dateTime | Period | string | Age | Range', required: false, description: 'When the procedure was performed' },
      { name: 'recorder', type: 'Reference', required: false, description: 'Who recorded the procedure' },
      { name: 'asserter', type: 'Reference', required: false, description: 'Person who asserts this procedure' },
      { name: 'performer', type: 'BackboneElement[]', required: false, description: 'Who performed the procedure' },
      { name: 'location', type: 'Reference', required: false, description: 'Where the procedure happened' },
      { name: 'reasonCode', type: 'CodeableConcept[]', required: false, description: 'Coded reason for procedure' },
      { name: 'bodySite', type: 'CodeableConcept[]', required: false, description: 'Target body sites' },
      { name: 'outcome', type: 'CodeableConcept', required: false, description: 'Outcome of the procedure' },
      { name: 'report', type: 'Reference[]', required: false, description: 'Reports (e.g., operative note)' },
      { name: 'complication', type: 'CodeableConcept[]', required: false, description: 'Complications during procedure' },
      { name: 'followUp', type: 'CodeableConcept[]', required: false, description: 'Follow-up instructions' },
      { name: 'note', type: 'Annotation[]', required: false, description: 'Additional notes' },
      { name: 'focalDevice', type: 'BackboneElement[]', required: false, description: 'Manipulated, implanted, or removed device' },
      { name: 'usedCode', type: 'CodeableConcept[]', required: false, description: 'Coded items used during procedure' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'status', type: 'token', example: 'status=completed' },
      { name: 'code', type: 'token', example: 'code=http://snomed.info/sct|80146002' },
      { name: 'date', type: 'date', example: 'date=ge2024-01-01' },
      { name: 'performer', type: 'reference', example: 'performer=Practitioner/456' },
    ],
    relatedResources: ['Patient', 'Practitioner', 'Encounter', 'Location', 'Condition'],
    exampleJson: {
      resourceType: 'Procedure',
      id: 'example',
      status: 'completed',
      code: { coding: [{ system: 'http://snomed.info/sct', code: '80146002', display: 'Appendectomy' }] },
      subject: { reference: 'Patient/123' },
      performedDateTime: '2024-01-15T14:30:00Z',
      performer: [{ actor: { reference: 'Practitioner/456' } }],
    },
    useCases: [
      'Surgical procedure documentation',
      'Diagnostic procedure tracking',
      'Treatment history',
      'Clinical quality measures',
    ],
  },
  DiagnosticReport: {
    icon: FileText,
    color: '#6366f1',
    description: 'Findings and interpretation of diagnostic tests performed on patients.',
    purpose: 'DiagnosticReport represents results from laboratory tests, imaging studies, pathology reports, and other diagnostic investigations. It groups observations and provides interpretation.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'Business identifiers' },
      { name: 'status', type: 'code', required: true, description: 'registered | partial | preliminary | final | amended | corrected | appended | cancelled | entered-in-error | unknown' },
      { name: 'category', type: 'CodeableConcept[]', required: false, description: 'Service category (LAB, RAD, etc.)' },
      { name: 'code', type: 'CodeableConcept', required: true, description: 'Name/code for this diagnostic report' },
      { name: 'subject', type: 'Reference', required: false, description: 'Subject of the report' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Healthcare event related to report' },
      { name: 'effective[x]', type: 'dateTime | Period', required: false, description: 'Diagnostically relevant time' },
      { name: 'issued', type: 'instant', required: false, description: 'When this report was released' },
      { name: 'performer', type: 'Reference[]', required: false, description: 'Responsible diagnostic service' },
      { name: 'resultsInterpreter', type: 'Reference[]', required: false, description: 'Primary result interpreter' },
      { name: 'specimen', type: 'Reference[]', required: false, description: 'Specimens this report is based on' },
      { name: 'result', type: 'Reference[]', required: false, description: 'Observations that are part of this report' },
      { name: 'imagingStudy', type: 'Reference[]', required: false, description: 'Reference to full imaging study' },
      { name: 'media', type: 'BackboneElement[]', required: false, description: 'Key images associated with report' },
      { name: 'conclusion', type: 'string', required: false, description: 'Clinical conclusion (interpretation)' },
      { name: 'conclusionCode', type: 'CodeableConcept[]', required: false, description: 'Codes for the conclusion' },
      { name: 'presentedForm', type: 'Attachment[]', required: false, description: 'Entire report as PDF' },
    ],
    categories: [
      { code: 'LAB', display: 'Laboratory', description: 'Clinical laboratory results' },
      { code: 'RAD', display: 'Radiology', description: 'Imaging/radiology results' },
      { code: 'PAT', display: 'Pathology', description: 'Pathology/histology results' },
      { code: 'MB', display: 'Microbiology', description: 'Microbiology results' },
      { code: 'CUS', display: 'Cardiac Ultrasound', description: 'Echocardiography results' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'status', type: 'token', example: 'status=final' },
      { name: 'category', type: 'token', example: 'category=LAB' },
      { name: 'code', type: 'token', example: 'code=http://loinc.org|24323-8' },
      { name: 'date', type: 'date', example: 'date=ge2024-01-01' },
    ],
    relatedResources: ['Patient', 'Observation', 'Specimen', 'Practitioner', 'ImagingStudy'],
    exampleJson: {
      resourceType: 'DiagnosticReport',
      id: 'example',
      status: 'final',
      category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0074', code: 'LAB' }] }],
      code: { coding: [{ system: 'http://loinc.org', code: '24323-8', display: 'Comprehensive metabolic panel' }] },
      subject: { reference: 'Patient/123' },
      effectiveDateTime: '2024-01-15T10:30:00Z',
      issued: '2024-01-15T14:00:00Z',
      conclusion: 'All values within normal limits',
    },
    useCases: [
      'Lab result reporting',
      'Radiology report delivery',
      'Pathology findings documentation',
      'Results notification to providers',
    ],
  },
  CarePlan: {
    icon: Heart,
    color: '#14b8a6',
    description: 'Describes the intention of how care should be coordinated for a patient.',
    purpose: 'CarePlan captures planned activities, goals, and team members involved in a patient\'s care. It supports care coordination across multiple providers and settings.',
    fields: [
      { name: 'identifier', type: 'Identifier[]', required: false, description: 'External identifiers' },
      { name: 'status', type: 'code', required: true, description: 'draft | active | on-hold | revoked | completed | entered-in-error | unknown' },
      { name: 'intent', type: 'code', required: true, description: 'proposal | plan | order | option' },
      { name: 'category', type: 'CodeableConcept[]', required: false, description: 'Type of plan' },
      { name: 'title', type: 'string', required: false, description: 'Human-friendly name for the care plan' },
      { name: 'description', type: 'string', required: false, description: 'Summary of nature of plan' },
      { name: 'subject', type: 'Reference', required: true, description: 'Who the care plan is for' },
      { name: 'encounter', type: 'Reference', required: false, description: 'Encounter created as part of' },
      { name: 'period', type: 'Period', required: false, description: 'Time period plan covers' },
      { name: 'created', type: 'dateTime', required: false, description: 'Date record was created' },
      { name: 'author', type: 'Reference', required: false, description: 'Who is responsible for contents' },
      { name: 'contributor', type: 'Reference[]', required: false, description: 'Who provided input' },
      { name: 'careTeam', type: 'Reference[]', required: false, description: 'Who is involved' },
      { name: 'addresses', type: 'Reference[]', required: false, description: 'Health issues this plan addresses' },
      { name: 'supportingInfo', type: 'Reference[]', required: false, description: 'Information supporting the plan' },
      { name: 'goal', type: 'Reference[]', required: false, description: 'Desired outcomes' },
      { name: 'activity', type: 'BackboneElement[]', required: false, description: 'Planned activities' },
      { name: 'note', type: 'Annotation[]', required: false, description: 'Additional notes' },
    ],
    searchParams: [
      { name: 'patient', type: 'reference', example: 'patient=Patient/123' },
      { name: 'status', type: 'token', example: 'status=active' },
      { name: 'category', type: 'token', example: 'category=assess-plan' },
      { name: 'date', type: 'date', example: 'date=ge2024-01-01' },
    ],
    relatedResources: ['Patient', 'Practitioner', 'CareTeam', 'Goal', 'Condition'],
    exampleJson: {
      resourceType: 'CarePlan',
      id: 'example',
      status: 'active',
      intent: 'plan',
      title: 'Diabetes Management Plan',
      subject: { reference: 'Patient/123' },
      period: { start: '2024-01-01', end: '2024-12-31' },
      addresses: [{ reference: 'Condition/diabetes' }],
      goal: [{ reference: 'Goal/hba1c-target' }],
    },
    useCases: [
      'Chronic disease management',
      'Post-discharge care planning',
      'Care coordination across providers',
      'Population health management',
    ],
  },
};

// Terminology Systems Reference
export const TERMINOLOGY_SYSTEMS = {
  LOINC: {
    name: 'LOINC',
    fullName: 'Logical Observation Identifiers Names and Codes',
    url: 'http://loinc.org',
    description: 'Universal standard for identifying laboratory and clinical observations',
    usedFor: ['Observation codes', 'Lab test codes', 'Vital signs', 'Document types'],
    example: '8867-4 (Heart rate)',
    website: 'https://loinc.org',
  },
  SNOMED: {
    name: 'SNOMED CT',
    fullName: 'Systematized Nomenclature of Medicine - Clinical Terms',
    url: 'http://snomed.info/sct',
    description: 'Comprehensive clinical terminology covering diseases, findings, procedures, and more',
    usedFor: ['Conditions/diagnoses', 'Procedures', 'Body sites', 'Clinical findings'],
    example: '73211009 (Diabetes mellitus)',
    website: 'https://www.snomed.org',
  },
  ICD10: {
    name: 'ICD-10',
    fullName: 'International Classification of Diseases, 10th Revision',
    url: 'http://hl7.org/fhir/sid/icd-10',
    description: 'WHO standard for disease classification, used for billing and statistics',
    usedFor: ['Diagnosis coding', 'Billing', 'Mortality statistics'],
    example: 'E11.9 (Type 2 diabetes without complications)',
    website: 'https://www.who.int/classifications/icd',
  },
  RxNorm: {
    name: 'RxNorm',
    fullName: 'RxNorm',
    url: 'http://www.nlm.nih.gov/research/umls/rxnorm',
    description: 'Normalized names for clinical drugs and drug delivery devices',
    usedFor: ['Medication codes', 'Drug ordering', 'Prescription writing'],
    example: '197361 (Lisinopril 10 MG Oral Tablet)',
    website: 'https://www.nlm.nih.gov/research/umls/rxnorm',
  },
  CVX: {
    name: 'CVX',
    fullName: 'Vaccine Administered Code Set',
    url: 'http://hl7.org/fhir/sid/cvx',
    description: 'CDC-maintained codes for vaccines administered',
    usedFor: ['Immunization records', 'Vaccine registry reporting'],
    example: '208 (COVID-19, mRNA, LNP-S, PF, 30 mcg/0.3 mL dose)',
    website: 'https://www2a.cdc.gov/vaccines/iis/iisstandards/vaccines.asp',
  },
  CPT: {
    name: 'CPT',
    fullName: 'Current Procedural Terminology',
    url: 'http://www.ama-assn.org/go/cpt',
    description: 'AMA codes for medical, surgical, and diagnostic procedures',
    usedFor: ['Procedure coding', 'Billing', 'Revenue cycle'],
    example: '99213 (Office visit, established patient)',
    website: 'https://www.ama-assn.org/practice-management/cpt',
  },
  UCUM: {
    name: 'UCUM',
    fullName: 'Unified Code for Units of Measure',
    url: 'http://unitsofmeasure.org',
    description: 'Standard for units of measure in electronic data exchange',
    usedFor: ['Quantity units', 'Lab result units', 'Dosage units'],
    example: 'mg (milligram), /min (per minute)',
    website: 'https://ucum.org',
  },
};

interface ResourceDetailProps {
  resourceType: keyof typeof RESOURCE_KNOWLEDGE;
}

export function ResourceDetail({ resourceType }: ResourceDetailProps) {
  const resource = RESOURCE_KNOWLEDGE[resourceType];
  const [activeSection, setActiveSection] = useState<string>('overview');
  const Icon = resource.icon;

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'fields', label: 'Fields' },
    { id: 'search', label: 'Search Parameters' },
    { id: 'example', label: 'Example' },
    { id: 'usecases', label: 'Use Cases' },
  ];

  // Add special sections for certain resources
  if ('vitalSignsCodes' in resource) {
    sections.splice(2, 0, { id: 'vitals', label: 'Vital Signs Codes' });
  }
  if ('commonCodes' in resource) {
    sections.splice(2, 0, { id: 'codes', label: 'Code Systems' });
  }
  if ('criticalityLevels' in resource) {
    sections.splice(2, 0, { id: 'severity', label: 'Severity & Criticality' });
  }
  if ('encounterClasses' in resource) {
    sections.splice(2, 0, { id: 'classes', label: 'Encounter Classes' });
  }

  return (
    <div className="resource-detail">
      <div className="resource-detail-header" style={{ borderLeftColor: resource.color }}>
        <div className="resource-icon" style={{ backgroundColor: `${resource.color}15`, color: resource.color }}>
          <Icon size={32} />
        </div>
        <div>
          <h2>{resourceType}</h2>
          <p>{resource.description}</p>
        </div>
      </div>

      <div className="resource-detail-tabs">
        {sections.map(section => (
          <button
            key={section.id}
            className={`detail-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="resource-detail-content">
        {activeSection === 'overview' && (
          <div className="detail-section">
            <h3>Purpose</h3>
            <p>{resource.purpose}</p>

            <h3>Related Resources</h3>
            <div className="related-resources">
              {resource.relatedResources.map(rel => (
                <span key={rel} className="related-badge">{rel}</span>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'fields' && (
          <div className="detail-section">
            <h3>Resource Fields</h3>
            <div className="fields-table">
              <div className="fields-header">
                <span>Field Name</span>
                <span>Type</span>
                <span>Required</span>
                <span>Description</span>
              </div>
              {resource.fields.map(field => (
                <div key={field.name} className="field-row">
                  <code className="field-name">{field.name}</code>
                  <span className="field-type">{field.type}</span>
                  <span className={`field-required ${field.required ? 'yes' : 'no'}`}>
                    {field.required ? 'Yes' : 'No'}
                  </span>
                  <span className="field-desc">{field.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'vitals' && 'vitalSignsCodes' in resource && (
          <div className="detail-section">
            <h3>LOINC Codes for Vital Signs</h3>
            <p className="section-intro">
              These are the standard LOINC codes used for vital sign observations in FHIR.
              Using these codes ensures interoperability across healthcare systems.
            </p>
            <div className="vitals-table">
              <div className="vitals-header">
                <span>Vital Sign</span>
                <span>LOINC Code</span>
                <span>Unit</span>
                <span>Description</span>
              </div>
              {(resource as typeof RESOURCE_KNOWLEDGE.Observation).vitalSignsCodes.map(vital => (
                <div key={vital.loinc} className="vital-row">
                  <span className="vital-name">{vital.name}</span>
                  <code className="vital-code">{vital.loinc}</code>
                  <span className="vital-unit">{vital.unit}</span>
                  <span className="vital-desc">{vital.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'codes' && 'commonCodes' in resource && (
          <div className="detail-section">
            <h3>Common Code Systems</h3>
            <p className="section-intro">
              Conditions can be coded using multiple terminology systems. SNOMED CT is preferred
              for clinical use while ICD-10 is commonly used for billing.
            </p>
            <div className="codes-list">
              {(resource as typeof RESOURCE_KNOWLEDGE.Condition).commonCodes.map(code => (
                <div key={code.system} className="code-card">
                  <h4>{code.system}</h4>
                  <code className="code-url">{code.url}</code>
                  <p>{code.description}</p>
                  <div className="code-example">
                    <strong>Example:</strong> {code.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'severity' && 'criticalityLevels' in resource && (
          <div className="detail-section">
            <h3>Criticality Levels</h3>
            <p className="section-intro">
              Criticality represents the potential clinical harm of a reaction. It's an overall assessment,
              not specific to any single reaction event.
            </p>
            <div className="levels-grid">
              {(resource as typeof RESOURCE_KNOWLEDGE.AllergyIntolerance).criticalityLevels.map(level => (
                <div key={level.code} className={`level-card criticality-${level.code}`}>
                  <h4>{level.display}</h4>
                  <code>{level.code}</code>
                  <p>{level.description}</p>
                </div>
              ))}
            </div>

            <h3>Severity Levels</h3>
            <p className="section-intro">
              Severity describes the clinical assessment of a specific reaction event. It's part of the
              reaction component, not the overall allergy.
            </p>
            <div className="levels-grid">
              {(resource as typeof RESOURCE_KNOWLEDGE.AllergyIntolerance).severityLevels.map(level => (
                <div key={level.code} className={`level-card severity-${level.code}`}>
                  <h4>{level.display}</h4>
                  <code>{level.code}</code>
                  <p>{level.description}</p>
                </div>
              ))}
            </div>

            <h3>Allergy Categories</h3>
            <div className="categories-grid">
              {(resource as typeof RESOURCE_KNOWLEDGE.AllergyIntolerance).categories.map(cat => (
                <div key={cat.code} className="category-card">
                  <h4>{cat.display}</h4>
                  <code>{cat.code}</code>
                  <p><strong>Examples:</strong> {cat.examples}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'classes' && 'encounterClasses' in resource && (
          <div className="detail-section">
            <h3>Encounter Classes</h3>
            <p className="section-intro">
              The encounter class indicates the setting in which the healthcare interaction takes place.
            </p>
            <div className="classes-grid">
              {(resource as typeof RESOURCE_KNOWLEDGE.Encounter).encounterClasses.map(cls => (
                <div key={cls.code} className="class-card">
                  <h4>{cls.display}</h4>
                  <code>{cls.code}</code>
                  <p>{cls.description}</p>
                </div>
              ))}
            </div>

            <h3>Discharge Dispositions</h3>
            <p className="section-intro">
              Where the patient was discharged or transferred to after the encounter.
            </p>
            <div className="dispositions-grid">
              {(resource as typeof RESOURCE_KNOWLEDGE.Encounter).dischargeDispositions.map(disp => (
                <div key={disp.code} className="disposition-card">
                  <h4>{disp.display}</h4>
                  <code>{disp.code}</code>
                  <p>{disp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'search' && (
          <div className="detail-section">
            <h3>Search Parameters</h3>
            <p className="section-intro">
              Use these parameters to search for {resourceType} resources. Combine multiple parameters
              with <code>&</code> for more specific queries.
            </p>
            <div className="search-params-list">
              {resource.searchParams.map(param => (
                <div key={param.name} className="search-param">
                  <div className="param-header">
                    <code className="param-name">{param.name}</code>
                    <span className="param-type">{param.type}</span>
                  </div>
                  <code className="param-example">GET /{resourceType}?{param.example}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'example' && (
          <div className="detail-section">
            <h3>Example {resourceType} Resource</h3>
            <p className="section-intro">
              A minimal example showing the typical structure of a {resourceType} resource.
            </p>
            <pre className="example-json">
              <code>{JSON.stringify(resource.exampleJson, null, 2)}</code>
            </pre>
          </div>
        )}

        {activeSection === 'usecases' && (
          <div className="detail-section">
            <h3>Common Use Cases</h3>
            <ul className="usecases-list">
              {resource.useCases.map((useCase, i) => (
                <li key={i}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function ResourceKnowledgeBase() {
  const [selectedResource, setSelectedResource] = useState<keyof typeof RESOURCE_KNOWLEDGE | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string>('clinical');

  const categories = {
    administrative: {
      label: 'Administrative',
      icon: Building2,
      resources: ['Patient', 'Practitioner', 'Organization'] as (keyof typeof RESOURCE_KNOWLEDGE)[],
    },
    clinical: {
      label: 'Clinical',
      icon: Heart,
      resources: ['Observation', 'Condition', 'Procedure', 'DiagnosticReport', 'CarePlan'] as (keyof typeof RESOURCE_KNOWLEDGE)[],
    },
    medications: {
      label: 'Medications & Allergies',
      icon: Pill,
      resources: ['MedicationRequest', 'AllergyIntolerance', 'Immunization'] as (keyof typeof RESOURCE_KNOWLEDGE)[],
    },
    workflow: {
      label: 'Workflow',
      icon: ClipboardList,
      resources: ['Encounter'] as (keyof typeof RESOURCE_KNOWLEDGE)[],
    },
  };

  return (
    <div className="resource-knowledge-base">
      <div className="page-header">
        <div>
          <h1>FHIR Resource Knowledge Base</h1>
          <p className="subtitle">
            Comprehensive reference for FHIR resources with fields, codes, search parameters, and examples.
          </p>
        </div>
      </div>

      <div className="knowledge-layout">
        {/* Sidebar */}
        <div className="knowledge-sidebar">
          {Object.entries(categories).map(([key, category]) => {
            const CategoryIcon = category.icon;
            const isExpanded = expandedCategory === key;

            return (
              <div key={key} className="category-section">
                <button
                  className={`category-header ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setExpandedCategory(isExpanded ? '' : key)}
                >
                  <CategoryIcon size={18} />
                  <span>{category.label}</span>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {isExpanded && (
                  <div className="category-resources">
                    {category.resources.map(resource => {
                      const res = RESOURCE_KNOWLEDGE[resource];
                      const ResIcon = res.icon;
                      return (
                        <button
                          key={resource}
                          className={`resource-item ${selectedResource === resource ? 'selected' : ''}`}
                          onClick={() => setSelectedResource(resource)}
                          style={{ borderLeftColor: selectedResource === resource ? res.color : 'transparent' }}
                        >
                          <ResIcon size={16} style={{ color: res.color }} />
                          <span>{resource}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="sidebar-divider" />

          {/* Terminology Systems */}
          <div className="terminology-section">
            <h4>
              <Code size={16} />
              Terminology Systems
            </h4>
            <div className="terminology-list">
              {Object.entries(TERMINOLOGY_SYSTEMS).map(([key, term]) => (
                <a
                  key={key}
                  href={term.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminology-item"
                >
                  <span>{term.name}</span>
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="knowledge-content">
          {selectedResource ? (
            <ResourceDetail resourceType={selectedResource} />
          ) : (
            <div className="knowledge-welcome">
              <div className="welcome-icon">
                <Database size={48} />
              </div>
              <h2>Welcome to the FHIR Resource Knowledge Base</h2>
              <p>
                Select a resource from the sidebar to explore its structure, fields, terminology codes,
                search parameters, and real-world examples.
              </p>

              <div className="quick-start-grid">
                <div className="quick-start-card" onClick={() => setSelectedResource('Patient')}>
                  <User size={24} style={{ color: RESOURCE_KNOWLEDGE.Patient.color }} />
                  <h4>Patient</h4>
                  <p>Start with the core resource</p>
                </div>
                <div className="quick-start-card" onClick={() => setSelectedResource('Observation')}>
                  <Activity size={24} style={{ color: RESOURCE_KNOWLEDGE.Observation.color }} />
                  <h4>Observation</h4>
                  <p>Learn about vital signs & labs</p>
                </div>
                <div className="quick-start-card" onClick={() => setSelectedResource('Condition')}>
                  <FileText size={24} style={{ color: RESOURCE_KNOWLEDGE.Condition.color }} />
                  <h4>Condition</h4>
                  <p>Understand diagnosis coding</p>
                </div>
                <div className="quick-start-card" onClick={() => setSelectedResource('MedicationRequest')}>
                  <Pill size={24} style={{ color: RESOURCE_KNOWLEDGE.MedicationRequest.color }} />
                  <h4>MedicationRequest</h4>
                  <p>Explore prescriptions</p>
                </div>
              </div>

              <div className="terminology-overview">
                <h3>
                  <BookOpen size={20} />
                  Key Terminology Systems
                </h3>
                <div className="terminology-cards">
                  {Object.entries(TERMINOLOGY_SYSTEMS).slice(0, 4).map(([key, term]) => (
                    <div key={key} className="term-card">
                      <h4>{term.name}</h4>
                      <p>{term.description}</p>
                      <div className="term-used-for">
                        <strong>Used for:</strong>
                        <span>{term.usedFor.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
