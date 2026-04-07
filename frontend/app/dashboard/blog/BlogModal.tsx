
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function BlogModal({
  isOpen,
  onClose,
  onSuccess,
  apiUrl,
  blog,
}: any) {

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 remplir form si EDIT
  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title,
        content: blog.content,
      });
      setPreview(blog.image?.url || null);
    }
  }, [blog]);

  if (!isOpen) return null;

  const handleFile = (e: any) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      // ================= UPDATE =================
      if (blog) {
        await fetch(`${apiUrl}/blogs/${blog._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          credentials: "include",
        });
      } 
      // ================= CREATE =================
      else {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        if (file) formData.append("image", file);

        await fetch(`${apiUrl}/blogs`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
      }

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-6 rounded-2xl w-full max-w-md relative shadow-xl">

        <button onClick={onClose} className="absolute right-3 top-3">
          <X />
        </button>

        <h2 className="font-bold mb-4">
          {blog ? "Modifier blog" : "Ajouter blog"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})}
            placeholder="Titre"
            className="border p-2"
            required
          />

          <textarea
            value={form.content}
            onChange={(e)=>setForm({...form,content:e.target.value})}
            placeholder="Contenu"
            className="border p-2"
            required
          />

          {/* IMAGE (optionnel en edit) */}
          <input type="file" onChange={handleFile} />

          {preview && (
            <img src={preview} className="h-32 object-cover rounded" />
          )}

          <button className="bg-blue-600 text-white py-2">
            {loading
              ? "Chargement..."
              : blog
              ? "Mettre à jour"
              : "Ajouter"}
          </button>

        </form>

      </div>

    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";

// export default function BlogModal({ isOpen, onClose, onSuccess, apiUrl }: any) {

//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//   });

//   const [file, setFile] = useState<any>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleFile = (e: any) => {
//     const f = e.target.files[0];
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("content", form.content);
//     if (file) formData.append("image", file);

//     setLoading(true);

//     const res = await fetch(`${apiUrl}/blogs`, {
//       method: "POST",
//       body: formData,
//       credentials: "include",
//     });

//     setLoading(false);

//     if (res.ok) {
//       onSuccess();
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

//       <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-6 rounded-2xl w-full max-w-md relative shadow-xl">

//         <button onClick={onClose} className="absolute right-3 top-3">
//           <X />
//         </button>

//         <h2 className="font-bold mb-4">Ajouter blog</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">

//           <input
//             type="text"
//             placeholder="Titre"
//             onChange={(e)=>setForm({...form,title:e.target.value})}
//             className="border p-2"
//           />

//           <textarea
//             placeholder="Contenu"
//             onChange={(e)=>setForm({...form,content:e.target.value})}
//             className="border p-2"
//           />

//           <input type="file" onChange={handleFile} />

//           {preview && <img src={preview} className="h-32 object-cover" />}

//           <button className="bg-blue-600 text-white py-2">
//             {loading ? "Ajout..." : "Ajouter"}
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }