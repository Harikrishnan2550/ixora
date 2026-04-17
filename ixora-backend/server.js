import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import brochureRoutes from "./routes/brochureRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // ── 1. ADDED CONTACT ROUTE IMPORT

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/brochures", brochureRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/contact", contactRoutes); // ── 2. MOUNTED THE CONTACT ROUTE

app.get("/", (req, res) => {
  res.send("Ixora Backend Running");
});

const PORT = 5000;

// IMPORTANT FIX
const startServer = async () => {
  try {
    await connectDB(); // wait DB connection

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();