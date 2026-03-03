const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE
router.post(
  "/",
  protect,
  upload.single("image"),
  projectController.createProject
);

// GET ALL
router.get("/", projectController.getProjects);

// DELETE
router.delete("/:id", protect, projectController.deleteProject);

// UPDATE
router.put("/:id", protect, projectController.updateProject);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Project = require("../models/Project");
// const cloudinary = require("../config/cloudinary");
// const multer = require("multer");
// const { protect } = require("../middleware/authMiddleware");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // =============================
// // CREATE PROJECT
// // =============================
// router.post("/", protect, upload.single("image"), async (req, res) => {
//   try {
//     const { title, description, link, technologies, status, featured } =
//       req.body;

//     let uploadedImage = {};

//     if (req.file) {
//       const result = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "portfolio_projects" },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );
//         stream.end(req.file.buffer);
//       });

//       uploadedImage = {
//         url: result.secure_url,
//         public_id: result.public_id,
//       };
//     }

//     const project = await Project.create({
//       title,
//       description,
//       link,
//       technologies: technologies ? technologies.split(",") : [],
//       status,
//       featured,
//       image: uploadedImage,
//     });

//     res.status(201).json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur création projet" });
//   }
// });

// // =============================
// // GET ALL PROJECTS
// // =============================
// router.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur récupération projets" });
//   }
// });

// // =============================
// // DELETE PROJECT
// // =============================
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project) return res.status(404).json({ message: "Not found" });

//     if (project.image?.public_id) {
//       await cloudinary.uploader.destroy(project.image.public_id);
//     }

//     await project.deleteOne();

//     res.json({ message: "Projet supprimé" });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur suppression" });
//   }
// });

// // =============================
// // UPDATE PROJECT
// // =============================
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const updated = await Project.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur update" });
//   }
// });

// module.exports = router;