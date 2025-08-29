import Image from "next/image";

export default function ThreatsToWildlife() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading for small devices - shown at top */}
        <div className="lg:hidden mb-8">
          <h2 className="text-3xl font-bold text-green-800 text-center">
            Threats to Wildlife
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
            <h2 className="hidden lg:block text-3xl font-bold text-green-800 mb-8">
              Threats to Wildlife
            </h2>

            <div className="space-y-6">
              {/* Threat 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-base">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Habitat destruction
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Deforestation, urban development, and agricultural expansion
                    are destroying natural habitats at an alarming rate. This
                    forces wildlife to relocate, adapt, or face extinction,
                    disrupting entire ecosystems and food chains.
                  </p>
                </div>
              </div>

              {/* Threat 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-base">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Poaching and illegal trade
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Illegal hunting and trafficking of wildlife for meat,
                    trophies, traditional medicine, and exotic pets drives many
                    species toward extinction. This criminal activity generates
                    billions annually while devastating animal populations.
                  </p>
                </div>
              </div>

              {/* Threat 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-base">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Climate change
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Rising temperatures, changing precipitation patterns, and
                    extreme weather events alter habitats and migration
                    patterns. Many species cannot adapt quickly enough, leading
                    to population declines and ecosystem imbalances.
                  </p>
                </div>
              </div>

              {/* Threat 4 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-base">
                  04
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Pollution
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Chemical pollutants, plastic waste, and toxic substances
                    contaminate air, water, and soil. This pollution directly
                    harms wildlife through poisoning, entanglement, and habitat
                    degradation, affecting species survival and reproduction.
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
