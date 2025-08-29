import Image from "next/image";
import { THREATS_CONTENT } from "@/constants/content";

export default function ThreatsToWildlife() {
  const { title, items } = THREATS_CONTENT;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading for small devices - shown at top */}
        <div className="lg:hidden mb-8">
          <h2 className="font-serif text-6xl font-bold text-green-800 text-center">
            {title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left - Habitat Destruction */}
            <div className="relative">
              <Image
                src="/4.png"
                alt="Habitat destruction and deforestation"
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Top Right - Poaching */}
            <div className="relative">
              <Image
                src="/5.png"
                alt="Poaching and illegal wildlife trade"
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Bottom Left - Climate Change */}
            <div className="relative">
              <Image
                src="/6.png"
                alt="Climate change and environmental impacts"
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Bottom Right - Pollution */}
            <div className="relative">
              <Image
                src="/7.png"
                alt="Pollution and environmental contamination"
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Content List */}
          <div className="space-y-8">
            <h1 className="hidden lg:block font-serif text-6xl font-bold text-green-800 mb-8">
              {title}
            </h1>

            <div className="space-y-6">
              {items.map((t) => (
                <div key={t.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-sans font-bold text-base">
                    {t.number}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-green-800 mb-2">
                      {t.title}
                    </h3>
                    <p className="font-lato text-base md:text-lg text-gray-700 leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
