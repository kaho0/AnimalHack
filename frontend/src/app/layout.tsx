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
      <div className="flex items-center gap-2 font-bold text-lg text-green-200">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/leaf.png"
          className="w-7 h-7 rounded-md"
          alt="logo"
        />
        Emerald Edge
      </div>

      {/* Links */}
      <ul className="flex gap-8 text-sm">
        <li>
          <a href="#" className="text-yellow-400 font-bold">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">
            Blog
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
