

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,       // 🔥 PRODUCTION
      sameSite: "none",   // 🔥 CROSS DOMAIN
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
        photo: admin.photo,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.logoutAdmin = (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Déconnecté avec succès" });
};
