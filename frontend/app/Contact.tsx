"use client";

import { useState } from "react";
import { API_URL } from "./services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Message envoyé !");
  };

  return (
    <section id="contact" className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-8">Contact</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Nom"
          className="p-3 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Message"
          className="p-3 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="bg-blue-600 p-3 rounded">
          Envoyer
        </button>
      </form>
    </section>
  );
}