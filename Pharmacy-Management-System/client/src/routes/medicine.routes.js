import { Router } from "express";

import * as controller from "../controllers/medicine.controller.js";
import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, controller.getAll);

router.get("/:id", protect, controller.getOne);

router.post(
  "/",
  protect,
  authorize("admin", "pharmacist"),
  controller.create
);

router.put(
  "/:id",
  protect,
  authorize("admin", "pharmacist"),
  controller.update
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  controller.remove
);

export default router;