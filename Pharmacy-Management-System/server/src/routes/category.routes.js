import { Router } from "express";

import * as controller from "../controllers/category.controller.js";
import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, controller.getAll);

router.post(
  "/",
  protect,
  authorize("admin"),
  controller.create
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  controller.update
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  controller.remove
);

export default router;