"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import { API_URL } from "./services/api";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Erreur récupération projets:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-gray-900 dark:text-white font-sans">
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center p-10 gap-10 md:gap-20">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bonjour, je suis Fatou
          </h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Développeuse web & designer, je crée des expériences numériques modernes et interactives.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Me contacter
            </a>
            <a
              href="#projects"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Voir mes projets
            </a>
          </div>
          {/* Réseaux sociaux */}
          <div className="flex justify-center md:justify-start gap-4 mt-6 text-2xl text-gray-700 dark:text-gray-300">
            <a href="https://github.com" target="_blank"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank"><FaLinkedin /></a>
            <a href="mailto:fg8002220@gmail.com"><FaEnvelope /></a>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex-1 flex justify-center md:justify-start">
              <Image
                  src="/fgprofil.png"
                  alt="Portrait"
                  width={350}
                  height={350}
                  className="rounded-full shadow-2xl object-cover"
              />
           </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projects" className="p-10 md:px-20 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-6">Mes projets</h2>
        {projects.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">Aucun projet pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p: any) => (
              <div
                key={p._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition"
              >
                {p.image?.url && (
                  <img
                    src={p.image.url}
                    alt={p.title}
                    className="rounded mb-2 w-full h-40 object-cover"
                  />
                )}
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Voir le projet
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="p-10 md:px-20 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Vous pouvez me contacter via email ou via mes réseaux sociaux.
        </p>
        <form className="flex flex-col gap-4 max-w-md mx-auto md:mx-0">
          <input type="text" placeholder="Nom" className="p-3 rounded bg-gray-100 dark:bg-gray-800" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-gray-100 dark:bg-gray-800" />
          <textarea placeholder="Message" className="p-3 rounded bg-gray-100 dark:bg-gray-800"></textarea>
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}
