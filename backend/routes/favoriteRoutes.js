import express from "express";

import {
  addFavorite,
  removeFavorite,
  getFavorites
} from "../controllers/favouriteController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFavorites);

router.post("/:id", protect, addFavorite);

router.delete("/:id", protect, removeFavorite);

export default router;