import express from "express";

import {
  createRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe
} from "../controllers/recipieController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/:id", getRecipeById);

router.post("/", protect, createRecipe);

router.delete("/:id", protect, deleteRecipe);
router.put("/id",protect,updateRecipe);

export default router;