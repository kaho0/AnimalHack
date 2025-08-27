export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
};

const BASE_URL: string =
  (globalThis as any).__API_BASE_URL || "http://localhost:8000";

async function request<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, signal } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export const iucnClient = {
  // Mirrors upstream paths through our proxy
  getAssessment: (assessmentId: number) =>
    request(`/api/assessment/${assessmentId}`),
  getAssessmentRaw: (assessmentId: number) =>
    request(`/api/v4/assessment/${assessmentId}`),
  getTaxaByScientificName: (genus: string, species: string, infra?: string) => {
    const q = new URLSearchParams({ genus_name: genus, species_name: species });
    if (infra) q.set("infra_name", infra);
    return request(`/api/v4/taxa/scientific_name?${q.toString()}`);
  },
  // Add more helpers as needed following the docs
};
