
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Laptop, FileText, LayoutDashboard, Code, PenTool, Award, Briefcase } from "lucide-react";

export default function AboutPage() {
  const skills = [
    { name: "Word", icon: <FileText size={36} className="text-blue-600" /> },
    { name: "Excel", icon: <FileText size={36} className="text-green-600" /> },
    { name: "PowerPoint", icon: <FileText size={36} className="text-red-600" /> },
    { name: "Canva", icon: <LayoutDashboard size={36} className="text-purple-600" /> },
    { name: "Next.js", icon: <Laptop size={36} className="text-black dark:text-white" /> },
    { name: "MongoDB", icon: <Code size={36} className="text-green-700" /> },
    { name: "MariaDB", icon: <Code size={36} className="text-blue-700" /> },
    { name: "Photoshop", icon: <PenTool size={36} className="text-blue-500" /> },
    { name: "Illustrator", icon: <PenTool size={36} className="text-orange-500" /> },
  ];

  const parcours = [
    { year: "2022", title: "Licence Communication Digitale", description: "Formation complète en stratégie digitale, création de contenus et gestion de projets." },
    { year: "2023", title: "Projets de développement web", description: "Création de sites web interactifs avec Next.js, MongoDB et intégration design." },
    { year: "2024", title: "Portfolio interactif", description: "Développement de mon portfolio pour présenter mes projets et compétences." },
  ];

  const experiences = [
    {
      year: "2025",
      role: "Développeuse Web Freelance",
      company: "Projets personnels & clients",
      description:
        "Création de sites web modernes avec Next.js, intégration UI/UX et gestion de bases de données.",
    },
    {
      year: "2023",
      role: "Designer & Créatrice de contenu",
      company: "Projets digitaux",
      description:
        "Création de visuels professionnels avec Canva, Photoshop et Illustrator pour réseaux sociaux et branding.",
    },
    {
      year: "2022",
      role: "Stagiaire Communication Digitale",
      company: "Entreprise locale",
      description:
        "Gestion des réseaux sociaux, création de campagnes marketing et optimisation SEO.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-gray-900 dark:text-white font-sans">

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center md:justify-start">
          <Image
            src="/fgprofil.png"
            alt="Portrait"
            width={350}
            height={350}
            className="rounded-full shadow-2xl object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4">Bonjour, je suis Fatou</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Développeuse web & spécialiste en communication digitale passionnée par la création d’expériences numériques modernes et interactives.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Mon objectif : créer des sites performants, accessibles et esthétiques tout en valorisant les stratégies de communication digitale.
          </p>
        </div>
      </section>

      {/* Compétences Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Mes compétences</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2 bg-blue-100 dark:bg-zinc-800 px-6 py-4 rounded-lg shadow-lg cursor-pointer transition"
            >
              {skill.icon}
              <span className="font-semibold mt-2">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Parcours Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Mon parcours</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full" />
          <ul className="space-y-12">
            {parcours.map((item, index) => (
              <li
                key={index}
                className={`flex flex-col md:flex-row items-center md:justify-between ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full md:w-1/2 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={24} className="text-yellow-500" />
                    <h3 className="font-bold text-xl">{item.year} - {item.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expériences Section */}
      <section className="py-16 px-6 md:px-20 bg-zinc-100 dark:bg-zinc-900 rounded-t-3xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Mes expériences professionnelles</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 + idx * 0.2 }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <Briefcase size={28} className="text-blue-600" />
                <h3 className="text-xl font-bold">{exp.role}</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 italic">{exp.company} | {exp.year}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}