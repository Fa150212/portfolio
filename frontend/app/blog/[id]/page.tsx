
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/app/services/api";
import { ArrowLeft, Share2 } from "lucide-react";

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [blog, setBlog] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  // ================= FETCH BLOG =================
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [id]);

  // ================= SCROLL PROGRESS =================
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;

      const progress = (scrollPosition / totalHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Chargement de l'article...
      </div>
    );
  }

  const date =
    blog.createdAt && !isNaN(new Date(blog.createdAt).getTime())
      ? new Date(blog.createdAt).toLocaleDateString("fr-FR")
      : "Date inconnue";

  // 📖 Temps de lecture (~200 mots/min)
  const words = blog.content.split(" ").length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">

      {/* 🔥 PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all"
        style={{ width: `${progress}%` }}
      />

      {/* HERO */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <img
          src={blog.image?.url || "/no-image.png"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8 md:p-16">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:opacity-80"
            >
              <ArrowLeft size={20} />
              Retour
            </button>

            <button
              onClick={() => {
                navigator.share?.({
                  title: blog.title,
                  text: blog.content,
                  url: window.location.href,
                });
              }}
              className="text-white flex items-center gap-2 hover:opacity-80"
            >
              <Share2 size={20} />
              Partager
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl">
            {blog.title}
          </h1>

          <div className="flex gap-4 text-gray-300 mt-4 text-sm">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime} min de lecture</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* INTRO */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          {blog.content.slice(0, 150)}...
        </p>

        {/* MAIN CONTENT */}
        <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
          {blog.content}
        </div>

        {/* FOOTER */}
        <div className="mt-16 border-t pt-8 text-center">
          <p className="text-gray-500">Merci d'avoir lu 🙌</p>

          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Voir d'autres articles
          </button>
        </div>

      </div>
    </div>
  );
}
