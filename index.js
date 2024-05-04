import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true }));

app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT} 😊`);
});
