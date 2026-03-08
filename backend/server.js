require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

connectDB();

const app = express();
app.set("trust proxy", 1);

/* =========================
   🔥 CORS CONFIG PRODUCTION READY
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  "https://portfolio-blush-nine-63.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ========================= */

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);


/* =========================
   🔥 IMPORTANT POUR RENDER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Serveur lancé sur le port ${PORT}`)
);