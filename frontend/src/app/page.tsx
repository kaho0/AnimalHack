"use client";

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

      {/* Use and Trade Section */}
      <section id="trade" className="p-0 bg-[#033222] scroll-mt-24">
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
