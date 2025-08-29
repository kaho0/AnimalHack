import React from "react";
import { FOCUS_AREAS_CONTENT } from "@/constants/content";

const FocusAreas = () => {
  const { sectionTitle, sectionDescription, items } = FOCUS_AREAS_CONTENT;

  return (
    <section className="py-10" style={{ backgroundColor: "#033222" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-6xl font-bold text-white mb-4">
            {sectionTitle}
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="flex">
                {/* Image Section */}
                <div className="w-1/2">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="w-1/2 bg-yellow-300 p-6 flex flex-col justify-center relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight font-serif">
                    {area.title}
                  </h3>
                  <p className="font-lato text-base md:text-lg text-gray-800 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
