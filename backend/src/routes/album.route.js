import { Router } from "express";
import { albumById, allAlbums } from "../controllers/album.controller.js";

const router = Router();

router.get("/", allAlbums);
router.get("/:albumId", albumById);

export default router
