import React from "react";

const FocusAreas = () => {
  const focusAreas = [
    {
      id: 1,
      title: "Animal Cruelty Awareness",
      description:
        "Learn how animals suffer in testing, fashion, and farming. Chat with our bot to find cruelty-free luxury alternatives.",
      image: "/f1.png",
    },
    {
      id: 2,
      title: "Conservation Efforts",
      description:
        "See IUCN Red List data and real actions to protect endangered species and restore ecosystems.",
      image: "/f2.png",
    },
    {
      id: 3,
      title: "Animal Use & Trade",
      description:
        "Explore how animals are exploited in fashion, pets, and trafficking. Discover sustainable, ethical alternatives.",
      image: "/f3.png",
    },
    {
      id: 4,
      title: "Animal Education & Search",
      description:
        "Search any animal by name or scientific name. See its classification and common names.",
      image: "/f4.png",
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: "#033222" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Focus Areas
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            AnimalHack works on four pillars of action: raising awareness,
            conserving species, stopping harmful trade, and educating everyone
            about animals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {focusAreas.map((area) => (
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
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {area.title}
                  </h3>
                  <p className="text-gray-800 text-sm leading-relaxed">
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
