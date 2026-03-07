"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../services/api";

export default function DashboardAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/admin/profile`, {
      credentials: "include",
    }).then(res => {
      if (!res.ok) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return null;
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Bienvenue dans le Dashboard Admin
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold">
            Messages reçus
          </h3>
          <p className="text-2xl mt-4">0</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold">
            Visites
          </h3>
          <p className="text-2xl mt-4">0</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold">
            Statut
          </h3>
          <p className="text-green-400 mt-4">
            En ligne
          </p>
        </div>
      </div>
    </div>
  );
}