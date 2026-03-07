
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../services/api";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: any) {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await fetch(`${API_URL}/admin/profile`, {
        credentials: "include",
      });

      if (!res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setAdmin(data);
      }
    };

    fetchAdmin();
  }, []);

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("adminInfo");
    sessionStorage.removeItem("adminInfo");

    router.push("/login");
  };

  if (!admin) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar admin={admin} logout={logout} />

        {/* Contenu principal */}
        <main className="flex-1 flex flex-col p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
