const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: {
      url: String,
      public_id: String,
    },
    link: String,
    technologies: [String],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);

// const mongoose = require("mongoose");

// const ProjectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   image: { type: String }, // URL de l'image stockée (Cloudinary ou public)
//   link: { type: String }, // lien vers le projet
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Project", ProjectSchema);