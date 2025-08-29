import { TRANSITION_CONTENT, SHOPPING_CONTENT } from "@/constants/content";
import Image from "next/image";

export default function ShoppingImpact() {
  return (
    <section id="shopping-impact" className="relative py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Full-height image */}
        <div className="relative h-[360px] sm:h-[480px] lg:h-[720px]">
          <Image
            src="/u2.png"
            alt="Wildlife-friendly shopping and conservation impact"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Text content */}
        <div className="flex items-center bg-white">
          <div className="w-full px-4 sm:px-8 lg:px-14 py-10 lg:py-0">
            <div className="max-w-2xl ml-auto">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-[#0F3D2E]">
                {TRANSITION_CONTENT.title}
              </h2>
              <p className="text-lg sm:text-xl font-light text-[#4B5A54] mb-4">
                {TRANSITION_CONTENT.subtitle}
              </p>
              <p className="text-base sm:text-lg font-light text-[#4B5A54] mb-8">
                {TRANSITION_CONTENT.description}
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#166D3B] mb-3">
                {SHOPPING_CONTENT.title}
              </h3>
              <p className="text-sm sm:text-base text-[#7B1E28]">
                {SHOPPING_CONTENT.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
