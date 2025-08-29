import { ShoppingBag } from "lucide-react";
import { SHOPPING_CONTENT } from "@/constants/content";

export default function Shopping() {
  return (
    <section className="py-20 bg-[#F8F4E3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-[#166D3B]/20 rounded-full mb-6">
            <ShoppingBag className="w-8 h-8 text-[#166D3B]" />
          </div>
          <h2 className="text-4xl font-bold text-[#166D3B] mb-6">
            {SHOPPING_CONTENT.title}
          </h2>
          <p className="text-xl text-[#7B1E28] max-w-3xl mx-auto leading-relaxed">
            {SHOPPING_CONTENT.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
