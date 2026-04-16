
"use client";

import { useEffect, useState } from "react";

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
  onSuccess,
  apiUrl,
}: any) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        link: project.link || "",
        category: project.category || "",
      });
    }
  }, [project]);

  if (!isOpen) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${apiUrl}/projects/${project._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="font-bold mb-4">Modifier projet</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="border p-2"
            placeholder="Titre"
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="border p-2"
            placeholder="Description"
          />

          <input
            value={form.link}
            onChange={(e) =>
              setForm({ ...form, link: e.target.value })
            }
            className="border p-2"
            placeholder="Lien (optionnel)"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border p-2"
          >
            <option value="dev">Dev</option>
            <option value="design">Design</option>
          </select>

          <button className="bg-blue-600 text-white py-2 rounded">
            Sauvegarder
          </button>

        </form>
      </div>
    </div>
  );
}
