"use client";

import { useState, useEffect } from "react";
import {
  iucnClient,
  type UseAndTrade as UseAndTradeType,
} from "@/lib/iucnClient";
import {
  ShoppingBag,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Activity,
  Globe,
} from "lucide-react";

export default function UseAndTrade() {
  const [useAndTradeItems, setUseAndTradeItems] = useState<UseAndTradeType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadUseAndTrade();
  }, []);

  const loadUseAndTrade = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await iucnClient.getUseAndTrade();
      // Handle the IUCN API response structure
      if (data && typeof data === "object" && "use_and_trade" in data) {
        setUseAndTradeItems(data.use_and_trade);
      } else if (Array.isArray(data)) {
        setUseAndTradeItems(data as UseAndTradeType[]);
      } else {
        setUseAndTradeItems([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load use and trade data"
      );
    } finally {
      setLoading(false);
    }
  };

  const displayedItems = showAll
    ? useAndTradeItems
    : useAndTradeItems.slice(0, 6);
  const hasMoreItems = useAndTradeItems.length > 6;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-clay/20 border-t-gold mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold/40 animate-ping"></div>
          </div>
          <p className="text-body-large text-forest/60 font-sans-medium">
            Loading use and trade data...
          </p>
          <p className="text-body text-forest/40 mt-2">
            Analyzing human interaction patterns
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-wine/5 to-wine/10 border-2 border-wine/20 rounded-3xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-wine/20 rounded-full flex items-center justify-center mr-4">
            <AlertCircle className="w-6 h-6 text-wine" />
          </div>
          <div>
            <h3 className="text-subheadline text-wine font-sans-bold">
              Error Loading Data
            </h3>
            <p className="text-caption text-wine/70">
              Unable to fetch use and trade data
            </p>
          </div>
        </div>
        <p className="text-body text-wine/80 mb-6 leading-relaxed">{error}</p>
        <button
          onClick={loadUseAndTrade}
          className="btn-primary w-full sm:w-auto px-8 py-4"
        >
          <RefreshCw className="w-5 h-5 mr-2 inline" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center mb-16">
      {/* Header Section */}
      <div className="mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-clay/20 to-gold/20 rounded-2xl flex items-center justify-center mr-4">
            <ShoppingBag className="w-8 h-8 text-clay" />
          </div>
          <h2 className="text-headline text-forest">Use and Trade</h2>
        </div>
        <p className="text-body-large text-forest/70 max-w-3xl mx-auto leading-relaxed">
          Explore how human activities and commercial practices impact species
          worldwide, from traditional uses to modern trade patterns.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="text-4xl font-display-bold text-forest mb-2">
            {useAndTradeItems.length}
          </div>
          <div className="text-caption text-forest/60 uppercase tracking-wider">
            Categories
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-display-bold text-clay mb-2">
            {
              useAndTradeItems.filter((item) => item.code?.startsWith("1"))
                .length
            }
          </div>
          <div className="text-caption text-forest/60 uppercase tracking-wider">
            Food Related
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-display-bold text-gold mb-2">
            {
              useAndTradeItems.filter((item) => item.code?.startsWith("3"))
                .length
            }
          </div>
          <div className="text-caption text-forest/60 uppercase tracking-wider">
            Medical Uses
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {displayedItems.map((item, index) => (
          <div
            key={item.code || index}
            className="group relative overflow-hidden rounded-2xl border-2 border-clay/20 bg-gradient-to-br from-cream to-sand/30 p-6 hover:border-clay/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-clay/10 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gold/10 to-transparent rounded-full translate-y-10 -translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-sans-semibold text-forest leading-relaxed mb-3 group-hover:text-clay transition-colors duration-200">
                    {item.description.en}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-forest/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-forest" />
                  </div>
                  <span className="text-caption text-forest/60 font-sans-medium">
                    Human Activity Classification
                  </span>
                </div>
                {item.code && (
                  <div className="text-caption text-forest/40 font-mono bg-sand/50 px-2 py-1 rounded-lg">
                    Code: {item.code}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Toggle */}
      {hasMoreItems && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-sand border-2 border-clay/50 text-forest hover:bg-clay/20 transition-all duration-200 font-sans-medium rounded-xl hover:border-clay/70"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-5 h-5 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5 mr-2" />
                Show All {useAndTradeItems.length} Categories
              </>
            )}
          </button>
        </div>
      )}

      {/* Info Text */}
      <div className="mt-12 text-center">
        <p className="text-caption text-forest/60">
          Displaying {displayedItems.length} of {useAndTradeItems.length} use
          and trade categories
        </p>
      </div>
    </div>
  );
}
