import axios, { type AxiosInstance } from 'axios';

// Public FHIR test servers
export const FHIR_SERVERS = {
  HAPI_R4: 'https://hapi.fhir.org/baseR4',
  HAPI_R5: 'https://hapi.fhir.org/baseR5',
} as const;

export type FhirServerKey = keyof typeof FHIR_SERVERS;

class FhirClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string = FHIR_SERVERS.HAPI_R4) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json',
      },
    });
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
    this.client.defaults.baseURL = url;
  }

  // READ - Get a single resource by ID
  async read<T = fhir4.Resource>(resourceType: string, id: string): Promise<T> {
    const response = await this.client.get<T>(`/${resourceType}/${id}`);
    return response.data;
  }

  // SEARCH - Search for resources with parameters
  async search<T = fhir4.Bundle>(
    resourceType: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const response = await this.client.get<T>(`/${resourceType}`, { params });
    return response.data;
  }

  // CREATE - Create a new resource
  async create<T = fhir4.Resource>(resourceType: string, resource: T): Promise<T> {
    const response = await this.client.post<T>(`/${resourceType}`, resource);
    return response.data;
  }

  // UPDATE - Update an existing resource
  async update<T = fhir4.Resource>(
    resourceType: string,
    id: string,
    resource: T
  ): Promise<T> {
    const response = await this.client.put<T>(`/${resourceType}/${id}`, resource);
    return response.data;
  }

  // DELETE - Delete a resource
  async delete(resourceType: string, id: string): Promise<void> {
    await this.client.delete(`/${resourceType}/${id}`);
  }

  // Get server capability statement (metadata)
  async getCapabilityStatement(): Promise<fhir4.CapabilityStatement> {
    const response = await this.client.get<fhir4.CapabilityStatement>('/metadata');
    return response.data;
  }

  // Execute a raw query (for learning purposes)
  async rawQuery<T = unknown>(path: string): Promise<T> {
    const response = await this.client.get<T>(path);
    return response.data;
  }

  // Get next page from bundle
  async getNextPage<T = fhir4.Bundle>(bundle: fhir4.Bundle): Promise<T | null> {
    const nextLink = bundle.link?.find(l => l.relation === 'next');
    if (!nextLink?.url) return null;

    const response = await axios.get<T>(nextLink.url, {
      headers: {
        'Accept': 'application/fhir+json',
      },
    });
    return response.data;
  }
}

// Singleton instance
export const fhirClient = new FhirClient();

export default FhirClient;
