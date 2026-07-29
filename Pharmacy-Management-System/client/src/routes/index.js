import { Router } from "express";

import authRoutes from "./auth.routes.js";
import medicineRoutes from "./medicine.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/medicines", medicineRoutes);

export default router;