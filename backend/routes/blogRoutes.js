const express = require("express");
const router = express.Router();
const multer = require("multer");

const Blog = require("../models/Blog"); // ✅ IMPORTANT
const { protect } = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE
router.post("/", protect, upload.single("image"), blogController.createBlog);

// GET ALL
router.get("/", blogController.getBlogs);

// GET ONE BLOG ✅
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog non trouvé" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", protect, blogController.deleteBlog);

// UPDATE
router.put("/:id", protect, blogController.updateBlog);

module.exports = router;