require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");


dotenv.config();
connectDB();

const app = express();

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://portfolio-blush-nine-63.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/projects", projectRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Serveur lancé sur le port ${process.env.PORT}`)
);