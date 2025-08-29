import {
  ConservationAction,
  CategoryData,
  OrganizedCategories,
} from "../types";

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export interface StatsSectionProps {
  totalActions: number;
  organizedCategories: OrganizedCategories;
}

export interface CategoryCardProps {
  categoryName: string;
  categoryData: CategoryData;
  isExpanded: boolean;
  onToggleCategory: (categoryName: string) => void;
}

export interface CategoryGridProps {
  organizedCategories: OrganizedCategories;
  expandedCategories: Set<string>;
  showAllCategories: boolean;
  onToggleCategory: (categoryName: string) => void;
  onToggleShowAll: () => void;
}
