"use client";

import { useState, useEffect } from "react";
import { iucnClient, type ConservationAction } from "@/lib/iucnClient";
import { Leaf, RefreshCw, AlertCircle, Shield } from "lucide-react";

export default function ConservationActions() {
  const [actions, setActions] = useState<ConservationAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#98AE87]/20 border-t-[#C4A95B] mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C4A95B]/40 animate-ping"></div>
          </div>
          <p className="text-xl text-[#166D3B]/80 font-medium">
            Loading conservation actions...
          </p>
          <p className="text-base text-[#166D3B]/60 mt-2">
            Gathering data from IUCN database
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[#7B1E28]/5 to-[#7B1E28]/10 border-2 border-[#7B1E28]/20 rounded-3xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#7B1E28]/20 rounded-full flex items-center justify-center mr-4">
            <AlertCircle className="w-6 h-6 text-[#7B1E28]" />
          </div>
          <div>
            <h3 className="text-xl text-[#7B1E28] font-bold">
              Error Loading Data
            </h3>
            <p className="text-sm text-[#7B1E28]/70">
              Unable to fetch conservation actions
            </p>
          </div>
        </div>
        <p className="text-base text-[#7B1E28]/80 mb-6 leading-relaxed">
          {error}
        </p>
        <button
          onClick={loadConservationActions}
          className="bg-[#7B1E28] hover:bg-[#7B1E28]/80 text-[#F8F4E3] px-8 py-4 rounded-xl transition-colors duration-200 font-medium"
        >
          <RefreshCw className="w-5 h-5 mr-2 inline" />
          Try Again
        </button>
      </div>
    );
  }

  // Calculate stats
  const totalActions = actions.length;
  const protectionActions = actions.filter((a) =>
    a.code?.startsWith("1")
  ).length;
  const managementActions = actions.filter((a) =>
    a.code?.startsWith("2")
  ).length;

  return (
    <div className="text-center mb-16">
      {/* Header Section */}
      <div className="mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#166D3B]/20 to-[#98AE87]/20 rounded-2xl flex items-center justify-center mr-4">
            <Shield className="w-8 h-8 text-[#166D3B]" />
          </div>
          <h2 className="text-4xl font-bold text-[#166D3B]">
            Conservation Actions
          </h2>
        </div>
        <p className="text-xl text-[#166D3B]/70 max-w-3xl mx-auto leading-relaxed">
          Discover the comprehensive strategies and measures available for
          protecting species and their habitats worldwide.
        </p>
      </div>

      {/* Stats Section - Keep at the top as requested */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#166D3B] mb-2">
            {totalActions}
          </div>
          <div className="text-sm text-[#166D3B]/60 uppercase tracking-wider font-medium">
            Actions Available
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#C4A95B] mb-2">
            {protectionActions}
          </div>
          <div className="text-sm text-[#166D3B]/60 uppercase tracking-wider font-medium">
            Protection Actions
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#98AE87] mb-2">
            {managementActions}
          </div>
          <div className="text-sm text-[#166D3B]/60 uppercase tracking-wider font-medium">
            Management Actions
          </div>
        </div>
      </div>

      {/* Actions Grid - Clean cards without codes or numbering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <div
            key={action.code || index}
            className="group relative overflow-hidden rounded-2xl border-2 border-[#98AE87]/20 bg-gradient-to-br from-[#F8F4E3] to-[#F8F4E3]/80 p-6 hover:border-[#98AE87]/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#98AE87]/10 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#C4A95B]/10 to-transparent rounded-full translate-y-10 -translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>

            <div className="relative z-10">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#3D3D3D] leading-relaxed mb-3 group-hover:text-[#166D3B] transition-colors duration-200">
                  {action.description.en}
                </h3>
                {/* Keep subtitle if it exists and is different from title */}
                {action.description.en &&
                  action.description.en.length > 100 && (
                    <p className="text-sm text-[#3D3D3D]/70 leading-relaxed mb-4">
                      {action.description.en.length > 150
                        ? `${action.description.en.substring(0, 150)}...`
                        : action.description.en}
                    </p>
                  )}
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#166D3B]/10 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-[#166D3B]" />
                  </div>
                  <span className="text-sm text-[#166D3B]/70 font-medium">
                    Conservation Strategy
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[#166D3B]/60">
          Displaying all {actions.length} conservation actions
        </p>
      </div>
    </div>
  );
}
