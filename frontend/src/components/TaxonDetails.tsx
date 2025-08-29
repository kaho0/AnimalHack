import React, { useState, useEffect } from "react";
import { getFirstSpeciesImage } from "@/lib/speciesImage";

type SSCGroup = {
  name: string;
  url?: string;
  description?: string;
};

type CommonName = {
  main: boolean;
  name: string;
  language: string;
};

type Synonym = {
  name: string;
  status?: string;
};

export type Taxon = {
  scientific_name: string;
  authority?: string | null;
  kingdom_name?: string;
  phylum_name?: string;
  class_name?: string;
  order_name?: string;
  family_name?: string;
  genus_name?: string;
  species_name?: string;
  subpopulation_name?: string | null;
  infra_name?: string | null;
  ssc_groups?: SSCGroup[];
  common_names?: CommonName[];
  synonyms?: Synonym[];
};

function Badge({
  children,
  variant = "default",
  style,
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "secondary";
  style?: React.CSSProperties;
}) {
  const baseClasses =
    "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200";

  const variants = {
    default: "bg-[#61471a]/20 text-[#F5F5DC] border border-[#61471a]/40",
    highlight: "bg-[#c4704a]/20 text-[#c4704a] border border-[#c4704a]/40",
    secondary: "bg-[#2a2a2a] text-[#F5F5DC]/80 border border-[#61471a]/30",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`} style={style}>
      {children}
    </span>
  );
}

export function TaxonDetails({ taxon }: { taxon: Taxon }) {
  const [speciesImage, setSpeciesImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const fetchSpeciesImage = async () => {
    setImageLoading(true);
    setImageError(false);
    try {
      const commonNames = taxon.common_names?.map((n) => n.name) || [];
      const imageUrl = await getFirstSpeciesImage(
        taxon.scientific_name,
        commonNames
      );
      setSpeciesImage(imageUrl);
    } catch (error) {
      console.error("Failed to fetch species image:", error);
      setImageError(true);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeciesImage();
  }, [taxon.scientific_name, taxon.common_names]);

  const handleRetry = () => {
    fetchSpeciesImage();
  };

  const mainCommon = (taxon.common_names || []).find((n) => n.main);
  const otherCommon = (taxon.common_names || [])
    .filter((n) => !n.main)
    .slice(0, 6);

  // Build taxonomy pairs per new structure
  const taxonomyPairs: Array<[string, string | undefined]> = [
    ["Kingdom", taxon.kingdom_name],
    ["Phylum", taxon.phylum_name],
    ["Class", taxon.class_name],
    ["Order", taxon.order_name],
    ["Family", taxon.family_name],
    ["Genus", taxon.genus_name],
    ["Species", taxon.species_name],
  ];

  // Map language codes to full names for display
  const formatLanguage = (language?: string) => {
    if (!language) return "";
    const value = language.trim();
    const lower = value.toLowerCase();
    const map: Record<string, string> = {
      eng: "English",
      en: "English",
      english: "English",
      fra: "French",
      fre: "French",
      fr: "French",
      french: "French",
      deu: "German",
      ger: "German",
      de: "German",
      german: "German",
      spa: "Spanish",
      es: "Spanish",
      spanish: "Spanish",
      por: "Portuguese",
      pt: "Portuguese",
      portuguese: "Portuguese",
      ita: "Italian",
      it: "Italian",
      italian: "Italian",
      nld: "Dutch",
      dut: "Dutch",
      nl: "Dutch",
      dutch: "Dutch",
      rus: "Russian",
      ru: "Russian",
      russian: "Russian",
      zho: "Chinese",
      chi: "Chinese",
      zh: "Chinese",
      chinese: "Chinese",
      ara: "Arabic",
      ar: "Arabic",
      arabic: "Arabic",
      hin: "Hindi",
      hi: "Hindi",
      hindi: "Hindi",
      jpn: "Japanese",
      ja: "Japanese",
      japanese: "Japanese",
      kor: "Korean",
      ko: "Korean",
      korean: "Korean",
      deu_ger: "German",
    };
    return map[lower] || value;
  };

  return (
    <div style={{ backgroundColor: "#033222" }}>
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Title */}
          <div className="space-y-4">
            {/* Image */}
            <div className="bg-gray-50 rounded-lg overflow-hidden mt-12">
              {imageLoading ? (
                <div className="w-full aspect-[4/3] flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Loading...</div>
                </div>
              ) : speciesImage ? (
                <img
                  src={speciesImage}
                  alt={taxon.scientific_name}
                  className="w-full aspect-[4/3] object-cover"
                  onError={() => setSpeciesImage(null)}
                />
              ) : imageError ? (
                <div className="w-full aspect-[4/3] flex flex-col items-center justify-center">
                  <div className="text-gray-500 text-sm mb-2">
                    Failed to load
                  </div>
                  <button
                    onClick={fetchSpeciesImage}
                    className="px-3 py-1 text-xs bg-gray-600 text-white rounded"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-[4/3] flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-sm">No image</div>
                </div>
              )}
            </div>

            {/* Scientific Name and Authority */}
            <div className="text-center font-inter">
              <h1 className="text-6xl font-light text-white mb-2 font-crimson">
                <em>{taxon.scientific_name}</em>
              </h1>
              {taxon.authority && (
                <div className="text-lg text-gray-200 mb-3 font-crimson">
                  {taxon.authority}
                </div>
              )}
              <div className="text-xl text-white font-medium font-crimson">
                {mainCommon ? `Common Name: ${mainCommon.name}` : ""}
              </div>
            </div>
          </div>

          {/* Right Column - Classification and Variations */}
          <div className="space-y-8 font-inter">
            {/* Taxonomic Classification */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-white mb-6 font-crimson">
                Taxonomic Classification
              </h2>

              <ul className="space-y-2">
                {taxonomyPairs
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <li key={label} className="flex text-lg">
                      <span className="w-2 h-2 bg-white rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-100">
                        <span className="font-medium text-white font-crimson">
                          {label}:
                        </span>{" "}
                        {value}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Regional Variations / Other Names */}
            {otherCommon.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-white mb-6 font-crimson">
                  Regional Variations
                </h3>
                <ul className="space-y-2">
                  {otherCommon.map((cn, idx) => (
                    <li key={idx} className="flex text-lg">
                      <span className="w-2 h-2 bg-white rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-100">
                        <span className="font-medium text-white font-crimson">
                          {cn.name}
                        </span>
                        {cn.language && (
                          <span className="text-gray-300">
                            {" "}
                            – {formatLanguage(cn.language)}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Subpopulation - integrated naturally */}
            {taxon.subpopulation_name && (
              <div className="mt-6">
                <h3 className="text-2xl font-light text-white mb-6 font-crimson">
                  Subpopulation
                </h3>
                <div className="flex text-lg">
                  <span className="w-2 h-2 bg-white rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-white font-medium">
                    {taxon.subpopulation_name}
                  </span>
                </div>
              </div>
            )}

            {/* Synonyms */}
            {taxon.synonyms && taxon.synonyms.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-light text-white mb-6 font-crimson">
                  Synonyms
                </h3>
                <ul className="space-y-2">
                  {taxon.synonyms.map((synonym, index) => (
                    <li key={index} className="flex text-lg">
                      <span className="w-2 h-2 bg-white rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-100 font-crimson">
                        <em>{synonym.name}</em>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
