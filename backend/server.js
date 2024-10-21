import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

connectToDb();

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
})