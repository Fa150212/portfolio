
"use client";

import { useState } from "react";
import { API_URL } from "../services/api";
import { FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900 px-6 py-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contactez-moi
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Une question, un projet ou une collaboration ?  
          Je vous réponds rapidement.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* Infos contact */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Restons en contact</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Je suis disponible pour des missions freelance, stages,
              collaborations et opportunités professionnelles.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 dark:text-gray-300">
                  fg8002220@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="font-semibold">Localisation</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Dakar, Sénégal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <FaClock />
              </div>
              <div>
                <p className="font-semibold">Disponibilité</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Lun – Ven : 9h à 18h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-2xl shadow-xl">
          
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

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block mb-1 text-sm font-medium">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Adresse email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Sujet
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { API_URL } from "../services/api";

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess("");
//     setError("");

//     try {
//       const res = await fetch(`${API_URL}/contact`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccess("Message envoyé avec succès ✅");
//         setForm({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Erreur serveur");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-6">
//       <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">Contactez-moi</h1>

//         {success && (
//           <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
//             {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Nom complet"
//             required
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             required
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
//           />

//           <input
//             type="text"
//             placeholder="Sujet"
//             value={form.subject}
//             onChange={(e) => setForm({ ...form, subject: e.target.value })}
//             className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
//           />

//           <textarea
//             placeholder="Votre message..."
//             required
//             rows={5}
//             value={form.message}
//             onChange={(e) => setForm({ ...form, message: e.target.value })}
//             className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
//           >
//             {loading ? "Envoi en cours..." : "Envoyer le message"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }