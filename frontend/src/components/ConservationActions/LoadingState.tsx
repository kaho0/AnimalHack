import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";

export function LoadingState() {
  return (
    <div className="flex justify-center items-center py-7">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A8C686]/20 border-t-[#C4704A] mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C4704A]/40 animate-ping"></div>
        </div>
        <p className="font-serif text-xl text-[#0F3D2E]/80 font-light">
          {CONSERVATION_ACTIONS_CONTENT.loading.title}
        </p>
        <p className="font-serif text-base text-[#6E7B74]/60 mt-2 font-light">
          {CONSERVATION_ACTIONS_CONTENT.loading.subtitle}
        </p>
      </div>
    </div>
  );
}
