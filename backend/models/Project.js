
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

    // ✅ IMPORTANT
    category: {
      type: String,
      enum: ["dev", "design"],
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);



