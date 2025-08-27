import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnimalHack - Wildlife Conservation Database",
  description:
    "Explore species, understand conservation status, and learn about actions needed to protect our planet's biodiversity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <nav className="flex justify-between items-center px-12 py-4 text-white absolute top-0 left-0 w-full z-10">
      {/* Logo */}
      <div className="flex items-center gap-3 font-sans-bold text-xl text-gold">
        <span className="font-display-bold text-2xl tracking-wide">
          Emerald Edge
        </span>
      </div>

      {/* Links */}
      <ul className="flex gap-8 text-sm">
        <li>
          <a
            href="#"
            className="text-gold font-sans-bold hover:text-gold/80 transition-colors duration-200"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#search"
            className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#conservation"
            className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#trade"
            className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
          >
            Blog
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sand hover:text-gold transition-colors duration-200 font-sans-medium"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
