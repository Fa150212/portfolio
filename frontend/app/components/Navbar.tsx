"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-500">
          MonPortfolio
        </h1>

        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-400 transition">
            Accueil
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition">
            À propos
          </Link>
          <Link href="/projets" className="hover:text-blue-400 transition">
            Projets
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div>

      </div>
    </nav>
  );
}