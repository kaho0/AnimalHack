"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-chat"));
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-100 text-white">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link
          href="/#home"
          className="flex items-center gap-3 font-sans-bold text-xl text-gold"
        >
          <span className="font-display-bold text-2xl tracking-wide">
            OneEarth
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm">
          <li>
            <Link
              href="/#home"
              className="text-gold font-sans-bold hover:text-gold/80 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#search"
              className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/#trade"
              className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
            >
              Use & Trade
            </Link>
          </li>
          <li>
            <Link
              href="/#chat"
              onClick={openChat}
              className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
            >
              Chat
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-gold/50"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 bg-black/40 backdrop-blur-sm rounded-lg p-4">
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#home"
                className="block text-gold font-sans-bold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#search"
                className="block text-sand"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#trade"
                className="block text-sand"
              >
                Use & Trade
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  openChat();
                  setIsOpen(false);
                }}
                href="/#chat"
                className="block text-sand"
              >
                Chat
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
