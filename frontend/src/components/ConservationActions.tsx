"use client";

import { useState, useEffect } from "react";
import { iucnClient, type ConservationAction } from "@/lib/iucnClient";
import {
  Leaf,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function ConservationActions() {
  const [actions, setActions] = useState<ConservationAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadConservationActions();
  }, []);

  const loadConservationActions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await iucnClient.getConservationActions();
      // Handle the IUCN API response structure
      if (data && typeof data === "object" && "conservation_actions" in data) {
        setActions(data.conservation_actions);
      } else if (Array.isArray(data)) {
        setActions(data as ConservationAction[]);
      } else {
        setActions([]);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load conservation actions"
      );
    } finally {
      setLoading(false);
    }
  };

  const displayedActions = showAll ? actions : actions.slice(0, 6);
  const hasMoreActions = actions.length > 6;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-sage/20 border-t-gold mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold/40 animate-ping"></div>
          </div>
          <p className="text-forest/60 text-xl font-medium">
            Loading conservation actions...
          </p>
          <p className="text-forest/40 mt-2">
            Gathering data from IUCN database
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
            <h3 className="text-xl font-bold text-wine">Error Loading Data</h3>
            <p className="text-wine/70 text-sm">
              Unable to fetch conservation actions
            </p>
          </div>
        </div>
        <p className="text-wine/80 mb-6 leading-relaxed">{error}</p>
        <button
          onClick={loadConservationActions}
          className="w-full sm:w-auto px-8 py-4 bg-wine text-sand rounded-xl hover:bg-wine/80 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-moss/20 to-sage/20 rounded-full mb-6">
          <Leaf className="w-10 h-10 text-moss" />
        </div>
        <h2 className="heading text-4xl md:text-5xl text-forest mb-6">
          Conservation Actions
        </h2>
        <p className="text-xl text-forest/70 max-w-3xl mx-auto leading-relaxed mb-8">
          Discover the comprehensive strategies and measures available for
          protecting species and their habitats worldwide.
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center text-forest/60">
            <Shield className="w-5 h-5 mr-2 text-moss" />
            <span className="text-sm font-medium">
              {actions.length} Actions Available
            </span>
          </div>
          <div className="w-px h-6 bg-sage/30"></div>
          <div className="flex items-center text-forest/60">
            <TrendingUp className="w-5 h-5 mr-2 text-sage" />
            <span className="text-sm font-medium">IUCN Standards</span>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      {actions.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-12 h-12 text-sage" />
          </div>
          <h3 className="text-2xl font-semibold text-forest/60 mb-3">
            No conservation actions found
          </h3>
          <p className="text-forest/40 mb-6">
            The database appears to be empty
          </p>
          <button
            onClick={loadConservationActions}
            className="px-6 py-3 bg-sage/20 text-forest hover:bg-sage/30 transition-all duration-200 font-medium rounded-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh Data
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedActions.map((action) => (
              <div
                key={action.code}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-sage/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-sage/40"
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-moss/10 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gold/10 to-transparent rounded-full translate-y-10 -translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-moss/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-moss" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-moss/20 rounded-full flex items-center justify-center">
                        <span className="text-moss text-lg">→</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-forest leading-relaxed mb-4 group-hover:text-moss transition-colors duration-200">
                    {action.description.en}
                  </h3>

                  <div className="flex items-center text-sm text-forest/50">
                    <span className="w-2 h-2 bg-moss rounded-full mr-2"></span>
                    Conservation Strategy
                  </div>

                  {action.code && (
                    <div className="mt-4 pt-4 border-t border-sage/20">
                      <span className="text-xs font-mono text-forest/40 bg-sage/20 px-2 py-1 rounded">
                        Code: {action.code}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMoreActions && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-10 py-4 bg-gradient-to-r from-sage/20 to-sage/30 text-forest hover:from-sage/30 hover:to-sage/40 transition-all duration-300 font-semibold rounded-xl flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-sage/30 hover:border-sage/50"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Show All {actions.length} Actions
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Footer Stats */}
      {actions.length > 0 && (
        <div className="mt-16 pt-8 border-t-2 border-sage/20">
          <div className="flex items-center justify-center text-sm text-forest/50">
            <span className="w-2 h-2 bg-sage rounded-full mr-2"></span>
            Displaying {displayedActions.length} of {actions.length}{" "}
            conservation actions
            <span className="w-2 h-2 bg-sage rounded-full ml-2"></span>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-12">
        <button
          onClick={loadConservationActions}
          className="px-8 py-4 bg-moss text-sand rounded-xl hover:bg-moss/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Refresh Data
        </button>
      </div>
    </div>
  );
}
