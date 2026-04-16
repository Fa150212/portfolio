"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { API_URL } from "../../services/api";
import ProjectModal from "./ProjectModal";
import EditProjectModal from "./EditProjectModal";

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Erreur fetch projets:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Supprimer ce projet ?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchProjects();
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Projets</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {/* CREATE MODAL */}
      <ProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchProjects}
        apiUrl={API_URL}
      />

      {/* EDIT MODAL */}
      <EditProjectModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        project={selectedProject}
        onSuccess={fetchProjects}
        apiUrl={API_URL}
      />

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">

        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow hover:scale-105 transition"
          >

            {/* IMAGE */}
            {project.image?.url && (
              <img
                src={project.image.url}
                alt={project.title}
                className="rounded-lg mb-3 h-40 object-cover w-full"
              />
            )}

            {/* TITLE */}
            <h3 className="font-semibold text-lg">
              {project.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm opacity-70 mb-2">
              {project.description}
            </p>

            {/* LINK (OPTIONAL) */}
            {project.link && project.link.trim() !== "" && (
              <a
                href={
                  project.link.startsWith("http")
                    ? project.link
                    : `https://${project.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm block mb-2"
              >
                🔗 Voir le projet
              </a>
            )}

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">

              {/* EDIT */}
              <button
                onClick={() => {
                  setSelectedProject(project);
                  setEditOpen(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Modifier
              </button>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Supprimer
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
// import { API_URL } from "../../services/api";
// import ProjectModal from "./ProjectModal";

// export default function ProjectsDashboard() {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   // Récupérer les projets depuis le backend
//   const fetchProjects = async () => {
//     try {
//       const res = await fetch(`${API_URL}/projects`);
//       const data = await res.json();
//       setProjects(data);
//     } catch (err) {
//       console.error("Erreur fetch projets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <div className="p-6 min-h-screen bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white font-sans">
      
//        {/* Header */}
//        <div className="flex justify-between items-center mb-6">
//          <h1 className="text-2xl font-bold">Mes Projets</h1>
//          <button
//           onClick={() => setIsOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           <Plus size={18} /> Ajouter
//         </button>
//       </div>

//       {/* Modal */}
//       <ProjectModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         onSuccess={fetchProjects}
//         apiUrl={API_URL}
//       />

//       {/* Liste projets */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <div
//             key={project._id}
//             className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow hover:scale-105 transition"
//           >
//             {project.image?.url && (
//               <img
//                 src={project.image.url}
//                 alt={project.title}
//                 className="rounded-lg mb-3 h-40 object-cover w-full"
//               />
//             )}
//             <h3 className="font-semibold text-lg">{project.title}</h3>
//             <p className="text-sm opacity-70 mb-2">
//               {project.description}
//             </p>
//             {project.link && (
//               <a
//                 href={project.link}
//                 target="_blank"
//                 className="text-blue-600 hover:underline text-sm"
//               >
//                 Voir le projet
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
