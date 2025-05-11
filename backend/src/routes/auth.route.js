import { Router } from "express";
import { user } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth", user);

export default router;
