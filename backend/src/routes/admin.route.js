import { Router } from "express";
import { adminAccess, protect } from "../middleware/auth.middleware.js";
import {
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
  isAdmin,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(adminAccess, protect);

router.get("admin", isAdmin);
router.post("new-song", createSong);
router.delete("delete-song/:songId", deleteSong);
router.post("new-album", createAlbum);
router.delete("delete-album/:albumId", deleteAlbum);

export default router
