import { Router } from "express";
import {
  register,
  login,
  profile,
  refreshToken,
  logout,
} from "../controller/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

router.get("/profile", protect, profile);

export default router;
