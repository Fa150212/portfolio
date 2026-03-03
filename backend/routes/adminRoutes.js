
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Admin = require("../models/Admin");

router.get("/profile", protect, async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-password");
  res.json(admin);
});

router.put("/profile", protect, async (req, res) => {
  const admin = await Admin.findById(req.admin.id);

  admin.name = req.body.name || admin.name;
  admin.photo = req.body.photo || admin.photo;

  await admin.save();

  res.json(admin);
});

module.exports = router;

