import { Heart, Leaf } from "lucide-react";
import { TRANSITION_CONTENT } from "@/constants/content";

export default function Transition() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#166D3B] to-[#98AE87]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-[#C4A95B]/20 rounded-full mb-8">
          <Heart className="w-10 h-10 text-[#C4A95B]" />
        </div>

        <h2 className="text-4xl font-bold text-[#F8F4E3] mb-6">
          {TRANSITION_CONTENT.title}
        </h2>

        <p className="text-xl text-[#F8F4E3]/90 leading-relaxed mb-8">
          {TRANSITION_CONTENT.subtitle}
        </p>

        <div className="bg-[#F8F4E3]/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#C4A95B]/20 mb-8">
          <p className="text-lg text-[#F8F4E3] leading-relaxed">
            {TRANSITION_CONTENT.description}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 text-[#C4A95B]">
          <div className="w-16 h-px bg-[#C4A95B]/40"></div>
          <Leaf className="w-8 h-8" />
          <div className="w-16 h-px bg-[#C4A95B]/40"></div>
        </div>
      </div>
    </section>
  );
}
