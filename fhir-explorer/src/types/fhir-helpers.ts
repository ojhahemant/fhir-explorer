// Helper types and utilities for working with FHIR resources

export interface PatientName {
  given?: string[];
  family?: string;
  use?: string;
  text?: string;
}

export interface PatientAddress {
  line?: string[];
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  use?: string;
}

// Extract display name from Patient resource
export function getPatientDisplayName(patient: fhir4.Patient): string {
  const officialName = patient.name?.find(n => n.use === 'official') || patient.name?.[0];

  if (!officialName) return 'Unknown';

  if (officialName.text) return officialName.text;

  const given = officialName.given?.join(' ') || '';
  const family = officialName.family || '';

  return `${given} ${family}`.trim() || 'Unknown';
}

// Extract age from birthDate
export function getPatientAge(birthDate?: string): number | null {
  if (!birthDate) return null;

  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Format address for display
export function formatAddress(address?: fhir4.Address): string {
  if (!address) return 'No address';

  const parts = [
    address.line?.join(', '),
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);

  return parts.join(', ') || 'No address';
}

// Get gender display
export function getGenderDisplay(gender?: string): string {
  const genderMap: Record<string, string> = {
    male: 'Male',
    female: 'Female',
    other: 'Other',
    unknown: 'Unknown',
  };
  return gender ? genderMap[gender] || gender : 'Unknown';
}

// Extract reference ID from FHIR reference
export function extractIdFromReference(reference?: string): string | null {
  if (!reference) return null;
  const parts = reference.split('/');
  return parts[parts.length - 1] || null;
}

// Format FHIR date for display
export function formatFhirDate(date?: string): string {
  if (!date) return 'Unknown';

  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return date;
  }
}

// Format FHIR dateTime for display
export function formatFhirDateTime(dateTime?: string): string {
  if (!dateTime) return 'Unknown';

  try {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateTime;
  }
}

// Get observation value with unit
export function getObservationValue(observation: fhir4.Observation): string {
  if (observation.valueQuantity) {
    const value = observation.valueQuantity.value;
    const unit = observation.valueQuantity.unit || observation.valueQuantity.code || '';
    return `${value} ${unit}`.trim();
  }

  if (observation.valueString) {
    return observation.valueString;
  }

  if (observation.valueCodeableConcept) {
    return observation.valueCodeableConcept.text ||
           observation.valueCodeableConcept.coding?.[0]?.display ||
           'Coded value';
  }

  if (observation.valueBoolean !== undefined) {
    return observation.valueBoolean ? 'Yes' : 'No';
  }

  if (observation.valueInteger !== undefined) {
    return observation.valueInteger.toString();
  }

  return 'No value';
}

// Get coding display from CodeableConcept
export function getCodeableConceptDisplay(concept?: fhir4.CodeableConcept): string {
  if (!concept) return 'Unknown';

  return concept.text ||
         concept.coding?.[0]?.display ||
         concept.coding?.[0]?.code ||
         'Unknown';
}

// Common LOINC codes for vital signs
export const VITAL_SIGNS_CODES = {
  HEART_RATE: '8867-4',
  BLOOD_PRESSURE_SYSTOLIC: '8480-6',
  BLOOD_PRESSURE_DIASTOLIC: '8462-4',
  BODY_TEMPERATURE: '8310-5',
  RESPIRATORY_RATE: '9279-1',
  OXYGEN_SATURATION: '2708-6',
  BODY_HEIGHT: '8302-2',
  BODY_WEIGHT: '29463-7',
  BMI: '39156-5',
} as const;

// Common resource types in FHIR
export const COMMON_RESOURCE_TYPES = [
  'Patient',
  'Practitioner',
  'Organization',
  'Observation',
  'Condition',
  'MedicationRequest',
  'Procedure',
  'Encounter',
  'DiagnosticReport',
  'AllergyIntolerance',
  'Immunization',
  'CarePlan',
] as const;
