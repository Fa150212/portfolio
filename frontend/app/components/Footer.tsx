"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 text-center mt-auto">
      <p>© {new Date().getFullYear()} Fatou GUEYE. Tous droits réservés.</p>
      <p className="text-sm">Développé avec ❤️ en Next.js</p>
    </footer>
  );
}