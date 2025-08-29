"use client";

import ConservationActions from "@/components/ConservationActions";
import UseAndTrade from "@/components/UseAndTrade";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SearchSection from "@/components/SearchSection";
import ChatbotSection from "@/components/ChatbotSection";
import ThreatsToWildlife from "@/components/ThreatsToWildlife";
import FocusAreas from "@/components/FocusAreas";
import ShoppingImpact from "@/components/ShoppingImpact";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      <ThreatsToWildlife />
      {/* Focus Areas Section */}
      <FocusAreas />
      {/* Search Section */}
      <SearchSection />

      {/* Conservation Actions Section */}
      <section id="conservation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConservationActions />
        </div>
      </section>

      {/* Use and Trade Section */}
      <section id="trade" className="p-0 bg-[#033222]">
        <UseAndTrade />
      </section>

      {/* Combined Impact + Shopping Assistant over image */}
      <ShoppingImpact />

      {/* Cruelty-Free Shopping Chatbot */}
      <ChatbotSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
