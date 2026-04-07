
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import { API_URL } from "./services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // ================= PROJECTS =================
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

  // ================= BLOGS =================
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();

        console.log("BLOGS:", data);
        setBlogs(data);
      } catch (error) {
        console.error("Erreur récupération blogs", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-gray-900 dark:text-white font-sans">


      {/* HERO */} 
      <section className="py-24 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center gap-16"> 
          <div className="flex-1 space-y-6 text-center md:text-left"> 
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight"> Bonjour, je suis <span className="text-blue-600">Fatou</span> </h1> 
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"> 
              Web & Spécialiste en Communication Digitale. Je conçois des expériences 
              numériques modernes et performantes. 
            </p> 
            <div className="flex flex-wrap justify-center md:justify-start gap-4"> 
              <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition hover:scale-105" > 
                Voir mes projets 
              </a> 
              <a href="/cv.pdf" className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition hover:scale-105" download >
                Télécharger CV 
              </a> 
            </div>
            <div className="flex justify-center md:justify-start gap-5 mt-6 text-2xl text-gray-600 dark:text-gray-300"> 
              <a href="https://github.com" target="_blank">
                <FaGithub />
              </a> 
              <a href="https://linkedin.com" target="_blank">
                <FaLinkedin />
              </a> 
              <a href="mailto:fg8002220@gmail.com">
                <FaEnvelope />
              </a> 
            </div> 
          </div> 
        {/* IMAGE */} 
          <div className="flex-1 flex justify-center"> 
            <div className="relative"> 
              <Image src="/fgprofil.png" alt="Fatou portrait" width={340} height={340} className="rounded-full object-cover border-4 border-blue-500 shadow-2xl" /> 
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-lg"> 
                Disponible freelance 
              </div> 
            </div> 
          </div> 
      </section> 
      {/* STATS */} 
      <section className="py-16 px-6 md:px-20 bg-white dark:bg-zinc-900"> 
        <div className="grid md:grid-cols-3 gap-8 text-center"> 
          <div> 
            <h3 className="text-4xl font-bold text-blue-600">10+</h3> 
            <p className="text-gray-600 dark:text-gray-300">Projets réalisés</p>
         </div> 
         <div> 
            <h3 className="text-4xl font-bold text-blue-600">3+</h3> 
            <p className="text-gray-600 dark:text-gray-300">Années d’expérience</p> 
          </div> 
        <div> 
          <h3 className="text-4xl font-bold text-blue-600">100%</h3> 
          <p className="text-gray-600 dark:text-gray-300">Clients satisfaits</p> 
        </div> 
      </div> 
      </section> 
      {/* COMPETENCES */} 
      <section className="py-16 px-6 md:px-20"> 
        <h2 className="text-3xl font-bold mb-10 text-center">Compétences clés</h2> 
        <div className="flex flex-wrap justify-center gap-4"> {["Next.js", "MongoDB", "Node.js", "Canva", "Photoshop", "Illustrator", "SEO"].map((skill) => ( <span key={skill} className="bg-blue-100 dark:bg-zinc-800 px-4 py-2 rounded-full text-sm font-medium" > {skill} </span> ))} 
        </div> 
      </section> 
      {/* PROJETS CARROUSEL */} 
      <section id="projects" className="py-20 px-6 md:px-20 bg-zinc-100 dark:bg-zinc-900"> 
        <h2 className="text-3xl font-bold mb-10 text-center">Mes projets</h2>
          {projects.length === 0 ? ( <p className="text-center text-gray-600 dark:text-gray-300"> Chargement des projets... </p> ) : ( <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={3} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, }} > {projects.map((p: any) => ( <SwiperSlide key={p._id}> <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition"> {p.image?.url && ( <img src={p.image.url} alt={p.title} className="w-full h-48 object-cover" /> )} <div className="p-6 space-y-3"> <h3 className="text-lg font-bold">{p.title}</h3> <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3"> {p.description} </p> {p.link && ( <a href={p.link} target="_blank" className="inline-block mt-2 text-blue-600 font-medium hover:underline" > Voir le projet → </a> )} </div> </div> </SwiperSlide> ))} </Swiper> )} </section>

      {/* ================= BLOG ================= */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Blog</h2>

        {loadingBlogs ? (
          <p className="text-center">Chargement...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">
            Aucun article pour le moment
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              
              // ✅ CORRECTION ICI
              <Link key={blog._id} href={`/blog/${blog._id}`} className="block">
                
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300">

                  {blog.image?.url ? (
                    <img
                      src={blog.image.url}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-gray-200">
                      Pas d'image
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-bold text-lg">{blog.title}</h3>
                    <p className="text-sm mt-2 line-clamp-3">
                      {blog.content}
                    </p>
                  </div>

                </div>

              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
