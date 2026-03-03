
"use client";

import { useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

interface SidebarProps {
  admin: any;
  logout: () => void;
}

export default function Sidebar({ admin, logout }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Hamburger bouton mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 p-2 rounded text-white"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 bg-gray-900 p-6 flex-col justify-between min-h-screen shadow-xl">
        {/* Contenu du haut */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <img
              src={admin?.photo}
              alt="Admin"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h2 className="font-semibold text-lg">
                {admin?.firstName} {admin?.lastName}
              </h2>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                {admin?.role}
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-3 mt-6">
            <a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a>
            <a href="/dashboard/projects" className="hover:text-blue-400 transition">Projets</a>
            <a href="/dashboar/messages" className="hover:text-blue-400 transition">Messages</a>
          </nav>
        </div>

        {/* Logout en bas */}
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full p-2 mt-6 bg-red-600 rounded hover:bg-red-700 transition"
        >
          <FiLogOut />
          Déconnexion
        </button>
      </aside>

      {/* Sidebar mobile */}
      {mobileOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-64 h-full bg-gray-900 p-6 flex flex-col justify-between shadow-2xl z-50 md:hidden"
        >
          {/* Close bouton */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <FiX size={24} />
          </button>

          {/* Contenu du haut */}
          <div>
            <div className="flex items-center gap-4 mb-6 mt-10">
              <img
                src={admin?.photo}
                alt="Admin"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {admin?.firstName} {admin?.lastName}
                </h2>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                  {admin?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full p-2 mt-6 bg-red-600 rounded hover:bg-red-700 transition"
          >
            <FiLogOut />
            Déconnexion
          </button>
        </motion.aside>
      )}

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
