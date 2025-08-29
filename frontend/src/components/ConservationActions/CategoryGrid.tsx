import { ChevronDown, ChevronUp } from "lucide-react";
import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";
import { CategoryCard } from "./CategoryCard";

import { CategoryGridProps } from "./interface";

export function CategoryGrid({
  organizedCategories,
  expandedCategories,
  showAllCategories,
  onToggleCategory,
  onToggleShowAll,
}: CategoryGridProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(organizedCategories).map(
          ([categoryName, categoryData], index) => {
            // Initially show only first 3 categories
            if (!showAllCategories && index >= 3) {
              return null;
            }

            const isExpanded = expandedCategories.has(categoryName);
            return (
              <CategoryCard
                key={categoryName}
                categoryName={categoryName}
                categoryData={categoryData}
                isExpanded={isExpanded}
                onToggleCategory={onToggleCategory}
              />
            );
          }
        )}
      </div>

      {/* Show All/Show Less Categories Button - Positioned after the grid */}
      <div className="text-center mt-12">
        {!showAllCategories ? (
          <button
            onClick={onToggleShowAll}
            className="inline-flex items-center px-8 py-4 bg-[#0F3D2E] hover:bg-[#033222] text-[#F5F5DC] rounded-full font-serif font-light transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">
              {CONSERVATION_ACTIONS_CONTENT.categories.showAllCategories}
            </span>
            <ChevronDown className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onToggleShowAll}
            className="inline-flex items-center px-8 py-4 bg-[#C4704A] hover:bg-[#B85A3A] text-[#F5F5DC] rounded-full font-serif font-light transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">
              {CONSERVATION_ACTIONS_CONTENT.categories.showLessCategories}
            </span>
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
