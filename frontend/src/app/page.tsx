"use client";

import Image from "next/image";
import { iucnClient } from "@/lib/iucnClient";
import { useState, useTransition } from "react";
import { TaxonDetails, type Taxon } from "@/components/TaxonDetails";
import ConservationActions from "@/components/ConservationActions";
import UseAndTrade from "@/components/UseAndTrade";

type TaxaResponse = {
  taxon: Taxon;
};

type SearchResult = TaxaResponse | { error: string } | null;

function SearchForm() {
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

  function loadMock() {
    try {
      const raw =
        (document.getElementById("mock-json") as HTMLTextAreaElement | null)
          ?.value || "";
      const parsed = JSON.parse(raw);
      setResult(parsed as TaxaResponse);
    } catch (e) {
      setResult({ error: "Invalid JSON" });
    }
  }

  return (
    <div className="container-prose my-16">
      <div className="text-center mb-12">
        <h2 className="text-headline text-forest mb-6">Explore Species</h2>
        <p className="text-body-large text-forest/70 max-w-2xl mx-auto leading-relaxed">
          Search by scientific name through the IUCN database to discover
          detailed information about species and their conservation status.
        </p>
      </div>

      <form onSubmit={onSearch} className="card p-8 md:p-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-label text-forest/80 mb-2">
              Genus
            </label>
            <input
              className="input-field"
              placeholder="e.g., Cervus"
              value={genus}
              onChange={(e) => setGenus(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-label text-forest/80 mb-2">
              Species
            </label>
            <input
              className="input-field"
              placeholder="e.g., elaphus"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-label text-forest/80 mb-2">
              Subspecies (optional)
            </label>
            <input
              className="input-field"
              placeholder="e.g., scoticus"
              value={infra}
              onChange={(e) => setInfra(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center">
          <button
            className="btn-primary px-8 py-4 text-lg"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sand mr-3"></div>
                Searching...
              </div>
            ) : (
              "Search Species"
            )}
          </button>
          <button
            type="button"
            onClick={loadMock}
            className="btn-secondary px-6 py-4 text-base"
          >
            Load JSON Sample
          </button>
        </div>

        <details className="mt-8 group">
          <summary className="cursor-pointer text-caption text-forest/70 hover:text-forest transition-colors duration-200 font-sans-medium flex items-center justify-center">
            <span className="mr-2">📋</span>
            Paste JSON Sample Data (for testing)
            <span className="ml-2 transform group-open:rotate-180 transition-transform duration-200">
              ▼
            </span>
          </summary>
          <textarea
            id="mock-json"
            className="mt-4 w-full h-48 rounded-xl border-2 border-sage/30 p-4 bg-cream text-sm font-mono text-forest placeholder-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all duration-200 resize-none"
            placeholder="Paste the IUCN JSON here to preview the UI..."
          />
        </details>
      </form>

      {result && !("error" in (result as any)) && (
        <div className="mt-16">
          <TaxonDetails taxon={(result as TaxaResponse).taxon} />
        </div>
      )}

      {result && "error" in (result as any) && (
        <div className="mt-8 max-w-2xl mx-auto bg-red-50 text-red-700 border-2 border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="font-sans-medium">{(result as any).error}</p>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="h-[500px] md:h-[600px] bg-gradient-to-br from-forest via-moss to-forest text-sand flex items-center relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gold/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-sage/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-clay/20 rounded-full"></div>
          </div>

          <div className="container-prose relative z-10">
            <h1 className="text-hero text-sand leading-tight mb-8 animate-text-reveal">
              Discover the World's
              <span className="block text-gold font-display-black">
                Wildlife Heritage
              </span>
            </h1>
            <p className="text-body-large max-w-3xl text-sand/90 leading-relaxed mb-10 animate-slide-up">
              Explore species, understand their conservation status, and learn
              about the actions needed to protect our planet's biodiversity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#explore"
                className="inline-block bg-gold text-forest font-sans-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Start Exploring
              </a>
              <a
                href="#about"
                className="inline-block px-8 py-4 rounded-xl border-2 border-sand/50 text-sand hover:bg-sand/10 transition-all duration-300 font-sans-medium text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Feature Card */}
        <div className="container-prose -mt-16 relative z-20">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-cream to-sand/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-subheadline text-forest mb-6">
                  Your Gateway to Conservation
                </h3>
                <p className="text-body text-forest/80 leading-relaxed mb-8">
                  Access comprehensive data from the IUCN Red List, explore
                  conservation actions, and understand how human activities
                  impact species worldwide. Our platform provides the tools you
                  need to make informed decisions about wildlife protection.
                </p>
                <a id="explore" className="btn-primary inline-block">
                  Explore Species Database
                </a>
              </div>
              <div className="justify-self-center">
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                  alt="Serene forest path leading to discovery"
                  width={520}
                  height={360}
                  className="rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section
        id="search"
        className="py-20 bg-gradient-to-b from-sand/30 to-cream"
      >
        <SearchForm />
      </section>

      {/* Conservation Actions Section */}
      <section
        id="conservation"
        className="py-20 bg-gradient-to-b from-cream to-sand/30"
      >
        <div className="container-prose">
          <ConservationActions />
        </div>
      </section>

      {/* Use and Trade Section */}
      <section
        id="trade"
        className="py-20 bg-gradient-to-b from-sand/30 to-cream"
      >
        <div className="container-prose">
          <UseAndTrade />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-forest text-sand py-16">
        <div className="container-prose">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-clay rounded-lg flex items-center justify-center">
                  <span className="text-forest text-lg font-sans-bold">🌿</span>
                </div>
                <span className="text-2xl font-sans-bold">AnimalHack</span>
              </div>
              <p className="text-body-small text-sand/80 leading-relaxed mb-6">
                Your gateway to wildlife conservation data. Explore species,
                understand their status, and discover actions needed to protect
                our planet's biodiversity.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-sand/10 rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors duration-200"
                >
                  <span className="text-sand">🌐</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-sand/10 rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors duration-200"
                >
                  <span className="text-sand">📧</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-sand/10 rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors duration-200"
                >
                  <span className="text-sand">📱</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-sans-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#search"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    Search Species
                  </a>
                </li>
                <li>
                  <a
                    href="#conservation"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    Conservation Actions
                  </a>
                </li>
                <li>
                  <a
                    href="#trade"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    Use & Trade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    About IUCN
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-sans-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    Data Sources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    Conservation Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sand/80 hover:text-gold transition-colors duration-200 font-sans-medium"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sand/20 mt-12 pt-8 text-center">
            <p className="text-sand/60 text-sm font-sans-medium">
              © 2024 AnimalHack. Built with ❤️ for wildlife conservation. Data
              sourced from IUCN Red List.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
