import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
import db from "./db/models/index.js";
app.use(cookieParser());
app.use(express.json());
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
app.use(cors({ credentials: true }));

app.use(notFound);
app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT} 😊`);
});
