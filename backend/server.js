import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import timeEntryRoutes from "./routes/timeEntryRoutes.js";
import amountEntryRoutes from "./routes/amountEntryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

connectToDb();

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/entries/time', timeEntryRoutes);
app.use('/api/entries/amount', amountEntryRoutes);
app.use('/api/entries/dashboard', dashboardRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
})