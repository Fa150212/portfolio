const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

// =============================
// CREATE PROJECT
// =============================
exports.createProject = async (req, res) => {
  try {
    const { title, description, link, technologies, status, featured } =
      req.body;

    if (!title) {
      return res.status(400).json({ message: "Le titre est obligatoire" });
    }

    let uploadedImage = {};

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio_projects" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      uploadedImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const project = await Project.create({
      title,
      description,
      link,
      technologies: technologies ? technologies.split(",") : [],
      status,
      featured,
      image: uploadedImage,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =============================
// GET ALL PROJECTS
// =============================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =============================
// DELETE PROJECT
// =============================
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    if (project.image?.public_id) {
      await cloudinary.uploader.destroy(project.image.public_id);
    }

    await project.deleteOne();

    res.json({ message: "Projet supprimé" });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =============================
// UPDATE PROJECT
// =============================
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};