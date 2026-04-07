
const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    let uploadedImage = {};

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio_blogs" },
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

    const blog = await Blog.create({
      title,
      content,
      image: uploadedImage,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET BLOGS
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog?.image?.public_id) {
    await cloudinary.uploader.destroy(blog.image.public_id);
  }

  await Blog.findByIdAndDelete(req.params.id);

  res.json({ message: "Blog supprimé" });
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};