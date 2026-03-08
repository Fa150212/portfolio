"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { API_URL } from "../services/api";

export default function ProjetsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Erreur récupération projets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-gray-900 dark:text-white">
      {/* Header */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Mes <span className="text-blue-600">Projets</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Découvrez une sélection de mes réalisations en développement web et design digital.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-20 pb-20">
        {loading ? (
          <p className="text-center text-gray-500">Chargement des projets...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500">Aucun projet pour le moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p: any, index: number) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition"
              >
                {/* Image */}
                {p.image?.url && (
                  <div className="relative w-full h-48">
                   <img
                        src={p.image.url}
                        alt={p.title}
                        className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-xl font-bold">{p.title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {p.description}
                  </p>

                  {/* Tags */}
                  {p.techs && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.techs.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 mt-4">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
                      >
                        <FaGithub /> Code
                      </a>
                    )}

                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <FaExternalLinkAlt /> Démo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
