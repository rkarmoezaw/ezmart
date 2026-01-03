import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/database.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 1500, () => {
  console.log(`Server is running on port ${process.env.PORT || 1500}...`);
});
