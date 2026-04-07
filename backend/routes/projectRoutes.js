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