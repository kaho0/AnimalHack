import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";

export function HeaderSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center mb-6">
        <h2 className="font-serif text-6xl lg:text-7xl font-light text-[#0F3D2E] leading-tight tracking-tight">
          {CONSERVATION_ACTIONS_CONTENT.header.title}
        </h2>
      </div>
      <p className="font-serif text-2xl leading-relaxed font-light tracking-wide max-w-4xl mx-auto text-[#6E7B74]">
        {CONSERVATION_ACTIONS_CONTENT.header.subtitle}
      </p>
    </div>
  );
}
