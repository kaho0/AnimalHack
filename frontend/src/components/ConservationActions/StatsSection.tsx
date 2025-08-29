import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";
import { StatsSectionProps } from "./interface";

export function StatsSection({
  totalActions,
  organizedCategories,
}: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      <div className="text-center">
        <div className="font-serif text-5xl font-light text-[#0F3D2E] mb-2">
          {totalActions}
        </div>
        <div className="font-serif text-sm text-[#6E7B74]/60 uppercase tracking-wider font-light">
          {CONSERVATION_ACTIONS_CONTENT.stats.actionsAvailable}
        </div>
      </div>
      <div className="text-center">
        <div className="font-serif text-5xl font-light text-[#C4704A] mb-2">
          {organizedCategories["Land/Water Protection"].actions.length +
            organizedCategories["Land/Water Management"].actions.length}
        </div>
        <div className="font-serif text-sm text-[#6E7B74]/60 uppercase tracking-wider font-light">
          {CONSERVATION_ACTIONS_CONTENT.stats.protectionManagement}
        </div>
      </div>
      <div className="text-center">
        <div className="font-serif text-5xl font-light text-[#A8C686] mb-2">
          {organizedCategories["Species Management"].actions.length +
            organizedCategories["Education & Awareness"].actions.length}
        </div>
        <div className="font-serif text-sm text-[#6E7B74]/60 uppercase tracking-wider font-light">
          {CONSERVATION_ACTIONS_CONTENT.stats.speciesEducation}
        </div>
      </div>
    </div>
  );
}
