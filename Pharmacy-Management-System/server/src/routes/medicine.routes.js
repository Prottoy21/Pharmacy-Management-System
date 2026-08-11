import { Router } from "express";

import * as controller from "../controllers/medicine.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

// Get all medicines
router.get(
  "/",
  protect,
  controller.getAll
);

// Get single medicine
router.get(
  "/:id",
  protect,
  controller.getOne
);

// Create medicine
router.post(
  "/",
  protect,
  authorize("admin", "pharmacist"),
  controller.create
);

// Update medicine
router.put(
  "/:id",
  protect,
  authorize("admin", "pharmacist"),
  controller.update
);

// Delete medicine
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  controller.remove
);

export default router;