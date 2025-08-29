"use client";

import { TreePine, Fish, GraduationCap } from "lucide-react";
import Image from "next/image";
import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";

export default function ConservationActions() {
  const funActivities = [
    {
      title: "Protect Animal Homes",
      icon: TreePine,
      description:
        "Plant trees, keep parks clean, and build bird houses to help animals.",
      cta: "EXPLORE",
    },
    {
      title: "Learn About Animals",
      icon: GraduationCap,
      description:
        "Read, watch, and explore to learn more about wildlife and nature.",
      cta: "READ",
    },
    {
      title: "Help Endangered Animals",
      icon: Fish,
      description:
        "Support wildlife by adopting animals and choosing cruelty-free products.",
      cta: "DISCOVER",
    },
  ];

  return (
    <section className="relative -mt-12 sm:-mt-16 lg:-mt-24">
      {/* Top background image */}
      <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px]">
        <Image
          src="/t1.jpg"
          alt="Nature background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/25" />
      </div>

      {/* Bottom soft strip */}
      <div className="h-[180px] bg-[#EAEFEA]" />

      {/* Overlay panel */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-[1px] border border-gray-200 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {funActivities.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="p-8 text-center">
                  <h3 className="font-serif text-2xl text-[#27352F] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#6E7B74] max-w-xs mx-auto mb-6">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Icon className="w-5 h-5 text-[#166D3B]" />
                    <button className="text-xs tracking-[0.2em] font-semibold text-[#4A7C59] hover:text-[#166D3B]">
                      {card.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessible heading for SEO */}
      <div className="sr-only">
        <h2>{CONSERVATION_ACTIONS_CONTENT.header.title}</h2>
        <p>{CONSERVATION_ACTIONS_CONTENT.header.subtitle}</p>
      </div>
    </section>
  );
}
