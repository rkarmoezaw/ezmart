import { Router } from "express";

import { createOrders, getUserOrders } from "../controller/order.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

//Protected
router.post("/", protect, createOrders);
router.get("/", protect, getUserOrders);

export default router;
