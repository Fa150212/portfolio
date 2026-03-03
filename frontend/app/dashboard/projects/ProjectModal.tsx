"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  apiUrl: string;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSuccess,
  apiUrl,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: any) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("Veuillez ajouter une image");

    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    formData.append("image", file);

    const res = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    setLoading(false);

    if (res.ok) {
      setForm({ title: "", description: "", link: "" });
      setFile(null);
      setPreview(null);
      onSuccess();
      onClose();
    } else {
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-6 rounded-2xl w-full max-w-md relative shadow-xl">
      
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
      >
        <X size={20} />
      </button>

      <h2 className="text-xl font-bold mb-4">
        Ajouter un projet
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-zinc-300 dark:border-zinc-700 p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="rounded-lg h-40 object-cover"
          />
        )}

        {/* Nom */}
        <input
          type="text"
          placeholder="Nom du projet"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border border-zinc-300 dark:border-zinc-700 p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border border-zinc-300 dark:border-zinc-700 p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400"
          required
        />

        {/* URL */}
        <input
          type="url"
          placeholder="URL du projet"
          value={form.link}
          onChange={(e) =>
            setForm({ ...form, link: e.target.value })
          }
          className="border border-zinc-300 dark:border-zinc-700 p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer le projet"}
        </button>

      </form>
    </div>
  </div>
  
    // <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    //   <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md relative shadow-xl">
    //     <button
    //       onClick={onClose}
    //       className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
    //     >
    //       <X size={20} />
    //     </button>

    //     <h2 className="text-xl font-bold mb-4">Ajouter un projet</h2>

    //     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //       {/* Image */}
    //       <input
    //         type="file"
    //         accept="image/*"
    //         onChange={handleFileChange}
    //         className="border p-2 rounded"
    //       />

    //       {preview && (
    //         <img
    //           src={preview}
    //           alt="preview"
    //           className="rounded-lg h-40 object-cover"
    //         />
    //       )}

    //       {/* Nom */}
    //       <input
    //         type="text"
    //         placeholder="Nom du projet"
    //         value={form.title}
    //         onChange={(e) =>
    //           setForm({ ...form, title: e.target.value })
    //         }
    //         className="border p-2 rounded dark:bg-zinc-800 text-dark"
    //         required
    //       />

    //       {/* Description */}
    //       <textarea
    //         placeholder="Description"
    //         value={form.description}
    //         onChange={(e) =>
    //           setForm({ ...form, description: e.target.value })
    //         }
    //         className="border p-2 rounded dark:bg-zinc-800"
    //         required
    //       />

    //       {/* URL */}
    //       <input
    //         type="url"
    //         placeholder="URL du projet"
    //         value={form.link}
    //         onChange={(e) =>
    //           setForm({ ...form, link: e.target.value })
    //         }
    //         className="border p-2 rounded dark:bg-zinc-800"
    //       />

    //       <button
    //         type="submit"
    //         disabled={loading}
    //         className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
    //       >
    //         {loading ? "Création..." : "Créer le projet"}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}