"use client";

import { useState, useEffect } from "react";
import { iucnClient, type ConservationAction } from "@/lib/iucnClient";
import {
  Leaf,
  RefreshCw,
  AlertCircle,
  Shield,
  Globe,
  Fish,
  Scale,
  GraduationCap,
  DollarSign,
  TreePine,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ConservationActions() {
  const [actions, setActions] = useState<ConservationAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

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

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  // Organize actions into main categories with sub-categories
  const organizeActions = () => {
    // First, let's see what codes we actually have
    const allCodes = actions.map((a) => a.code).filter(Boolean);
    console.log("Available action codes:", allCodes);

    const categories = {
      "Land/Water Protection": {
        icon: Globe,
        color: "from-[#0F3D2E] to-[#A8C686]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "1" || code?.startsWith("1_");
        }),
      },
      "Land/Water Management": {
        icon: TreePine,
        color: "from-[#A8C686] to-[#C4704A]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "2" || code?.startsWith("2_");
        }),
      },
      "Species Management": {
        icon: Fish,
        color: "from-[#C4704A] to-[#E6B17A]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "3" || code?.startsWith("3_");
        }),
      },
      "Education & Awareness": {
        icon: GraduationCap,
        color: "from-[#D4A574] to-[#B8860B]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "4" || code?.startsWith("4_");
        }),
      },
      "Law & Policy": {
        icon: Scale,
        color: "from-[#B8860B] to-[#8B6914]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "5" || code?.startsWith("5_");
        }),
      },
      "Livelihood, Economic & Incentives": {
        icon: DollarSign,
        color: "from-[#8B6914] to-[#654321]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "6" || code?.startsWith("6_");
        }),
      },
    };

    // Log how many actions are in each category
    Object.entries(categories).forEach(([name, data]) => {
      console.log(`${name}: ${data.actions.length} actions`);
    });

    return categories;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-7">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A8C686]/20 border-t-[#C4704A] mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C4704A]/40 animate-ping"></div>
          </div>
          <p className="font-serif text-xl text-[#0F3D2E]/80 font-light">
            Loading conservation actions...
          </p>
          <p className="font-serif text-base text-[#6E7B74]/60 mt-2 font-light">
            Gathering data from IUCN database
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[#FDF2F2] to-[#FDF2F2]/80 border-2 border-[#EF6C00]/20 rounded-3xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#EF6C00]/20 rounded-full flex items-center justify-center mr-4">
            <AlertCircle className="w-6 h-6 text-[#EF6C00]" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#C62828] font-light">
              Error Loading Data
            </h3>
            <p className="font-serif text-sm text-[#C62828]/70 font-light">
              Unable to fetch conservation actions
            </p>
          </div>
        </div>
        <p className="font-serif text-base text-[#2F3E34]/80 mb-6 leading-relaxed font-light">
          {error}
        </p>
        <button
          onClick={loadConservationActions}
          className="bg-[#0F3D2E] hover:bg-[#033222] text-[#F5F5DC] px-8 py-4 rounded-full transition-colors duration-200 font-serif font-light"
        >
          <RefreshCw className="w-5 h-5 mr-2 inline" />
          Try Again
        </button>
      </div>
    );
  }

  const organizedCategories = organizeActions();
  const totalActions = actions.length;

  return (
    <div className="text-center mb-20 mt-8">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#A8C686]/20 to-[#C8B6A6]/20 rounded-2xl flex items-center justify-center mr-4">
            <Shield className="w-8 h-8 text-[#0F3D2E]" />
          </div>
          <h2 className="font-serif text-6xl lg:text-7xl font-light text-[#0F3D2E] leading-tight tracking-tight">
            Conservation Actions
          </h2>
        </div>
        <p className="font-serif text-2xl leading-relaxed font-light tracking-wide max-w-4xl mx-auto text-[#6E7B74]">
          Discover the comprehensive strategies and measures available for
          protecting species and their habitats worldwide.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="text-center">
          <div className="font-serif text-5xl font-light text-[#0F3D2E] mb-2">
            {totalActions}
          </div>
          <div className="font-serif text-sm text-[#6E7B74]/60 uppercase tracking-wider font-light">
            Actions Available
          </div>
        </div>
        <div className="text-center">
          <div className="font-serif text-5xl font-light text-[#C4704A] mb-2">
            {organizedCategories["Land/Water Protection"].actions.length +
              organizedCategories["Land/Water Management"].actions.length}
          </div>
          <div className="font-serif text-sm text-[#6E7B74]/60 uppercase tracking-wider font-light">
            Protection & Management
          </div>
        </div>
        <div className="text-center">
          <div className="font-serif text-5xl font-light text-[#A8C686] mb-2">
            {organizedCategories["Species Management"].actions.length +
              organizedCategories["Education & Awareness"].actions.length}
          </div>
          <div className="font-serif text-sm text-[#6E7B74]/60 uppercase tracking-wider font-light">
            Species & Education
          </div>
        </div>
      </div>

      {/* Main Categories Grid - Expandable Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(organizedCategories).map(
            ([categoryName, categoryData]) => {
              const IconComponent = categoryData.icon;
              const isExpanded = expandedCategories.has(categoryName);
              return (
                <div
                  key={categoryName}
                  className="group relative overflow-hidden rounded-3xl border border-[#C8B6A6]/20 bg-white hover:border-[#C4704A]/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header with Icon, Title, and Expand Button */}
                  <div className="flex items-start space-x-4 p-8 pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#A8C686]/20 to-[#C8B6A6]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-[#0F3D2E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-light text-[#0F3D2E] leading-tight mb-2">
                        {categoryName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#0F3D2E]/10 rounded-lg flex items-center justify-center">
                          <Leaf className="w-4 h-4 text-[#0F3D2E]" />
                        </div>
                        <span className="font-serif text-sm text-[#6E7B74] font-light">
                          {categoryData.actions.length} Actions
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCategory(categoryName)}
                      className="w-10 h-10 bg-[#0F3D2E]/10 rounded-xl flex items-center justify-center hover:bg-[#0F3D2E]/20 transition-colors duration-200 flex-shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#0F3D2E]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#0F3D2E]" />
                      )}
                    </button>
                  </div>

                  {/* Preview of first few actions */}
                  <div className="px-8 pb-4">
                    <div className="space-y-3">
                      {categoryData.actions.slice(0, 3).map((action, index) => (
                        <div
                          key={action.code || index}
                          className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F5F5DC]/50 transition-colors duration-200"
                        >
                          <span className="w-2 h-2 bg-[#C4704A] rounded-full mt-2 flex-shrink-0"></span>
                          <p className="font-serif text-sm text-[#2F3E34]/80 leading-relaxed font-light">
                            {action.description.en}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable section with all actions */}
                  {isExpanded && (
                    <div className="border-t border-[#C8B6A6]/20 bg-[#F5F5DC]/30">
                      <div className="p-8 pt-6">
                        <div className="space-y-3 max-h-96 overflow-y-auto text-left">
                          {categoryData.actions
                            .slice(3)
                            .map((action, index) => (
                              <div
                                key={action.code || index + 3}
                                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200"
                              >
                                <span className="w-2 h-2 bg-[#C4704A] rounded-full mt-2 flex-shrink-0"></span>
                                <div className="flex-1">
                                  <p className="font-serif text-sm text-[#2F3E34]/80 leading-relaxed font-light">
                                    {action.description.en}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Info Text */}
      <div className="mt-16 text-center">
        <p className="font-serif text-sm text-[#6E7B74]/60 font-light">
          Click on any category to expand and see all conservation actions
        </p>
      </div>
    </div>
  );
}
