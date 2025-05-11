import { Router } from "express";
import {
  allSongs,
  featuredSongs,
  madeforYouSongs,
  trendingSongs,
} from "../controllers/song.controller.js";

const router = Router();

router.get("/", allSongs);
router.get("/featured", featuredSongs);
router.get("/made-for-you", madeforYouSongs);
router.get("/trending", trendingSongs);

export default router
