import { useState, useTransition } from "react";
import { iucnClient } from "@/lib/iucnClient";
import { TaxonDetails, type Taxon } from "@/components/TaxonDetails";
import { Search, AlertCircle, Globe, Database } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        {/* Header Section - Magazine Style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-[#61471a] to-[#c4704a] rounded-full mb-8 backdrop-blur-sm shadow-2xl animate-scale-in">
            <Database className="w-10 h-10 text-[#F5F5DC]" />
          </div>

          {/* Main Title with Magazine Typography */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-6xl lg:text-7xl font-light text-[#F5F5DC] mb-4 leading-tight tracking-tight">
              Explore Species
              <br />
              <span className="font-normal text-[#c4704a]">
                Conservation Data
              </span>
            </h1>
          </div>

          {/* Subtitle with sophisticated styling */}
          <div
            className="max-w-4xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-xl text-[#F5F5DC]/80 leading-relaxed font-light tracking-wide">
              Search the IUCN Red List database to discover detailed information
              about species, their conservation status, and the threats they
              face in the wild.
            </p>
          </div>
        </div>

        {/* Search Form - Magazine Layout */}
        <div
          className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-3xl shadow-2xl border border-[#61471a]/30 overflow-hidden mb-16 animate-scale-in"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#61471a] via-[#c4704a] to-[#61471a] px-10 py-8 border-b border-[#c4704a]/20">
            <div className="flex items-center space-x-4">
              <Search className="w-8 h-8 text-[#F5F5DC]" />
              <div>
                <h3 className="text-2xl font-semibold text-[#F5F5DC] mb-2">
                  Scientific Name Search
                </h3>
                <p className="text-[#F5F5DC]/80 text-lg">
                  Enter the genus and species name to find conservation data
                </p>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={onSearch} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div
                className="space-y-3 animate-slide-in-left"
                style={{ animationDelay: "0.6s" }}
              >
                <label className="block text-lg font-medium text-[#F5F5DC]">
                  Genus <span className="text-[#c4704a] text-xl">*</span>
                </label>
                <input
                  className="w-full px-6 py-4 border-2 border-[#61471a]/40 rounded-2xl focus:ring-4 focus:ring-[#c4704a]/20 focus:border-[#c4704a] transition-all duration-300 bg-[#2a2a2a] text-[#F5F5DC] placeholder-[#F5F5DC]/50 text-lg font-light tracking-wide magazine-focus"
                  placeholder="e.g., Cervus"
                  value={genus}
                  onChange={(e) => setGenus(e.target.value)}
                  required
                />
              </div>
              <div
                className="space-y-3 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <label className="block text-lg font-medium text-[#F5F5DC]">
                  Species <span className="text-[#c4704a] text-xl">*</span>
                </label>
                <input
                  className="w-full px-6 py-4 border-2 border-[#61471a]/40 rounded-2xl focus:ring-4 focus:ring-[#c4704a]/20 focus:border-[#c4704a] transition-all duration-300 bg-[#2a2a2a] text-[#F5F5DC] placeholder-[#F5F5DC]/50 text-lg font-light tracking-wide magazine-focus"
                  placeholder="e.g., elaphus"
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  required
                />
              </div>
              <div
                className="space-y-3 animate-slide-in-right"
                style={{ animationDelay: "0.8s" }}
              >
                <label className="block text-lg font-medium text-[#F5F5DC]">
                  Subspecies
                  <span className="text-[#F5F5DC]/60 text-sm ml-2 font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  className="w-full px-6 py-4 border-2 border-[#61471a]/40 rounded-2xl focus:ring-4 focus:ring-[#c4704a]/20 focus:border-[#c4704a] transition-all duration-300 bg-[#2a2a2a] text-[#F5F5DC] placeholder-[#F5F5DC]/50 text-lg font-light tracking-wide magazine-focus"
                  placeholder="e.g., scoticus"
                  value={infra}
                  onChange={(e) => setInfra(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <div
              className="flex flex-col sm:flex-row gap-6 items-center justify-center animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              <button
                type="submit"
                className="group w-full sm:w-auto bg-gradient-to-r from-[#61471a] to-[#c4704a] hover:from-[#c4704a] hover:to-[#61471a] text-[#F5F5DC] font-semibold px-12 py-5 rounded-2xl transition-all duration-500 flex items-center justify-center min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-[#c4704a]/25 text-xl tracking-wide magazine-hover"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F5F5DC] mr-4"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Search Species
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {result && "error" in (result as any) && (
          <div className="max-w-2xl mx-auto bg-[#c4704a]/10 border-2 border-[#c4704a]/30 rounded-2xl p-8 animate-fade-in">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-[#c4704a] mr-4" />
              <div>
                <h3 className="text-[#c4704a] font-semibold text-xl">
                  Search Error
                </h3>
                <p className="text-[#F5F5DC]/80 text-lg mt-2">
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
