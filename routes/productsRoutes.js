import express from "express";
const router = express.Router();
import {
  AddProduct,
  getProduct,
  getALLProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productControllers.js";

router.get("/products", getALLProducts);
router.post("/products", AddProduct);
router.get("/products/:id", getProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
