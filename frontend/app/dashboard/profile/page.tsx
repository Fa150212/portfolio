
"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";

export default function Profile() {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch(`${API_URL}/admin/profile`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setForm(data));
  }, []);

  const updateProfile = async () => {
    await fetch(`${API_URL}/admin/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    alert("Profil mis à jour !");
  };

  if (!form.name) return null;

  return (
    <div>
      <h1 className="text-2xl mb-6">Modifier Profil</h1>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="p-2 bg-gray-800 mb-4 w-64 rounded"
      />

      <input
        value={form.photo}
        onChange={(e) => setForm({ ...form, photo: e.target.value })}
        className="p-2 bg-gray-800 mb-4 w-64 rounded"
      />

      <p className="mb-4">
        <strong>Rôle :</strong> {form.role}
      </p>

      <button
        onClick={updateProfile}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </div>
  );
}
