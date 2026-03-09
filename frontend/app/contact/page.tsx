

"use client";

import { useState } from "react";
import { API_URL } from "../services/api";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Contactez-moi</h1>

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
            className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
          />

          <input
            type="text"
            placeholder="Sujet"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
          />

          <textarea
            placeholder="Votre message..."
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 rounded bg-gray-100 dark:bg-zinc-800"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
          >
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
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