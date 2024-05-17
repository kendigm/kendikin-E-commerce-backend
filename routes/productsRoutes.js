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
router.get("/products/:id", getProduct);
router.post("/products", AddProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
