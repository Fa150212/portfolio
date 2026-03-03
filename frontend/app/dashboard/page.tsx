
export default function DashboardAdmin() {
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

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-10">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">
//           Dashboard Admin
//         </h1>

//         <button
//           onClick={logout}
//           className="bg-red-600 px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }