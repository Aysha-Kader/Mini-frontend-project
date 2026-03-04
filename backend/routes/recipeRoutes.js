import  express from "express";
import Recipe from "../models/Recipe";
import  protect from "../middleware/authMiddleware";

const router = express.Router();

// CREATE
router.post("/", protect, async (req, res) => {
  const recipe = await Recipe.create({
    ...req.body,
    user: req.user,
  });

  res.status(201).json(recipe);
});

// GET ALL
router.get("/", async (req, res) => {
  const recipes = await Recipe.find().populate("user", "name");
  res.json(recipes);
});

// GET SINGLE
router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
});

export default router;