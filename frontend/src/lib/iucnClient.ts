export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
};

// IUCN API response types
export interface ConservationActionDescription {
  en: string;
}

export interface ConservationAction {
  code: string;
  description: ConservationActionDescription;
}

export interface ConservationActionsResponse {
  conservation_actions: ConservationAction[];
}

export interface ConservationActionDetail {
  conservation_action: ConservationAction;
  assessments: Array<{
    year_published: string;
    latest: boolean;
    possibly_extinct: boolean;
    possibly_extinct_in_the_wild: boolean;
    sis_taxon_id: number;
    url: string;
    taxon_scientific_name: string;
    red_list_category_code: string;
    assessment_id: number;
    code: string;
    code_type: string;
    scopes: Array<{
      description: ConservationActionDescription;
      code: string;
    }>;
  }>;
}

// Use and Trade types
export interface UseAndTradeDescription {
  en: string;
}

export interface UseAndTrade {
  code: string;
  description: UseAndTradeDescription;
}

export interface UseAndTradeResponse {
  use_and_trade: UseAndTrade[];
}

export interface UseAndTradeDetail {
  use_and_trade: UseAndTrade;
  assessments: Array<{
    year_published: string;
    latest: boolean;
    possibly_extinct: boolean;
    possibly_extinct_in_the_wild: boolean;
    sis_taxon_id: number;
    url: string;
    taxon_scientific_name: string;
    red_list_category_code: string;
    assessment_id: number;
    code: string;
    code_type: string;
    scopes: Array<{
      description: UseAndTradeDescription;
      code: string;
    }>;
  }>;
}

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
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export const iucnClient = {
  getAssessment: (assessmentId: number) =>
    request(`/api/assessment/${assessmentId}`),
  getAssessmentRaw: (assessmentId: number) =>
    request(`/api/v4/assessment/${assessmentId}`),
  getTaxaByScientificName: (genus: string, species: string, infra?: string) => {
    const q = new URLSearchParams({ genus_name: genus, species_name: species });
    if (infra) q.set("infra_name", infra);
    return request(`/api/v4/taxa/scientific_name?${q.toString()}`);
  },
  getConservationActions: () =>
    request<ConservationActionsResponse>(`/api/conservation_actions`),
  getConservationActionByCode: (code: string) =>
    request<ConservationActionDetail>(`/api/conservation_actions/${code}`),
  getUseAndTrade: () => request<UseAndTradeResponse>(`/api/use_and_trade`),
  getUseAndTradeByCode: (code: string) =>
    request<UseAndTradeDetail>(`/api/use_and_trade/${code}`),
};
