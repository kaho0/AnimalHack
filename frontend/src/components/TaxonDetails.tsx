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
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "secondary";
}) {
  const baseClasses =
    "inline-flex items-center rounded-full px-4 py-2 text-sm font-sans-medium border transition-all duration-200";

  const variants = {
    default:
      "bg-sand/80 text-forest border-sage/40 hover:bg-sand hover:border-sage/60",
    highlight:
      "bg-gold/20 text-forest border-gold/40 hover:bg-gold/30 hover:border-gold/60",
    secondary:
      "bg-sage/20 text-forest border-sage/30 hover:bg-sage/30 hover:border-sage/50",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`}>{children}</span>
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

  const taxonomy = [
    ["Kingdom", taxon.kingdom_name],
    ["Phylum", taxon.phylum_name],
    ["Class", taxon.class_name],
    ["Order", taxon.order_name],
    ["Family", taxon.family_name],
    ["Genus", taxon.genus_name],
    ["Species", taxon.species_name],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  const mainCommon = (taxon.common_names || []).find((n) => n.main);
  const otherCommon = (taxon.common_names || [])
    .filter((n) => !n.main)
    .slice(0, 8);

  return (
    <div className="card p-8 md:p-12 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12 pb-8 border-b-2 border-sage/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-headline text-forest mb-4">
              {taxon.scientific_name}
            </h2>
            {taxon.authority && (
              <p className="text-body text-forest/70 italic font-sans-medium">
                {taxon.authority}
              </p>
            )}
            {mainCommon && (
              <div className="mt-4 inline-block bg-gold/20 text-forest px-4 py-2 rounded-xl border border-gold/40">
                <span className="text-forest/70 font-sans-medium mr-2">
                  Common Name:
                </span>
                <span className="font-sans-bold text-lg">
                  {mainCommon.name}
                </span>
              </div>
            )}
          </div>

          {/* Species Image */}
          <div className="flex flex-col items-center gap-4">
            {imageLoading ? (
              <div className="w-48 h-48 bg-sage/20 rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage mb-2"></div>
                  <div className="text-sage/60 text-sm">Loading image...</div>
                </div>
              </div>
            ) : speciesImage ? (
              <div className="relative animate-image-load">
                <img
                  src={speciesImage}
                  alt={`${taxon.scientific_name}`}
                  className="w-48 h-48 object-cover rounded-xl border-2 border-sage/30 shadow-lg"
                  onError={() => setSpeciesImage(null)}
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-sage/90 text-white text-xs px-3 py-1 rounded-full">
                  Wikimedia Commons
                </div>
              </div>
            ) : imageError ? (
              <div className="w-48 h-48 bg-red-50 rounded-xl flex flex-col items-center justify-center border-2 border-red-200">
                <div className="text-red-400 text-center mb-3">
                  <div className="text-2xl mb-2">⚠️</div>
                  <div className="text-xs">Failed to load image</div>
                </div>
                <button
                  onClick={handleRetry}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="w-48 h-48 bg-sage/20 rounded-xl flex items-center justify-center border-2 border-dashed border-sage/30">
                <div className="text-sage/60 text-center">
                  <div className="text-2xl mb-2">🦌</div>
                  <div className="text-xs">No image available</div>
                </div>
              </div>
            )}

            {taxon.subpopulation_name && (
              <Badge variant="highlight">
                <span className="mr-2">📍</span>
                {taxon.subpopulation_name}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Taxonomy Section */}
      <div className="mb-12">
        <h3 className="text-subheadline text-forest mb-6">
          Taxonomic Classification
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {taxonomy.map(([rank, name]) => (
            <div
              key={rank}
              className="bg-sand/50 rounded-xl p-4 border border-sage/20"
            >
              <div className="text-caption text-forest/60 mb-1 uppercase tracking-wider">
                {rank}
              </div>
              <div className="font-sans-semibold text-forest">{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Names Section */}
      {otherCommon.length > 0 && (
        <div className="mb-12">
          <h3 className="text-subheadline text-forest mb-6">
            Other Common Names
          </h3>
          <div className="flex flex-wrap gap-3">
            {otherCommon.map((name, index) => (
              <Badge key={index} variant="secondary">
                <span className="mr-2">🌍</span>
                {name.name}
                <span className="ml-2 text-xs opacity-70">
                  ({name.language})
                </span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Synonyms Section */}
      {taxon.synonyms && taxon.synonyms.length > 0 && (
        <div className="mb-12">
          <h3 className="text-subheadline text-forest mb-6">Synonyms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taxon.synonyms.slice(0, 10).map((synonym, index) => (
              <div
                key={index}
                className="bg-cream rounded-xl p-4 border border-sage/20"
              >
                <div className="font-sans-semibold text-forest mb-1">
                  {synonym.name}
                </div>
                {synonym.status && (
                  <div className="text-caption text-forest/60">
                    Status: {synonym.status}
                  </div>
                )}
              </div>
            ))}
          </div>
          {taxon.synonyms.length > 10 && (
            <p className="text-caption text-forest/60 mt-4 text-center">
              Showing 10 of {taxon.synonyms.length} synonyms
            </p>
          )}
        </div>
      )}

      {/* SSC Groups Section */}
      {taxon.ssc_groups && taxon.ssc_groups.length > 0 && (
        <div className="mb-12">
          <h3 className="text-subheadline text-forest mb-6">SSC Groups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taxon.ssc_groups.map((group, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-sage/10 to-sage/5 rounded-xl p-6 border border-sage/20"
              >
                <h4 className="font-sans-semibold text-forest mb-2">
                  {group.name}
                </h4>
                {group.description && (
                  <p className="text-body-small text-forest/70 mb-3">
                    {group.description}
                  </p>
                )}
                {group.url && (
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gold hover:text-gold/80 transition-colors duration-200 font-sans-medium"
                  >
                    Learn More
                    <span className="ml-1">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-8 border-t-2 border-sage/20">
        <p className="text-caption text-forest/60">
          Data sourced from IUCN Red List of Threatened Species
        </p>
      </div>
    </div>
  );
}
