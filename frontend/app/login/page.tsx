
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../services/api";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔒 Protection auto si déjà connecté
  // useEffect(() => {
  //   const adminInfo = localStorage.getItem("adminInfo");
  //   const token = localStorage.getItem("token");
  //   if (adminInfo) {
  //     router.push("/dashboard");
  //   }
  //    if (token) {
  //   router.replace("/dashboard");
  // }
  // }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
          // 🔥 Stocker le token
          localStorage.setItem("adminToken", data.token);

          // 🔥 Stocker infos admin
          localStorage.setItem("adminInfo", JSON.stringify(data.admin));
        // Stockage local uniquement si Remember Me coché
        if (form.remember) {
          localStorage.setItem("adminInfo", JSON.stringify(data));
        } else {
          sessionStorage.setItem("adminInfo", JSON.stringify(data));
        }

        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur serveur");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 text-white animate-fadeIn">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <FaUserShield className="text-5xl text-blue-500 mb-3 animate-pulse" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-400 text-sm text-center">
            Connectez-vous à votre espace administrateur
          </p>
        </div>

        {error && (
          <div className="bg-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Nom */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Nom"
              className="w-full pl-10 p-2 rounded bg-gray-800 focus:ring-2 focus:ring-blue-500"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </div>

          {/* Prénom */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Prénom"
              className="w-full pl-10 p-2 rounded bg-gray-800 focus:ring-2 focus:ring-blue-500"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 p-2 rounded bg-gray-800 focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              required
              className="w-full pl-10 pr-10 p-2 rounded bg-gray-800 focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <div
              className="absolute top-3 right-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
              />
              Remember Me
            </label>

            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => alert("Fonction mot de passe oublié à connecter")}
            >
              Mot de passe oublié ?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded font-semibold flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
