import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fhirClient } from '../services/fhirClient';

// Hook to search patients
export function usePatientSearch(searchParams?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['patients', searchParams],
    queryFn: () => fhirClient.search<fhir4.Bundle>('Patient', {
      _count: 20,
      _sort: '-_lastUpdated',
      ...searchParams,
    }),
    staleTime: 30000, // 30 seconds
  });
}

// Hook to get a single patient
export function usePatient(id: string | undefined) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => fhirClient.read<fhir4.Patient>('Patient', id!),
    enabled: !!id,
  });
}

// Hook to create a patient
export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patient: fhir4.Patient) => fhirClient.create('Patient', patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}

// Hook to search observations
export function useObservationSearch(patientId?: string, code?: string) {
  return useQuery({
    queryKey: ['observations', patientId, code],
    queryFn: () => {
      const params: Record<string, string | number> = {
        _count: 50,
        _sort: '-date',
      };
      if (patientId) params.patient = patientId;
      if (code) params.code = code;
      return fhirClient.search<fhir4.Bundle>('Observation', params);
    },
    enabled: !!patientId,
  });
}

// Hook to get a single observation
export function useObservation(id: string | undefined) {
  return useQuery({
    queryKey: ['observation', id],
    queryFn: () => fhirClient.read<fhir4.Observation>('Observation', id!),
    enabled: !!id,
  });
}

// Hook to get conditions for a patient
export function useConditions(patientId?: string) {
  return useQuery({
    queryKey: ['conditions', patientId],
    queryFn: () => fhirClient.search<fhir4.Bundle>('Condition', {
      patient: patientId!,
      _count: 50,
    }),
    enabled: !!patientId,
  });
}

// Hook to get medications for a patient
export function useMedicationRequests(patientId?: string) {
  return useQuery({
    queryKey: ['medicationRequests', patientId],
    queryFn: () => fhirClient.search<fhir4.Bundle>('MedicationRequest', {
      patient: patientId!,
      _count: 50,
    }),
    enabled: !!patientId,
  });
}

// Hook to get capability statement
export function useCapabilityStatement() {
  return useQuery({
    queryKey: ['capabilityStatement'],
    queryFn: () => fhirClient.getCapabilityStatement(),
    staleTime: 300000, // 5 minutes
  });
}

// Hook to execute raw FHIR query
export function useRawQuery(path: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['rawQuery', path],
    queryFn: () => fhirClient.rawQuery(path),
    enabled: enabled && !!path,
    retry: false,
  });
}

// Generic hook for any resource type
export function useResourceSearch<T = fhir4.Bundle>(
  resourceType: string,
  params?: Record<string, string | number>,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: [resourceType.toLowerCase(), params],
    queryFn: () => fhirClient.search<T>(resourceType, {
      _count: 20,
      ...params,
    }),
    enabled,
  });
}

// Hook to get a single resource by type and id
export function useResource<T = fhir4.Resource>(
  resourceType: string,
  id: string | undefined
) {
  return useQuery({
    queryKey: [resourceType.toLowerCase(), id],
    queryFn: () => fhirClient.read<T>(resourceType, id!),
    enabled: !!id,
  });
}
