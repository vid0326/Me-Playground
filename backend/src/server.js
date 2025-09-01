
import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db.js";
import apiLimiter from "./middleware/rateLimit.js"; 
import profileRoutes from "./routes/profile.js";
import projectRoutes from "./routes/projects.js";
import skillRoutes from "./routes/skills.js";
import healthRoute from "./routes/health.js";

const app = express();
connectDB();


app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api", apiLimiter);


// Add the '/api' prefix to all routes for better namespacing
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/health", healthRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));