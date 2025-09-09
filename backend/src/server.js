import express from "express";

import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authroutes.js";
import resumeRoutes from "./routes/resumeroutes.js";
import { connectdb } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectdb();

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;


    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));