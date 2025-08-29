import { useState, useTransition } from "react";
import { iucnClient } from "@/lib/iucnClient";
import { TaxonDetails, type Taxon } from "@/components/TaxonDetails";
import {
  Search,
  AlertCircle,
  Leaf,
  ChevronRight,
  BookOpen,
  Globe2,
} from "lucide-react";
import { SEARCH_CONTENT } from "@/constants/content";

type TaxaResponse = {
  taxon: Taxon;
};

type SearchResult = TaxaResponse | { error: string } | null;

export default function SearchForm() {
  const [genus, setGenus] = useState("Cervus");
  const [species, setSpecies] = useState("elaphus");
  const [infra, setInfra] = useState("");
  const [result, setResult] = useState<SearchResult>(null);
  const [isPending, startTransition] = useTransition();

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = await iucnClient.getTaxaByScientificName(
          genus,
          species,
          infra || undefined
        );
        setResult(data as unknown as TaxaResponse);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setResult({ error: message });
      }
    });
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="mb-6 animate-fade-in">
            <h1
              className="font-serif text-6xl lg:text-7xl font-light mb-4 leading-tight tracking-tight -mt-12"
              style={{ color: "#0F3D2E" }}
            >
              Explore the World's
              <br />
              <em style={{ color: "#C4704A" }}>Living Heritage</em>
            </h1>
          </div>

          <div
            className="max-w-4xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <p
              className="font-lato font-thin text-2xl leading-relaxed tracking-wide mb-8"
              style={{ color: "#6E7B74" }}
            >
              Access comprehensive conservation data from the IUCN Red List, the
              world's most authoritative source of information on the global
              conservation status of animal and plant species across our planet.
            </p>
            <div
              className="flex items-center justify-center space-x-8 text-sm"
              style={{ color: "#6E7B74" }}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Peer-Reviewed Data</span>
              </div>
              <div
                className="w-px h-4"
                style={{ backgroundColor: "#C8B6A6" }}
              ></div>
              <span>Updated Weekly</span>
              <div
                className="w-px h-4"
                style={{ backgroundColor: "#C8B6A6" }}
              ></div>
              <span>Global Coverage</span>
            </div>
          </div>
        </div>

        {/* Search Form - Magazine Layout */}
        <div
          className="relative mb-16 animate-scale-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div
            className="absolute inset-0 rounded-3xl transform rotate-1"
            style={{ backgroundColor: "#A8C686", opacity: "0.1" }}
          ></div>
          <div
            className="relative rounded-3xl shadow-2xl border overflow-hidden"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#C8B6A6" }}
          >
            <div className="px-12 py-10 text-center">
              <h3
                className="font-serif text-3xl font-light mb-3"
                style={{ color: "#0F3D2E" }}
              >
                Begin Your Discovery
              </h3>
              <p
                className="font-serif text-xl font-light leading-relaxed"
                style={{ color: "#6E7B74" }}
              >
                Enter a scientific name to explore conservation insights
              </p>
            </div>

            <form onSubmit={onSearch} className="px-12 pb-12">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span
                      className="font-serif text-lg"
                      style={{ color: "#2F3E34" }}
                    >
                      Genus
                    </span>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: "#C4704A", color: "#FFFFFF" }}
                    >
                      required
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-0 py-4 border-0 border-b-2 transition-all duration-300 font-serif text-xl bg-transparent focus:outline-none placeholder-opacity-50"
                    style={{ borderColor: "#C8B6A6", color: "#2F3E34" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C4704A";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#C8B6A6";
                    }}
                    placeholder="Cervus"
                    value={genus}
                    onChange={(e) => setGenus(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span
                      className="font-serif text-lg"
                      style={{ color: "#2F3E34" }}
                    >
                      Species
                    </span>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: "#C4704A", color: "#FFFFFF" }}
                    >
                      required
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-0 py-4 border-0 border-b-2 transition-all duration-300 font-serif text-xl bg-transparent focus:outline-none placeholder-opacity-50"
                    style={{ borderColor: "#C8B6A6", color: "#2F3E34" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C4704A";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#C8B6A6";
                    }}
                    placeholder="elaphus"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span
                      className="font-serif text-lg"
                      style={{ color: "#2F3E34" }}
                    >
                      Subspecies
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: "#A8C686", color: "#0F3D2E" }}
                    >
                      optional
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-0 py-4 border-0 border-b-2 transition-all duration-300 font-serif text-xl bg-transparent focus:outline-none placeholder-opacity-50"
                    style={{ borderColor: "#C8B6A6", color: "#2F3E34" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C4704A";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#C8B6A6";
                    }}
                    placeholder="scoticus"
                    value={infra}
                    onChange={(e) => setInfra(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group inline-flex items-center px-12 py-5 rounded-full font-serif text-xl transition-all duration-500 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                  style={{ backgroundColor: "#0F3D2E", color: "#F5F5DC" }}
                  onMouseEnter={(e) => {
                    if (!isPending) {
                      e.currentTarget.style.backgroundColor = "#033222";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0F3D2E";
                  }}
                >
                  {isPending ? (
                    <>
                      <div
                        className="animate-spin rounded-full h-5 w-5 border-b-2 mr-3"
                        style={{ borderColor: "#F5F5DC" }}
                      ></div>
                      <span>Exploring...</span>
                    </>
                  ) : (
                    <>
                      <span>Discover Species</span>
                      <div className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {result && "error" in (result as any) && (
          <div
            className="mt-8 rounded-xl border-2 p-8"
            style={{ backgroundColor: "#FDF2F2", borderColor: "#EF6C00" }}
          >
            <div className="flex items-start">
              <AlertCircle
                className="w-6 h-6 mt-1 mr-4 flex-shrink-0"
                style={{ color: "#EF6C00" }}
              />
              <div>
                <h3
                  className="font-semibold text-xl"
                  style={{ color: "#C62828" }}
                >
                  Search Error
                </h3>
                <p
                  className="font-serif mt-2 text-lg"
                  style={{ color: "#2F3E34" }}
                >
                  {(result as any).error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-width results so background spans edge-to-edge */}
      {result && !("error" in (result as any)) && (
        <div className="animate-fade-in">
          <TaxonDetails taxon={(result as TaxaResponse).taxon} />
        </div>
      )}
    </>
  );
}
