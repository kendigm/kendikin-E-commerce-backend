import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import stripe from "./routes/stripe.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productsRoutes.js";
import sequelize from "./db/models/db.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use(cors({ credentials: true }));
app.use("/api", productRoutes);
app.use("/api", stripe);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT} 😊`);
});
