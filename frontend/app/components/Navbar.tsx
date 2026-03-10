"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <h1 className="text-xl font-bold text-blue-500">
            MonPortfolio
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-blue-400 transition">Accueil</Link>
            <Link href="/about" className="hover:text-blue-400 transition">À propos</Link>
            <Link href="/projets" className="hover:text-blue-400 transition">Projets</Link>
            <Link href="/contacts" className="hover:text-blue-400 transition">Contacts</Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setOpen(!open)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-900 px-4 pb-4 space-y-3 animate-fadeIn">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-blue-400">Accueil</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block hover:text-blue-400">À propos</Link>
          <Link href="/projets" onClick={() => setOpen(false)} className="block hover:text-blue-400">Projets</Link>
          <Link href="/contacts" onClick={() => setOpen(false)} className="block hover:text-blue-400">Contacts</Link>
        </div>
      )}
    </nav>
  );
}
