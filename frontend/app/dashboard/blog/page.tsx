
"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";
import { API_URL } from "@/app/services/api";
import BlogModal from "./BlogModal";

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const fetchBlogs = async () => {
    const res = await fetch(`${API_URL}/blogs`);
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // DELETE
  const deleteBlog = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;

    await fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchBlogs();
  };

  // OPEN EDIT
  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  return (
    <div className="p-6 min-h-screen bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Dashboard</h1>

        <button
          onClick={() => {
            setSelectedBlog(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
        >
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {/* MODAL */}
      <BlogModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchBlogs}
        apiUrl={API_URL}
        blog={selectedBlog} // 🔥 IMPORTANT
      />

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">

            {blog.image?.url && (
              <img src={blog.image.url} className="h-40 w-full object-cover rounded"/>
            )}

            <h3 className="font-bold mt-3">{blog.title}</h3>
            <p className="text-sm line-clamp-3">{blog.content}</p>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-3">

              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-600 flex items-center gap-1"
              >
                <Pencil size={16} /> Modifier
              </button>

              <button
                onClick={() => deleteBlog(blog._id)}
                className="text-red-500 flex items-center gap-1"
              >
                <Trash size={16} /> Supprimer
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
// import { API_URL } from "@/app/services/api";
// import BlogModal from "./BlogModal";

// export default function BlogDashboard() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const fetchBlogs = async () => {
//     const res = await fetch(`${API_URL}/blogs`);
//     const data = await res.json();
//     setBlogs(data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const deleteBlog = async (id: string) => {
//     await fetch(`${API_URL}/blogs/${id}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     fetchBlogs();
//   };

//   return (
//     <div className="p-6 min-h-screen bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white font-sans">

//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Blog Dashboard</h1>

//         <button
//           onClick={() => setIsOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
//         >
//           <Plus size={18} /> Ajouter
//         </button>
//       </div>

//       <BlogModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         onSuccess={fetchBlogs}
//         apiUrl={API_URL}
//       />

//       <div className="grid md:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <div key={blog._id} className="bg-white p-4 rounded shadow">

//             {blog.image?.url && (
//               <img src={blog.image.url} className="h-40 w-full object-cover rounded"/>
//             )}

//             <h3 className="font-bold mt-3">{blog.title}</h3>
//             <p className="text-sm line-clamp-3">{blog.content}</p>

//             <button
//               onClick={() => deleteBlog(blog._id)}
//               className="text-red-500 mt-3"
//             >
//               Supprimer
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }