
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.protect = async (req, res, next) => {
  try {
    // 🔥 IMPORTANT : récupérer le cookie
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ message: "Non autorisé, pas de token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Admin non trouvé" });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

// // authMiddleware.js
// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.cookies.adminToken;

//   if (!token) {
//     return res.status(401).json({ message: "Non autorisé" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token expiré" });
//   }
// };

// module.exports = { protect };
