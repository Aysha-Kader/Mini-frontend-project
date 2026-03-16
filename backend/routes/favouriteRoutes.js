import express from "express";

import {
  addFavourite,
  removeFavourite,
  getFavourites
} from "../controllers/favouriteController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFavourites);

router.post("/:id", protect, addFavourite);

router.delete("/:id", protect, removeFavourite);

export default router;