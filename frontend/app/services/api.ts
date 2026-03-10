// export const API_URL = "https://portfolio-1-5hfg.onrender.com/api";


export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://portfolio-1-5hfg.onrender.com/api"
    : "http://localhost:5000/api";