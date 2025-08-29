"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  RefreshCw,
  AlertCircle,
  Utensils,
  Shirt,
  Stethoscope,
  Home,
  Users,
  FlaskConical,
  Zap,
  TreePine,
} from "lucide-react";

// Mock IUCN client for demonstration
const iucnClient = {
  getUseAndTrade: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      use_and_trade: [
        {
          code: "1-2",
          description: { en: "Food - Human & Animal Consumption" },
        },
        {
          code: "4-5",
          description: { en: "Poisons & Manufacturing Chemicals" },
        },
        { code: "7-8-14", description: { en: "Fuels, Fibre & Research" } },
        {
          code: "10-11",
          description: { en: "Apparel, Accessories & Handicrafts" },
        },
        { code: "3", description: { en: "Medicine - human & veterinary" } },
        {
          code: "6",
          description: { en: "Construction or structural materials" },
        },
        {
          code: "9",
          description: { en: "Pets/display animals, horticulture" },
        },
        {
          code: "12",
          description: { en: "Sport hunting/specimen collecting" },
        },
        { code: "13", description: { en: "Establishing ex-situ production" } },
      ],
    };
  },
};

type UseAndTradeType = {
  code: string;
  description: {
    en: string;
  };
};

const getCategoryGroup = (description: string) => {
  if (
    description.includes("Food") ||
    description.includes("Poisons") ||
    description.includes("Fuels")
  ) {
    return "primary";
  }
  if (
    description.includes("Apparel") ||
    description.includes("Medicine") ||
    description.includes("Construction")
  ) {
    return "secondary";
  }
  return "tertiary";
};

export default function UseAndTrade() {
  const [useAndTradeItems, setUseAndTradeItems] = useState<UseAndTradeType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUseAndTrade();
  }, []);

  const loadUseAndTrade = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await iucnClient.getUseAndTrade();
      let items: UseAndTradeType[] = [];
      if (data && typeof data === "object" && "use_and_trade" in data) {
        items = data.use_and_trade;
      } else if (Array.isArray(data)) {
        items = data as UseAndTradeType[];
      }

      setUseAndTradeItems(items);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load use and trade data"
      );
    } finally {
      setLoading(false);
    }
  };

  const primaryItems = useAndTradeItems.filter(
    (item) => getCategoryGroup(item.description.en) === "primary"
  );
  const secondaryItems = useAndTradeItems.filter(
    (item) => getCategoryGroup(item.description.en) === "secondary"
  );
  const tertiaryItems = useAndTradeItems.filter(
    (item) => getCategoryGroup(item.description.en) === "tertiary"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#033222] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400/20 border-t-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-yellow-200 font-medium">
            Loading use and trade data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#033222] flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto p-8 bg-red-500/10 border-2 border-red-400/20 rounded-3xl text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h3 className="text-2xl text-red-300 font-bold mb-4">
            Error Loading Data
          </h3>
          <p className="text-red-200 mb-6">{error}</p>
          <button
            onClick={loadUseAndTrade}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-200 inline-flex items-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#033222] -mt-20 md:-mt-28">
      {/* Wildlife Image Section */}
      <div
        className="relative overflow-hidden w-full h-[30vh] md:h-[30vh]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(3,50,34,0.6), rgba(3,50,34,0.6)), url('/u1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-amber-200"
            style={{
              color: "#D4AF37",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.02em",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Use and Trade
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-white py-7 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"></div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Primary Categories */}
            <div className="text-left">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <Utensils className="w-10 h-10 text-emerald-900" />
              </div>
              <ul className="space-y-3 text-white/90 text-xl">
                {primaryItems.map((item, index) => (
                  <li
                    key={item.code || index}
                    className="flex items-start text-base"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    <span className="font-lato font-thin text-xl leading-relaxed tracking-wide">
                      {item.description.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secondary Categories */}
            <div className="text-left">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <Stethoscope className="w-10 h-10 text-emerald-900" />
              </div>
              <ul className="space-y-3 text-white/90 text-xl">
                {secondaryItems.map((item, index) => (
                  <li
                    key={item.code || index}
                    className="flex items-start text-base"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    <span className="font-lato font-thin text-xl leading-relaxed tracking-wide">
                      {item.description.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tertiary Categories */}
            <div className="text-left">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-emerald-900" />
              </div>
              <ul className="space-y-3 text-white/90 text-xl">
                {tertiaryItems.map((item, index) => (
                  <li
                    key={item.code || index}
                    className="flex items-start text-base"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    <span className="font-lato font-thin text-xl leading-relaxed tracking-wide">
                      {item.description.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
