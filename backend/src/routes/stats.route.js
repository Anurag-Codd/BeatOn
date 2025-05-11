import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { updateStats } from "../controllers/user.controller.js";

const router = Router();

router.use(protect);
// router.get("/");
router.post("/:songId", updateStats);

export default router