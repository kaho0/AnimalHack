import React from "react";

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
    "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200";

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
            <h2 className="heading text-3xl md:text-4xl text-forest mb-4">
              {taxon.scientific_name}
            </h2>
            {taxon.authority && (
              <p className="text-lg text-forest/70 italic">{taxon.authority}</p>
            )}
            {mainCommon && (
              <div className="mt-4 inline-block bg-gold/20 text-forest px-4 py-2 rounded-xl border border-gold/40">
                <span className="text-forest/70 font-medium mr-2">
                  Common Name:
                </span>
                <span className="font-semibold text-lg">{mainCommon.name}</span>
              </div>
            )}
          </div>
          {taxon.subpopulation_name && (
            <Badge variant="highlight">
              <span className="mr-2">📍</span>
              Subpopulation: {taxon.subpopulation_name}
            </Badge>
          )}
        </div>
      </div>

      {/* Taxonomy Section */}
      {taxonomy.length > 0 && (
        <div className="mb-10">
          <h3 className="heading text-2xl mb-6 text-forest flex items-center">
            <span className="mr-3">🔄</span>
            Taxonomic Classification
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {taxonomy.map(([label, value]) => (
              <div
                key={label}
                className="bg-sand/60 rounded-xl p-4 border border-sage/30 hover:border-sage/50 transition-colors duration-200"
              >
                <div className="text-xs font-medium text-forest/60 uppercase tracking-wide mb-1">
                  {label}
                </div>
                <div className="font-semibold text-forest">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Names Section */}
      {otherCommon.length > 0 && (
        <div className="mb-10">
          <h3 className="heading text-2xl mb-6 text-forest flex items-center">
            <span className="mr-3">🌍</span>
            Common Names
          </h3>
          <div className="flex flex-wrap gap-3">
            {otherCommon.map((n, idx) => (
              <Badge key={`${n.name}-${idx}`} variant="secondary">
                <span className="mr-2">💬</span>
                {n.name}{" "}
                <span className="text-xs opacity-70">({n.language})</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* SSC Groups Section */}
      {taxon.ssc_groups && taxon.ssc_groups.length > 0 && (
        <div className="mb-10">
          <h3 className="heading text-2xl mb-6 text-forest flex items-center">
            <span className="mr-3">🛡️</span>
            Specialist Groups
          </h3>
          <div className="grid gap-4">
            {taxon.ssc_groups.map((g, idx) => (
              <div
                key={`${g.name}-${idx}`}
                className="group relative overflow-hidden rounded-xl border-2 border-sage/30 bg-gradient-to-r from-sand/60 to-sand/40 p-6 hover:border-sage/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-forest leading-relaxed mb-3 group-hover:text-moss transition-colors duration-200">
                      {g.url ? (
                        <a
                          href={g.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-gold/70 underline-offset-4 hover:decoration-gold transition-all duration-200"
                        >
                          {g.name}
                          <span className="ml-2 text-gold">↗</span>
                        </a>
                      ) : (
                        g.name
                      )}
                    </h4>
                    {g.description && (
                      <p className="text-forest/80 leading-relaxed">
                        {g.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 bg-moss/10 rounded-full flex items-center justify-center">
                      <span className="text-moss text-lg">→</span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sage/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gold/10 to-transparent rounded-full translate-y-10 -translate-x-10"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Synonyms Section */}
      {taxon.synonyms && taxon.synonyms.length > 0 && (
        <div className="mb-6">
          <details className="group">
            <summary className="heading text-2xl cursor-pointer select-none text-forest hover:text-moss transition-colors duration-200 flex items-center">
              <span className="mr-3">📚</span>
              Synonyms
              <span className="ml-3 text-lg font-normal text-forest/60 group-open:hidden">
                ({taxon.synonyms.length})
              </span>
              <span className="ml-3 transform group-open:rotate-180 transition-transform duration-200 text-forest/60">
                ▼
              </span>
            </summary>
            <div className="mt-6 pt-6 border-t border-sage/20">
              <div className="grid md:grid-cols-2 gap-3">
                {taxon.synonyms.slice(0, 10).map((s, idx) => (
                  <div
                    key={`${s.name}-${idx}`}
                    className="bg-sand/60 rounded-lg px-4 py-3 border border-sage/30 hover:border-sage/50 transition-colors duration-200"
                  >
                    <div className="font-medium text-forest">{s.name}</div>
                    {s.status && (
                      <div className="text-sm text-forest/60 mt-1">
                        Status: <span className="italic">{s.status}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {taxon.synonyms.length > 10 && (
                <div className="mt-4 text-center text-sm text-forest/60">
                  Showing first 10 of {taxon.synonyms.length} synonyms
                </div>
              )}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
