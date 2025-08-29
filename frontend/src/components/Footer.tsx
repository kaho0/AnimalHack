import { TreePine } from "lucide-react";

// Mock FOOTER_CONTENT for demonstration
const FOOTER_CONTENT = {
  description:
    "Discover and protect wildlife through comprehensive species data and conservation insights. Join us in building a sustainable future for all living creatures.",
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#033222] text-[#F8F4E3] py-16 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 transform rotate-12">
          <TreePine size={120} />
        </div>
        <div className="absolute bottom-20 right-20 transform -rotate-12">
          <TreePine size={80} />
        </div>
        <div className="absolute top-32 right-32 transform rotate-45">
          <TreePine size={60} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-[#C4A95B] to-[#7B1E28] p-3 rounded-xl shadow-lg">
                <TreePine size={32} className="text-[#F8F4E3]" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#F8F4E3] to-[#C4A95B] bg-clip-text text-transparent">
                  AnimalHack
                </span>
                <div className="text-sm text-[#C4A95B] font-medium">
                  Wildlife Conservation Platform
                </div>
              </div>
            </div>
            <p className="text-[#C4A95B] leading-relaxed mb-8 max-w-md text-lg">
              {FOOTER_CONTENT.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="relative">
            <h3 className="text-xl font-bold mb-6 text-[#F8F4E3]">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#search"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Search Species
                </a>
              </li>
              <li>
                <a
                  href="#conservation"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Conservation Actions
                </a>
              </li>
              <li>
                <a
                  href="#trade"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Use & Trade
                </a>
              </li>
              <li>
                <a
                  href="#chat"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Chat Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="relative">
            <h3 className="text-xl font-bold mb-6 text-[#F8F4E3]">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Data Sources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Conservation Guide
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#C4A95B] hover:text-[#F8F4E3] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#C4A95B] rounded-full mr-3 group-hover:bg-[#F8F4E3] transition-colors duration-300"></span>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
