
"use client";

import { useState } from "react";

export default function ProjectModal({ isOpen, onClose, onSuccess, apiUrl }: any) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
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

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", form.title);
  //   formData.append("description", form.description);
  //   formData.append("link", form.link);
  //   formData.append("category", form.category);

  //   if (file) formData.append("image", file);

  //   setLoading(true);

  //   const res = await fetch(`${apiUrl}/projects`, {
  //     method: "POST",
  //     body: formData,
  //     credentials: "include",
  //   });

  //   setLoading(false);

  //   if (res.ok) {
  //     setForm({ title: "", description: "", link: "", category: "" });
  //     setFile(null);
  //     setPreview(null);
  //     onSuccess();
  //     onClose();
  //   } else {
  //     alert("Erreur création");
  //   }
  // };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("category", form.category);

  // ✅ AJOUT CONDITION
  if (form.link && form.link.trim() !== "") {
    formData.append("link", form.link);
  }

  if (file) formData.append("image", file);

  setLoading(true);

  const res = await fetch(`${apiUrl}/projects`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  setLoading(false);

  if (res.ok) {
    onSuccess();
    onClose();
  } else {
    alert("Erreur création");
  }
};
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="font-bold mb-4">Ajouter projet</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Titre"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
            className="border p-2"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="border p-2"
          />

          <input
            type="url"
            placeholder="https://mon-site.com (optionnel)"
            value={form.link}
            onChange={(e) =>
              setForm({ ...form, link: e.target.value })
            }
            className="border p-2"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
            className="border p-2"
          >
            <option value="">Choisir catégorie</option>
            <option value="dev">💻 Développement</option>
            <option value="design">🎨 Design</option>
          </select>

          <input type="file" onChange={handleFileChange} />

          {preview && (
            <img src={preview} className="h-40 object-cover rounded" />
          )}

          <button className="bg-blue-600 text-white py-2 rounded">
            {loading ? "..." : "Créer"}
          </button>

        </form>
      </div>
    </div>
  );
}
