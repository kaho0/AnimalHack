import { Heart, Globe, Leaf, ShoppingBag } from "lucide-react";
import { SiAnimalplanet } from "react-icons/si";
import Image from "next/image";

export default function ShoppingImpact() {
  return (
    <section id="shopping-impact" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image with constrained height */}
          <div className="relative h-80 sm:h-96 lg:h-[560px] rounded-2xl overflow-hidden">
            <Image
              src="/u2.png"
              alt="Wildlife-friendly shopping and conservation impact"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right: Text content */}
          <div className="flex items-center">
            <div className="w-full">
              <div className="max-w-2xl ml-auto">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight text-[#0F3D2E]">
                    Helping Animals Every Day
                  </h2>
                </div>

                <p className="text-lg sm:text-xl font-light text-[#4B5A54] mb-6">
                  The things we buy can help animals or hurt them. Even small
                  choices matter!
                </p>

                <p className="text-base sm:text-lg font-light text-[#4B5A54] mb-6">
                  AnimalHack shows kids and families how to pick products that
                  are kind to animals and safe for nature. You can:
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <SiAnimalplanet className="w-5 h-5 text-[#C4704A] mt-1 flex-shrink-0" />
                    <p className="text-base text-[#4B5A54]">
                      Choose snacks that don't hurt animals.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <SiAnimalplanet className="w-5 h-5 text-[#C4704A] mt-1 flex-shrink-0" />
                    <p className="text-base text-[#4B5A54]">
                      Pick toys and clothes made without harming wildlife.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <SiAnimalplanet className="w-5 h-5 text-[#C4704A] mt-1 flex-shrink-0" />
                    <p className="text-base text-[#4B5A54]">
                      Take care of forests, oceans, and rivers by shopping
                      smart.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <SiAnimalplanet className="w-5 h-5 text-[#C4704A] mt-1 flex-shrink-0" />
                    <p className="text-base text-[#4B5A54]">
                      Learn fun ways to protect animals every day.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#166D3B]">
                  <p className="text-lg font-medium">
                    Every choice you make can help animals stay happy and keep
                    the Earth healthy. You can be a hero for wildlife, just by
                    choosing wisely!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
