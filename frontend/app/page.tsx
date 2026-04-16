
"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "./services/api";

import { Code, Palette,Layers,} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [tab, setTab] = useState("all");

  const router = useRouter();

  // ================= PROJECTS =================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
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
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  // ================= FILTER =================
  const filteredProjects = projects.filter((p) => {
    if (tab === "all") return true;
    return p.category === tab;
  });

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-gray-900 dark:text-white">

      {/* ================= HERO ================= */}
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
                <a href="https:github.com" target="_blank">
                  <FaGithub />
                </a> 
                <a href="https:linkedin.com" target="_blank">
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

      {/* ================= PROJETS ================= */}
      <section className="py-20 px-6 md:px-20 bg-zinc-100 dark:bg-zinc-900">

        <h2 className="text-3xl font-bold text-center mb-6">
          Mes projets
        </h2>

        {/* ================= TABS ================= */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {[
            { key: "all", label: "Tous", icon: <Layers size={16} /> },
            { key: "dev", label: "Développement", icon: <Code size={16} /> },
            { key: "design", label: "Design", icon: <Palette size={16} /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition
                ${
                  tab === item.key
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-zinc-700"
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* ================= SLIDER ================= */}
        {filteredProjects.length === 0 ? (
          <p className="text-center">Aucun projet</p>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {filteredProjects.map((p) => (
              <SwiperSlide key={p._id}>
                <div
                  onClick={() => router.push(`/projets/${p._id}`)}
                  className="cursor-pointer bg-white dark:bg-zinc-800 rounded-xl shadow hover:-translate-y-2 transition overflow-hidden"
                >
                  <img
                    src={p.image?.url || "/no-image.png"}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold">{p.title}</h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {p.description}
                    </p>
                    {p.link && (
                        <a
                          href={p.link.startsWith("http") ? p.link : `https://${p.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
                          className="inline-flex items-center gap-2 mt-3 text-blue-600 font-medium hover:underline"
                        >
                          Voir le projet →
                        </a>
                      )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* ================= BLOG ================= */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Blog</h2>

        {loadingBlogs ? (
          <p className="text-center">Chargement...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">Aucun article</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog._id}`}>
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow hover:scale-105 transition overflow-hidden">

                  <img
                    src={blog.image?.url || "/no-image.png"}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold">{blog.title}</h3>

                    <p className="text-sm line-clamp-2">
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
