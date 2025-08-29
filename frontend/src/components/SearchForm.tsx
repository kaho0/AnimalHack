import { useState, useTransition } from "react";
import { iucnClient } from "@/lib/iucnClient";
import { TaxonDetails, type Taxon } from "@/components/TaxonDetails";
import { Search, AlertCircle } from "lucide-react";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-[#166D3B]/20 rounded-full mb-6 backdrop-blur-sm">
          <Search className="w-8 h-8 text-[#166D3B]" />
        </div>
        <h2 className="text-4xl font-bold text-[#166D3B] mb-4">
          {SEARCH_CONTENT.title}
        </h2>
        <p className="text-xl text-[#7B1E28] max-w-3xl mx-auto leading-relaxed">
          {SEARCH_CONTENT.subtitle}
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-[#F8F4E3] rounded-3xl shadow-2xl border border-[#C4A95B]/30 overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-[#166D3B] to-[#98AE87] px-8 py-6 border-b border-[#C4A95B]/20">
          <h3 className="text-lg font-semibold text-[#F8F4E3] mb-2">
            {SEARCH_CONTENT.formTitle}
          </h3>
          <p className="text-sm text-[#C4A95B]">
            {SEARCH_CONTENT.formSubtitle}
          </p>
        </div>

        <form onSubmit={onSearch} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#166D3B]">
                {SEARCH_CONTENT.labels.genus}{" "}
                <span className="text-[#7B1E28]">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border border-[#C4A95B]/40 rounded-xl focus:ring-2 focus:ring-[#7B1E28] focus:border-[#7B1E28] transition-colors bg-white/80 focus:bg-white text-[#166D3B] placeholder-[#7B1E28]"
                placeholder={SEARCH_CONTENT.placeholders.genus}
                value={genus}
                onChange={(e) => setGenus(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#166D3B]">
                {SEARCH_CONTENT.labels.species}{" "}
                <span className="text-[#7B1E28]">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border border-[#C4A95B]/40 rounded-xl focus:ring-2 focus:ring-[#7B1E28] focus:border-[#7B1E28] transition-colors bg-white/80 focus:bg-white text-[#166D3B] placeholder-[#7B1E28]"
                placeholder={SEARCH_CONTENT.placeholders.species}
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#166D3B]">
                {SEARCH_CONTENT.labels.subspecies}
                <span className="text-[#7B1E28] text-xs ml-1">(optional)</span>
              </label>
              <input
                className="w-full px-4 py-3 border border-[#C4A95B]/40 rounded-xl focus:ring-2 focus:ring-[#7B1E28] focus:border-[#7B1E28] transition-colors bg-white/80 focus:bg-white text-[#166D3B] placeholder-[#7B1E28]"
                placeholder={SEARCH_CONTENT.placeholders.subspecies}
                value={infra}
                onChange={(e) => setInfra(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#166D3B] hover:bg-[#98AE87] text-[#F8F4E3] font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#F8F4E3] mr-3"></div>
                  {SEARCH_CONTENT.buttons.searching}
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  {SEARCH_CONTENT.buttons.search}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && !("error" in (result as any)) && (
        <div className="animate-fade-in">
          <TaxonDetails taxon={(result as TaxaResponse).taxon} />
        </div>
      )}

      {result && "error" in (result as any) && (
        <div className="max-w-2xl mx-auto bg-[#7B1E28]/10 border border-[#7B1E28]/20 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-[#7B1E28] mr-3" />
            <div>
              <h3 className="text-[#7B1E28] font-semibold">
                {SEARCH_CONTENT.error.title}
              </h3>
              <p className="text-[#7B1E28]/80 text-sm mt-1">
                {(result as any).error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
