import { ArrowRight, Info, TreePine } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[70vh] bg-[#1a1a1a] text-white overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0">
        <img
          src="/t2.jpg"
          alt="Majestic Wildlife"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8 w-full">
          {/* Left Content */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-6xl lg:text-8xl text-[#F5F5DC] font-light mb-6 leading-[0.9]">
              Siberian
              <br />
              <span className="font-normal">Tiger</span>
            </h1>

            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-gray-300 block mb-1">
                Status
              </span>
              <span className="text-[#ff6b6b] text-lg font-medium">
                Endangered
              </span>
            </div>

            <p className="text-[#F5F5DC] text-lg leading-relaxed mb-8 max-w-md">
              Discover the stories behind our planet's most magnificent species
              and learn how your actions can help preserve them for future
              generations.
            </p>

            <div className="flex items-center space-x-6">
              <button className="group bg-[#61471a] hover:bg-[#c4704a] text-black font-semibold px-8 py-4 transition-all duration-300 flex items-center">
                <span className="mr-3 text-[#F5F5DC]">Explore Species</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-[#F5F5DC]" />
              </button>
            </div>
          </div>

          {/* Right side - Image space (image is already background) */}
          <div className="hidden lg:block col-span-6"></div>
        </div>
      </div>
    </section>
  );
}
