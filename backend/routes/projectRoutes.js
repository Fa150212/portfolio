
const express = require("express");
const router = express.Router();
const multer = require("multer");
const projectController = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  protect,
  upload.single("image"),
  projectController.createProject
);

router.get("/", projectController.getProjects); // ✅ D'ABORD

router.get("/:id", projectController.getProjectById); // ✅ ENSUITE

router.delete("/:id", protect, projectController.deleteProject);

router.put("/:id", protect, projectController.updateProject);

module.exports = router;