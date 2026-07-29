import { Router } from "express";
import {
  register,
  login,
  me,
} from "../controllers/auth.controller.js";

import {
  protect,
} from "../middleware/auth.middleware.js";

const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/me", protect, me);

export default router;