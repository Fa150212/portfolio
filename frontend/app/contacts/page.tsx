"use client";

import { useState } from "react";
import { API_URL } from "../services/api";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Message envoyé avec succès ✅");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur serveur");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-blue-50 dark:from-black dark:to-zinc-900 text-gray-900 dark:text-white">

      {/* HERO */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Travaillons ensemble
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Vous avez un projet web, un besoin en communication digitale ou une
          collaboration ? Je suis disponible pour vous accompagner.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="px-6 md:px-20 pb-20 grid md:grid-cols-2 gap-12">

        {/* INFOS */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Informations de contact</h2>

          <div className="space-y-6">

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-zinc-800 p-3 rounded-lg">
                <Mail className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 dark:text-gray-300">
                  fg8002220@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-zinc-800 p-3 rounded-lg">
                <Phone className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Téléphone</p>
                <p className="text-gray-600 dark:text-gray-300">
                  +221 77 136 41 50
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-zinc-800 p-3 rounded-lg">
                <MapPin className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Localisation</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Dakar, Sénégal
                </p>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <p className="font-semibold mb-3">Réseaux sociaux</p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow hover:scale-110 transition"
              >
                <Github />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow hover:scale-110 transition"
              >
                <Linkedin />
              </a>
            </div>
          </div>

          {/* Carte */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=Dakar&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64"
              loading="lazy"
            />
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Envoyer un message</h2>

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nom complet"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              placeholder="Sujet"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              placeholder="Votre message..."
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition flex items-center justify-center gap-2 active:scale-95"
            >
              {loading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send size={18} /> Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
