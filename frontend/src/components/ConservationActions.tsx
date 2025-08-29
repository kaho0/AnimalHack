"use client";

import { useState, useEffect } from "react";
import { iucnClient } from "@/lib/iucnClient";
import {
  ConservationAction,
  OrganizedCategories,
} from "./ConservationActions/types";

import { LoadingState } from "./ConservationActions/LoadingState";
import { ErrorState } from "./ConservationActions/ErrorState";
import { HeaderSection } from "./ConservationActions/HeaderSection";
import { StatsSection } from "./ConservationActions/StatsSection";
import { CategoryGrid } from "./ConservationActions/CategoryGrid";
import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";

export default function ConservationActions() {
  const [actions, setActions] = useState<ConservationAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [showAllCategories, setShowAllCategories] = useState(false);

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
  const organizeActions = (): OrganizedCategories => {
    // First, let's see what codes we actually have
    const allCodes = actions.map((a) => a.code).filter(Boolean);
    console.log("Available action codes:", allCodes);

    const categories: OrganizedCategories = {
      "Land/Water Protection": {
        icon: "Globe",
        color: "from-[#0F3D2E] to-[#A8C686]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "1" || code?.startsWith("1_");
        }),
      },
      "Land/Water Management": {
        icon: "TreePine",
        color: "from-[#A8C686] to-[#C4704A]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "2" || code?.startsWith("2_");
        }),
      },
      "Education & Awareness": {
        icon: "GraduationCap",
        color: "from-[#D4A574] to-[#B8860B]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "4" || code?.startsWith("4_");
        }),
      },
      "Species Management": {
        icon: "Fish",
        color: "from-[#C4704A] to-[#E6B17A]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "3" || code?.startsWith("3_");
        }),
      },
      "Law & Policy": {
        icon: "Scale",
        color: "from-[#B8860B] to-[#8B6914]",
        actions: actions.filter((a) => {
          const code = a.code;
          return code === "5" || code?.startsWith("5_");
        }),
      },
      "Livelihood, Economic & Incentives": {
        icon: "DollarSign",
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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadConservationActions} />;
  }

  const organizedCategories: OrganizedCategories = organizeActions();
  const totalActions = actions.length;

  return (
    <div className="text-center mb-20 mt-8">
      <HeaderSection />
      <StatsSection
        totalActions={totalActions}
        organizedCategories={organizedCategories}
      />
      <CategoryGrid
        organizedCategories={organizedCategories}
        expandedCategories={expandedCategories}
        showAllCategories={showAllCategories}
        onToggleCategory={toggleCategory}
        onToggleShowAll={() => setShowAllCategories(!showAllCategories)}
      />

      {/* Info Text */}
      <div className="mt-16 text-center">
        <p className="font-serif text-sm text-[#6E7B74]/60 font-light">
          {CONSERVATION_ACTIONS_CONTENT.info.expandHint}
        </p>
      </div>
    </div>
  );
}
