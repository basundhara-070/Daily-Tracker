import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import dayLogRoutes from "./routes/dayLog.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import dsaRoutes from "./routes/dsa.routes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/daylogs", dayLogRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/dsa", dsaRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
