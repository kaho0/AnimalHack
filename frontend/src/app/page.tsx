"use client";

import ConservationActions from "@/components/ConservationActions";
import UseAndTrade from "@/components/UseAndTrade";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Transition from "@/components/Transition";
import Shopping from "@/components/Shopping";
import Footer from "@/components/Footer";
import SearchSection from "@/components/SearchSection";
import ChatbotSection from "@/components/ChatbotSection";
import ThreatsToWildlife from "@/components/ThreatsToWildlife";
import FocusAreas from "@/components/FocusAreas";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F4E3]">
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
      <section id="trade" className="py-20 bg-[#F8F4E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UseAndTrade />
        </div>
      </section>

      {/* Transition to Personal Action */}
      <Transition />

      {/* Shopping Assistant Introduction */}
      <Shopping />

      {/* Cruelty-Free Shopping Chatbot */}
      <ChatbotSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
