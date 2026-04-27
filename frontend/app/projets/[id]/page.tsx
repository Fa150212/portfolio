
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "../../services/api";
import { ArrowLeft, ExternalLink, Tag } from "lucide-react";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_URL}/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Chargement...</p>
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Projet introuvable</p>
      </div>
    );

  return (
    <div className="min-h-screen px-6 md:px-20 py-12 bg-zinc-50 dark:bg-black text-gray-900 dark:text-white">

      {/* 🔙 BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-sm text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Retour
      </button>

      {/* CONTAINER */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* IMAGE */}
        <div className="w-full">
          <img
              src={project.image?.url || "/no-image.png"}
              className="w-full h-auto rounded-2xl shadow-lg object-contain"
            />
        </div>

        {/* CONTENT */}
        <div className="space-y-6">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            {project.title}
          </h1>

          {/* CATEGORY */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Tag size={16} />
            {project.category}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>

          {/* TECHNOLOGIES */}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4 flex-wrap">

            {/* Voir projet */}
            {project.link && (
              <a
                href={
                  project.link.startsWith("http")
                    ? project.link
                    : `https://${project.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <ExternalLink size={16} />
                Voir le projet
              </a>
            )}

            {/* Retour */}
            <button
              onClick={() => router.back()}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              Retour
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
