import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Globe,
  TreePine,
  GraduationCap,
  Fish,
  Scale,
  DollarSign,
} from "lucide-react";
import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";
import { CategoryCardProps } from "./interface";

const iconMap = {
  Globe,
  TreePine,
  GraduationCap,
  Fish,
  Scale,
  DollarSign,
};

export function CategoryCard({
  categoryName,
  categoryData,
  isExpanded,
  onToggleCategory,
}: CategoryCardProps) {
  const IconComponent =
    iconMap[categoryData.icon as keyof typeof iconMap] || Globe;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#C8B6A6]/20 bg-white hover:border-[#C4704A]/30 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Header with Icon and Title */}
      <div className="flex items-start space-x-4 p-8 pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#A8C686]/20 to-[#C8B6A6]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-8 h-8 text-[#0F3D2E]" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-light text-[#0F3D2E] leading-tight mb-2">
            {categoryName}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="font-serif ml-6 text-sm text-[#6E7B74] font-light">
              {categoryData.actions.length} Actions
            </span>
          </div>
        </div>
      </div>

      {/* Preview of first few actions */}
      <div className="px-8 pb-4 flex-1">
        <div className="space-y-3">
          {categoryData.actions.slice(0, 4).map((action, index) => (
            <div
              key={action.code || index}
              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F5F5DC]/50 transition-colors duration-200"
            >
              <span className="w-2 h-2 bg-[#C4704A] rounded-full mt-2 flex-shrink-0"></span>
              <p className="font-serif text-sm text-[#2F3E34]/80 leading-relaxed font-light">
                {action.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Show More Actions Button - Only visible when not expanded and has more than 4 actions */}
      {!isExpanded && categoryData.actions.length > 4 && (
        <div className="px-8 pb-6 mt-auto">
          <button
            onClick={() => onToggleCategory(categoryName)}
            className="w-full py-3 bg-[#0F3D2E]/10 hover:bg-[#0F3D2E]/20 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200 group"
          >
            <span className="font-serif text-sm text-[#0F3D2E] font-light">
              {CONSERVATION_ACTIONS_CONTENT.categories.showMore}
            </span>
            <ChevronDown className="w-4 h-4 text-[#0F3D2E]" />
          </button>
        </div>
      )}

      {/* Show Less Button - Only visible when expanded */}
      {isExpanded && (
        <div className="px-8 pb-6 mt-auto">
          <button
            onClick={() => onToggleCategory(categoryName)}
            className="w-full py-3 bg-[#0F3D2E]/10 hover:bg-[#0F3D2E]/20 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200 group"
          >
            <span className="font-serif text-sm text-[#0F3D2E] font-light">
              {CONSERVATION_ACTIONS_CONTENT.categories.showLess}
            </span>
            <ChevronUp className="w-4 h-4 text-[#0F3D2E]" />
          </button>
        </div>
      )}

      {/* Expandable section with all actions */}
      {isExpanded && (
        <div className="border-t border-[#C8B6A6]/20">
          <div className="p-8 pt-6">
            <div className="space-y-3 max-h-96 overflow-y-auto text-left">
              {categoryData.actions.slice(4).map((action, index) => (
                <div
                  key={action.code || index + 4}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F5F5DC]/50 transition-colors duration-200"
                >
                  <span className="w-2 h-2 bg-[#C4704A] rounded-full mt-2 flex-shrink-0"></span>
                  <div className="flex-1">
                    <p className="font-serif text-sm text-[#2F3E34]/80 leading-relaxed font-light">
                      {action.description.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
