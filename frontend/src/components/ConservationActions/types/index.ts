export interface ConservationAction {
  code?: string;
  description: {
    en: string;
  };
}

export interface CategoryData {
  icon: string;
  color: string;
  actions: ConservationAction[];
}

export interface OrganizedCategories {
  [key: string]: CategoryData;
}

// Re-export interfaces for convenience
export * from "../interface";
