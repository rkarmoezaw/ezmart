import { Router } from "express";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = Router();

//Protected
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);

//Protected, Admin Only
router.post("/", protect, isAdmin, createProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
