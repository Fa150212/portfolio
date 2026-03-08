
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
 Award, Briefcase, Laptop, FileText, LayoutDashboard, Code, PenTool, Settings 
} from "lucide-react";

export default function AboutPage() {
   const router = useRouter();

  // Compétences techniques
  const techSkills = [
    { name: "JavaScript", icon: <Code size={28} className="text-yellow-400" /> },
    { name: "React.js", icon: <Laptop size={28} className="text-cyan-400" /> },
    { name: "Next.js", icon: <Laptop size={28} className="text-black dark:text-white" /> },
    { name: "HTML", icon: <FileText size={28} className="text-orange-500" /> },
    { name: "CSS", icon: <FileText size={28} className="text-blue-500" /> },
    { name: "Tailwind", icon: <Settings size={28} className="text-sky-400" /> },
    { name: "Node.js", icon: <Code size={28} className="text-green-600" /> },
    { name: "MongoDB", icon: <Code size={28} className="text-green-500" /> },
    { name: "Git", icon: <Code size={28} className="text-red-500" /> },
  ];
    // Compétences en Communication Digitale
  const digitalSkills = [
    { name: "Canva", icon: <LayoutDashboard size={28} className="text-purple-600" /> },
    { name: "Photoshop", icon: <PenTool size={28} className="text-blue-500" /> },
    { name: "Illustrator", icon: <PenTool size={28} className="text-orange-500" /> },
    { name: "Word", icon: <FileText size={28} className="text-blue-700" /> },
    { name: "Excel", icon: <FileText size={28} className="text-green-700" /> },
    { name: "PowerPoint", icon: <FileText size={28} className="text-red-600" /> },
    { name: "InDesign", icon: <PenTool size={28} className="text-pink-500" /> },
    { name: "SEO & Content", icon: <LayoutDashboard size={28} className="text-yellow-500" /> },
  ];

  const parcours = [
    {
      year: "2022",
      title: "Licence Communication Digitale",
      description:
        "Stratégie digitale, création de contenus, branding et gestion de projets numériques.",
    },
    {
      year: "2023",
      title: "Développement Web Fullstack",
      description:
        "Création d’applications web modernes avec Next.js, Node.js et bases de données.",
    },
    {
      year: "2024",
      title: "Portfolio & Projets Clients",
      description:
        "Conception de plateformes digitales, UI/UX design et déploiement cloud.",
    },
  ];

  const experiences = [
    {
      year: "2025",
      role: "Développeuse Web Freelance",
      company: "Clients & projets personnels",
      description:
        "Développement d’applications performantes, dashboards admin et plateformes e-commerce.",
    },
    {
      year: "2023",
      role: "Designer Graphique & Content Creator",
      company: "Projets digitaux",
      description:
        "Création de visuels marketing et identité de marque avec Canva & Adobe Suite.",
    },
    {
      year: "2022",
      role: "Stagiaire Communication Digitale",
      company: "Entreprise locale",
      description:
        "Community management, campagnes marketing et optimisation SEO.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 text-gray-900 dark:text-white">

      {/* HERO */}
      {/* <section className="py-24 px-6 md:px-20 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <Image
              src="/fgprofil.png"
              alt="Fatou portrait"
              width={320}
              height={320}
              className="rounded-full object-cover border-4 border-blue-500 shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
              Disponible freelance
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Bonjour, je suis <span className="text-blue-600">Fatou</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Développeuse Web & Spécialiste en Communication Digitale.  
            Je conçois des expériences numériques modernes, performantes et orientées résultats.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition">
              Voir mes projets
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition">
              Télécharger CV
            </button>
          </div>
        </div>
      </section> */}
      <section className="py-24 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center gap-16">
      
      {/* TEXTE */}
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Bonjour, je suis <span className="text-blue-600">Fatou</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Développeuse Web & Spécialiste en Communication Digitale.  
          Je conçois des expériences numériques modernes, performantes et orientées résultats.
        </p>

        <div className="flex flex-wrap gap-4">
          
          {/* Bouton projets */}
          <button
            onClick={() => router.push("/projets")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Voir mes projets
          </button>

          {/* Bouton CV */}
          <a
            href="/CV-Fatou GUEYE-Communication"
            download
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition transform hover:scale-105"
          >
            Télécharger CV
          </a>

        </div>
      </div>

      {/* IMAGE */}
      <div className="flex-1 flex justify-center">
        <div className="relative">
          <Image
            src="/fgprofil.png"
            alt="Fatou portrait"
            width={320}
            height={320}
            className="rounded-full object-cover border-4 border-blue-500 shadow-2xl"
          />
          <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
            Disponible freelance
          </div>
        </div>
      </div>

    </section>

      {/* TECH SKILLS */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Compétences techniques
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techSkills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -6 }}
              className="bg-white/70 dark:bg-zinc-800 backdrop-blur p-6 rounded-xl shadow-md flex flex-col items-center gap-3 border border-zinc-200 dark:border-zinc-700"
            >
              {skill.icon}
              <span className="font-semibold">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIGITAL SKILLS */}
      <section className="py-16 bg-blue-50 dark:bg-zinc-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-800 dark:text-blue-400">
          Compétences en Communication Digitale
        </h2>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
          {digitalSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl shadow-lg cursor-pointer transition"
            >
              {skill.icon}
              <span className="font-semibold text-gray-800 dark:text-white">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARCOURS */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Parcours académique</h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {parcours.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow">
                  <Award size={22} />
                </div>
                {index !== parcours.length - 1 && (
                  <div className="w-1 h-full bg-blue-300 mt-2" />
                )}
              </div>

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow flex-1">
                <h3 className="font-bold text-xl">
                  {item.year} — {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="py-20 px-6 md:px-20 bg-zinc-100 dark:bg-zinc-900">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Expériences professionnelles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-blue-600" />
                <h3 className="font-bold text-lg">{exp.role}</h3>
              </div>

              <p className="text-sm text-gray-500 italic">
                {exp.company} • {exp.year}
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
